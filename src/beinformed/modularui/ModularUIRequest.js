// @flow
import { get, has, isString, constant } from "lodash";
import deepmerge from "deepmerge";

import {
  BASE,
  HTTP_METHODS,
  TIMEVERSION_FILTER_NAME,
} from "beinformed/constants/Constants";

import { HIDE_WHEN_EMPTY } from "beinformed/constants/LayoutHints";

import { getSetting } from "beinformed/constants/Settings";

import Href from "beinformed/models/href/Href";

import universalFetch from "beinformed/utils/fetch/universalFetch";
import resolveModel from "beinformed/models/resolveModel";
import { FormModel } from "beinformed/models";

import ModularUIResponse from "beinformed/modularui/ModularUIResponse";
import ModularUIError from "beinformed/modularui/ModularUIError";

import type {
  ModularUIModel,
  ListItemModel,
  ContentModel,
} from "beinformed/models";

/**
 * Helper for fetching data and contributions from the Be Informed modular ui
 * and merge it into a target or resolvable model.
 */

class ModularUIRequest {
  _response: ModularUIResponse;

  _href: Href;
  _options: Object;
  _targetModel: Class<ModularUIModel>;
  _contributionsHref: string;
  _locale: string;

  _listitem: ListItemModel;

  _progressEvent: ?Function;

  constructor(href: Href | string, options: Object = {}) {
    const { locale, ...otherOptions } = options;

    this._response = new ModularUIResponse();

    this.href = isString(href) ? new Href(href) : href;
    this.options = otherOptions;
    this.locale = locale;

    // copy request parameters to response, to be able to use them in the models
    // self links are missing the request parameters
    if (this.href) {
      this._response.parameters = this.href.parameters;
    }

    if (this.href && this.href.method === HTTP_METHODS.POST) {
      this.options = {
        ...this.options,
        method: this.options.method || HTTP_METHODS.POST,
      };
    }
  }

  set locale(locale: string) {
    this._locale = locale;
    this._response.locale = locale;
  }

  get locale(): string {
    return this._locale;
  }

  setLocale(locale: string): ModularUIRequest {
    this.locale = locale;

    return this;
  }

  get response(): ModularUIResponse {
    return this._response;
  }

  set href(href: Href) {
    this._href = href;
  }

  get href(): Href {
    return this._href;
  }

  get options(): Object {
    return {
      ...this._options,
      locale: this.locale,
    };
  }

  set options(options: Object) {
    this._options = options;
  }

  get withChildModels(): boolean {
    return (
      !("childmodels" in this.options) || this.options.childmodels === true
    );
  }

  set targetModel(targetModel: Class<ModularUIModel>) {
    this._targetModel = targetModel;
  }

  get targetModel(): Class<ModularUIModel> {
    return this._targetModel;
  }

  createModel(): ModularUIModel {
    const Model = this.targetModel || resolveModel(this.response);

    // check for ResourceModel
    if (Model && Model.isApplicableModel) {
      return new Model(this.response);
    }

    throw new Error(
      `No model available for data: ${JSON.stringify(this.response)}`
    );
  }

  processContributionsService(contributionsData: Object) {
    if (!contributionsData) {
      throw new Error(
        `No contributions data received for ${this._contributionsHref}`
      );
    }
    const [contributionsKey] = Object.keys(contributionsData);

    if (contributionsKey === "error") {
      throw new ModularUIError(
        get(
          contributionsData.error,
          "properties.message",
          "Error in contribution"
        ),
        contributionsData.error,
        this._contributionsHref.toString()
      );
    }

    // The key of the data service is different from the contributions service for forms
    if (!(this.response.key in contributionsData)) {
      this.response.key = contributionsKey;
    }

    this.response.contributions = contributionsData[this.response.key];
  }

  processDataService(data: Object) {
    const [key] = Object.keys(data);
    if (key === "error") {
      if (data.error.properties) {
        throw new ModularUIError(
          get(data.error, "properties.message", "Error in data"),
          data.error,
          this.href.path.toString()
        );
      }

      throw new Error(data.error);
    }

    this.response.key = key;
    this.response.data = data[key];

    const links = data[key]._links;

    if (links && links.contributions) {
      this._contributionsHref = links.contributions.href;
    } else if (Array.isArray(links) && links[0].contributions) {
      this._contributionsHref = links[0].contributions.href;
    } else {
      throw new Error(`Contributions link not found for data with key ${key}`);
    }
  }

  fetchContributionsService() {
    return universalFetch({
      url: `${BASE}${this._contributionsHref}`,
      cache: true,
      locale: this.options.locale,
    });
  }

  fetchDataService() {
    return universalFetch({
      ...this.options,
      url: `${BASE}${this.href.path}`,
      params: this.href.getQuerystringForModularUI(),
      locale: this.options.locale,
      onProgress: this.onProgress,
    });
  }

