// @flow
import { isNil, has, get } from "lodash";

import ActionCollection from "beinformed/models/actions/ActionCollection";
import DetailModel from "beinformed/models/detail/DetailModel";
import ContentConfiguration from "beinformed/models/contentconfiguration/ContentConfiguration";
import AttributeSetModel from "beinformed/models/attributes/AttributeSetModel";

import createAttribute from "beinformed/models/attributes/_createAttribute";
import CompositeAttributeModel from "beinformed/models/attributes/CompositeAttributeModel";

import type {
  ModularUIModel,
  ListItemModel,
  LinkCollection,
} from "beinformed/models";
import type { ModularUIResponse } from "beinformed/modularui";

/**
 * Detail of a list item
 */
export default class ListDetailModel extends DetailModel {
  _contentConfiguration: ContentConfiguration;
  _listitem: ListItemModel;
  _givenAnswers: ?CompositeAttributeModel;
  _results: ?CompositeAttributeModel;
  _eventdata: Array<AttributeSetModel>;

  /**
   * Construct
   */
  constructor(modularUIResponse: ModularUIResponse) {
    super(modularUIResponse);

    this._actionCollection = new ActionCollection();

    this._contentConfiguration = new ContentConfiguration(
      this.contributions ? this.contributions.content : {}
    );

    this.setResultSection();
    this.setEventData();
  }

  /**
   * Add links to expand on initialization of this model
   */
  getInitialChildModelLinks() {
    const listitemPanels = this.listitem
      ? this.listitem.links.getLinksByGroup("panel").all
      : [];

    const links = [...super.getInitialChildModelLinks(), ...listitemPanels];

    if (this.hasResults) {
      if (this.results) {
        links.push(...this.results.getInitialChildModelLinks());
      }
      if (this.givenAnswers) {
        links.push(...this.givenAnswers.getInitialChildModelLinks());
      }
    }

    return links;
  }

  setChildModels(models: Array<ModularUIModel>) {
    this._attributeCollection.setChildModels(models);

    if (this.results) {
      this.results.setChildModels(models);
    }

    if (this.givenAnswers) {
      this.givenAnswers.setChildModels(models);
    }
  }

  get type(): string {
    return "ListDetail";
  }

  static isApplicableModel(data: ModularUIResponse) {
    const resourcetype = get(data.contributions, "resourcetype", "unknown");

    return (
      resourcetype.endsWith("ListPanelDetail") ||
      resourcetype.endsWith("ListDetail") ||
      resourcetype === "DatastoreRelatedDatastorePanelDetail" ||
      resourcetype === "CaseRelatedDataStorePanelDetail"
    );
  }

  /**
   * Set listitem of this listdetail and transfer listitem actions to listdetail actions
   */
  set listitem(listitem: ListItemModel) {
    this._listitem = listitem;

    // transfer listitem actions to _actions
    this._actionCollection = listitem.actionCollection;
  }

  /**
   * Get listitem
   */
  get listitem(): ListItemModel {
    return this._listitem;
  }

  /**
   * Getting panel links
   */
  get panelLinks(): LinkCollection {
    return this.listitem.links.getLinksByGroup("panel");
  }

  /**
   * Getting the contentConfiguration
   */
  get contentConfiguration(): ContentConfiguration {
    return this._contentConfiguration;
  }

  set contentConfiguration(configuration: ContentConfiguration) {
    this._contentConfiguration = configuration;
  }

  setResultSection() {
    if (
      has(this.contributions, "resultSection") &&
      has(this.data, "resultSection")
    ) {
      this.setResults();
      this.setGivenAnswers();
    }
  }

  setResults() {
    if (
      has(this.data, "resultSection.results") &&
      has(this.contributions, "resultSection.results")
    ) {
      const results = createAttribute(
        "results",
        {
          key: "results",
          dynamicschema: this.data.dynamicschema,
          ...this.data.resultSection,
        },
        this.contributions.resultSection.results
      );

      if (results instanceof CompositeAttributeModel) {
        results.isResult = true;
        results.indicateContentConfiguration(this.contentConfiguration);
        this._results = results;
      }
    }
  }

  setGivenAnswers() {
    if (
      has(this.data, "resultSection.givenAnswers") &&
      has(this.contributions, "resultSection.givenAnswers")
    ) {
      const givenAnswers = createAttribute(
        "givenAnswers",
        {
          key: "givenAnswers",
          dynamicschema: this.data.dynamicschema,
          ...this.data.resultSection,
        },
        this.contributions.resultSection.givenAnswers
      );

      if (givenAnswers instanceof CompositeAttributeModel) {
        givenAnswers.isResult = true;
        this._givenAnswers = givenAnswers;
      }
    }
  }

  get givenAnswers(): ?CompositeAttributeModel {
    return this._givenAnswers;
  }

  get hasResults(): boolean {
    return has(this.contributions, "resultSection");
  }

  get results(): ?CompositeAttributeModel {
    return this._results;
  }

  get hasEventData(): boolean {
    return (
      has(this.contributions, "eventdata") &&
      has(this.data, "eventdata") &&
      !isNil(this.data.eventdata) &&
      !isNil(this.contributions.eventdata)
    );
  }

  addAttributes(key: string, eventData: Object, eventContributions: Object) {
    this._eventdata.push(
      new AttributeSetModel(key, eventData, eventContributions)
    );
  }

  setEventData() {
    if (this.hasEventData) {
      this._eventdata = [];

      this.contributions.eventdata.forEach((eventDataContribution) => {
        const [key] = Object.keys(eventDataContribution);
        if (key in this.data.eventdata) {
          if (Array.isArray(this.data.eventdata[key])) {
            this.data.eventdata[key].forEach((eventDataData, i) => {
              this.addAttributes(
                `${key}-${i + 1}`,
                {
                  ...eventDataData,
                  dynamicschema: this.data.dynamicschema,
                },
                eventDataContribution[key]
              );
            });
          } else {
            this.addAttributes(
              key,
              {
                ...this.data.eventdata[key],
                dynamicschema: this.data.dynamicschema,
              },
              eventDataContribution[key]
            );
          }
        }
      });
    }
  }

  get eventdata(): Array<AttributeSetModel> {
    return this._eventdata;
  }
}
