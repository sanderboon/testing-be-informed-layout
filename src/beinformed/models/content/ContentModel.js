// @flow
import { get } from "lodash";

import { createHashFromHref } from "beinformed/utils/helpers/createHash";

import ResourceModel from "beinformed/models/base/ResourceModel";
import FilterCollection from "beinformed/models/filters/FilterCollection";
import ContentLinkModel from "beinformed/models/content/ContentLinkModel";
import SubSectionModel from "beinformed/models/content/SubSectionModel";
import ContentTypeModel from "beinformed/models/content/ContentTypeModel";
import { TIMEVERSION_FILTER_NAME } from "beinformed/constants/Constants";

import type { ModularUIModel } from "beinformed/models";

/**
 * Content detail model
 */
export default class ContentModel extends ResourceModel {
  _childSections: Array<ContentModel>;
  _contentType: ?ContentTypeModel;
  _filterCollection: FilterCollection;

  get type() {
    return "Content";
  }

  static isApplicableModel(data: Object) {
    return (
      data.contributions.resourcetype &&
      data.contributions.resourcetype === "ContentDetail"
    );
  }

  getInitialChildModelLinks() {
    const contentTypeLink = this.links.getLinkByKey("contenttype");

    if (contentTypeLink) {
      return [contentTypeLink];
    }

    return [];
  }

  setChildModels(models: Array<ModularUIModel>) {
    this.contentType = models.find((model) => model.type === "ContentType");
  }

  get id() {
    return this.data._id;
  }

  /**
   * Retrieve available filters on concept toc
   */
  get filterCollection() {
    if (!this._filterCollection) {
      this._filterCollection = new FilterCollection(
        {
          entryDate: this.data.filter.datefilter,
        },
        {
          filter: this.contributions.filter,
        }
      );
    }

    return this._filterCollection;
  }

  /**
   * Retrieve entrydate of content toc
   */
  get entryDate() {
    const entryDateFilter = this.filterCollection.getFilterByAttributeKey(
      TIMEVERSION_FILTER_NAME
    );
    if (entryDateFilter) {
      return entryDateFilter.attribute.value;
    }

    return null;
  }

  /**
   * Get conceptType of concept
   */
  get contentType() {
    return this._contentType;
  }

  /**
   * Set concept type
   */
  set contentType(contentType: ?ModularUIModel) {
    this._contentType =
      contentType instanceof ContentTypeModel ? contentType : null;
  }

  /**
   * Get content label
   */
  get label() {
    return get(this.data, "label", "");
  }

  /**
   * Retrieve number of section
   */
  get number() {
    return this.data.number;
  }

  /**
   * Get content body
   */
  get body() {
    return this.data.body;
  }

  /**
   * Retrieve child section links
   */
  get childSectionLinks() {
    return this.data.childSections
      ? this.data.childSections.map(
          (childSection) =>
            new ContentLinkModel(
              {
                ...childSection,
                section: childSection._id,
              },
              this.entryDate
            )
        )
      : [];
  }

  get selfContentLink() {
    return new ContentLinkModel(
      { section: this.id, ...this.data },
      this.entryDate
    );
  }

  /**
   * Get tree of child sections
   */
  get childSections() {
    return this._childSections || [];
  }

  /**
   * set resolved child sections
   */
  set childSections(sections: Array<ContentModel>) {
    this._childSections = sections || [];
  }

  /**
   * Get sub sections
   */
  get subSections() {
    return this.data.subSections
      ? this.data.subSections.map(
          (subSection) => new SubSectionModel(subSection)
        )
      : [];
  }

  get relatedConceptsHrefs() {
    const hrefs = [];
    if (this.relatedConceptsHref) {
      hrefs.push(this.relatedConceptsHref);
    }

    this.subSections.forEach((subSection) => {
      hrefs.push(...subSection.relatedConceptsHrefs);
    });

    return hrefs;
  }

  /**
   * Get related concepts link
   */
  get relatedConceptsHref() {
    const relatedConceptsLink = this.links.getLinkByKey("relatedConcepts");

    if (relatedConceptsLink) {
      const { href } = relatedConceptsLink;
      href.addParameter("entryDate", this.entryDate);
      return href;
    }

    return null;
  }

  get referenceHash() {
    return createHashFromHref(this.selfhref);
  }
}