  /**
   * Check if links contain a 'hide-when-empty' layout hint and remove the link from
   * the component when it exists and no results are available
   */
  processAsyncLayoutHints(): Promise<void> {
    const links = this.response.contributions._links;
    if (links && links.panel) {
      const hideLinksPromises = links.panel
        .filter(
          (link) =>
            this.response.data._links[link.name] &&
            link.layouthint &&
            link.layouthint.includes(HIDE_WHEN_EMPTY)
        )
        .map((link) => {
          const linkData = this.response.data._links[link.name];

          return universalFetch({
            ...this.options,
            url: `${BASE}${linkData.href}`,
          }).then((list) => {
            const [key] = Object.keys(list);
            return list[key]._embedded === null && !list[key].actions
              ? link.name
              : null;
          });
        });

      return Promise.all(hideLinksPromises).then((hideLinks: Array<string>) => {
        const newLinks = {};

        Object.keys(this.response.data._links).forEach((key) => {
          if (!hideLinks.includes(key)) {
            newLinks[key] = this.response.data._links[key];
          }
        });

        this.response.data = {
          ...this.response.data,
          _links: newLinks,
        };
      });
    }

    return Promise.resolve();
  }

  set onProgress(progressEvent: Function) {
    this._progressEvent = progressEvent;
  }

  get onProgress(): Function | null {
    return this._progressEvent || null;
  }

  /**
   * Combine previous send request data with new validation data to create a complete request object
   * The received model is new FormModel containing ONLY the current question, not the previously entered questions
   * to create a complete request we append the originally send form objects
   */
  getDynamicValidationData(model: FormModel) {
    const prevData = isString(this.options.data)
      ? JSON.parse(this.options.data)
      : this.options.data;
    const newData = JSON.parse(model.validationData);

    return JSON.stringify(deepmerge(prevData || {}, newData || {}));
  }

  /**
   * First load of dynamic values when a form is loaded
   */
  loadDynamicValidations(model: ModularUIModel) {
    if (
      !this.options.isValidationRequest &&
      getSetting("USE_INSTANT_SERVER_VALIDATION") &&
      model instanceof FormModel &&
      model.currentFormObject &&
      model.currentFormObject.hasDynamicValidations
    ) {
      const validationHref = this.href.setParameter("commit", "false");
      return universalFetch({
        ...this.options,
        url: `${BASE}${this.href.path}`,
        params: validationHref.getQuerystringForModularUI(),
        childmodels: false,
        data: this.getDynamicValidationData(model),
      }).then((data) => {
        const [key] = Object.keys(data);
        return model.updateValidations(data[key]);
      });
    }

    return Promise.resolve<ModularUIModel>(model);
  }

  fetch() {
    return this.fetchDataService()
      .then((data: Object) => {
        this.processDataService(data);

        return this.fetchContributionsService();
      })
      .then((contributionsData: Object) => {
        this.processContributionsService(contributionsData);

        return this.processAsyncLayoutHints();
      })
      .then(() => Promise.resolve(this.createModel()))
      .then((model: ModularUIModel) => this.loadDynamicValidations(model))
      .then((model) => {
        if (this.withChildModels) {
          return this.fetchChildModels(model);
        }

        return model;
      });
  }

  fetchFromCache() {
    this.options = {
      ...this.options,
      cache: true,
    };

    return this.fetch();
  }

  fetchChildModels(model: ModularUIModel): Promise<ModularUIModel> {
    const childModelLinks = model.getInitialChildModelLinks();

    const childModelRequests = childModelLinks.map((childModelLink) => {
      const request = new ModularUIRequest(childModelLink.href);

      request.locale = this.locale;

      if (childModelLink.targetModel) {
        request.targetModel = childModelLink.targetModel;
      }

      if (childModelLink.isCacheable) {
        return request.fetchFromCache();
      }

      return request.fetch();
    });

    return Promise.all(
      // $FlowFixMe
      childModelRequests.map((p) => p.catch(constant(null)))
    ).then((childModels) => {
      model.addChildModels(childModels.filter((cm) => cm !== null));

      return model;
    });
  }

  fetchContent(withChildSections: boolean) {
    return this.fetchFromCache().then((model) => {
      if (
        withChildSections &&
        has(model, "childSectionLinks") &&
        model.childSectionLinks.length > 0
      ) {
        return this.fetchContentChildSections(model);
      }

      return Promise.resolve(model);
    });
  }

  /**
   * Recursively return child sections defined on the content model
   */
  fetchContentChildSections(contentModel: ContentModel): Promise<ContentModel> {
    const newContentModel = contentModel.clone();

    return Promise.all(
      contentModel.childSectionLinks.map((childSectionLink) => {
        const contentHrefWithEntryDate = childSectionLink.selfhref.addParameter(
          TIMEVERSION_FILTER_NAME,
          contentModel.entryDate
        );

        const request = new ModularUIRequest(contentHrefWithEntryDate);

        return request.fetchContent(true);
      })
    ).then((sectionModels) => {
      newContentModel.childSections = sectionModels;

      return newContentModel;
    });
  }
}

export default ModularUIRequest;
