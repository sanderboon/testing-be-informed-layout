// @flow
import { get, has } from "lodash";

import { IllegalArgumentException } from "beinformed/exceptions";

import BaseModel from "beinformed/models/base/BaseModel";
import ChoiceAttributeOptionCollection from "beinformed/models/attributes/ChoiceAttributeOptionCollection";

import { DateUtil } from "beinformed/utils/datetime/DateTimeUtil";
import { TIMEVERSION_FILTER_NAME } from "beinformed/constants/Constants";
import { TITLE } from "beinformed/constants/LayoutHints";

import LinkCollection from "beinformed/models/links/LinkCollection";
import AttributeCollection from "beinformed/models/attributes/AttributeCollection";
import ConceptDetailModel from "beinformed/models/concepts/ConceptDetailModel";

import type {
  ModularUIModel,
  ListItemModel,
  ContentModel,
} from "beinformed/models";

class ChoiceAttributeOptionModel extends BaseModel {
  _code: string;
  _isSelected: boolean;
  _referenceDate: ISO_DATE;
  _content: Map<string, ContentModel>;
  _level: number;
  _children: ChoiceAttributeOptionCollection;
  _concept: ?ConceptDetailModel;
  _links: LinkCollection;
  _attributeCollection: AttributeCollection;

  constructor(
    selectedValues: Array<string> = [],
    option: Object = {},
    referenceDate: ISO_DATE = DateUtil.now()
  ) {
    super({}, option);

    this.code = this.contributions.code || this.contributions.key || "";

    this._isSelected = selectedValues.includes(this.code);

    this._referenceDate = referenceDate;

    this._content = new Map();
    this._level = 0;

    this._attributeCollection = this.createAttributeCollection();
    this._children = this.addChildren(selectedValues, option, referenceDate);
  }

  static createFromListItemModel(listitem: ListItemModel) {
    const option = new ChoiceAttributeOptionModel();

    option.code = listitem.id.toString();
    option.attributeCollection = listitem.attributeCollection;
    option.links = listitem.links;

    return option;
  }

  getInitialChildModelLinks() {
    const initialLinks = [];

    if (this.conceptLink !== null) {
      initialLinks.push(this.conceptLink);
    }

    if (this.children) {
      initialLinks.push(...this.children.getInitialChildModelLinks());
    }

    return initialLinks;
  }

  setChildModels(models: Array<ModularUIModel>) {
    if (this.conceptLink !== null) {
      const conceptHref = this.conceptLink.href;

      this.concept = models.find((model) =>
        model.selfhref.equalsWithParameters(conceptHref)
      );
    }

    if (this.children) {
      this.children.setChildModels(models);
    }
  }

  /**
   * Get code of option
   */
  get code() {
    return this._code;
  }

  set code(code: string) {
    this._code = code;
  }

  equals(model: ChoiceAttributeOptionModel) {
    return this.code.toString() === model.code.toString();
  }

  /**
   * Retrieve attributes for Composite codemaps (e.g. table and case list codemaps)
   */
  get attributeCollection() {
    return this._attributeCollection;
  }

  set attributeCollection(attributeCollection: AttributeCollection) {
    this._attributeCollection = attributeCollection;
  }

  createAttributeCollection() {
    const contributions = get(this.contributions, "elementsContributions", []);

    if (has(this.contributions, "elements")) {
      const data = get(this.contributions, "elements", {});
      return new AttributeCollection(data, contributions, true);
    }

    return new AttributeCollection();
  }

  /**
   * Get label of option for simple codemaps (e.g. static codemap)
   */
  get label() {
    if (this.contributions.label) {
      return this.contributions.label;
    }

    if (this.attributeCollection.hasItems) {
      const title = this.attributeCollection.getAttributeByLayoutHint(TITLE);

      if (title) {
        return title.readonlyvalue;
      }

      if (this.attributeCollection.first) {
        return this.attributeCollection.first.readonlyvalue;
      }
    }

    return "";
  }

  /**
   * Retrieve the first permitted label to render when a concept and contentConfiguration is available
   * Be aware that permission could be in place for labels from a concept.
   */
  getContentConfiguredLabel(contentConfiguration: Object) {
    const configuredLabelProperties = get(
      contentConfiguration,
      "labelConfig[0].types",
      []
    );

    if (this.concept && configuredLabelProperties.length > 0) {
      const configuredLabels = this.concept
        .getLabelElementByIds(configuredLabelProperties)
        .filter(
          (configuredLabel) =>
            configuredLabel.value && configuredLabel.value !== ""
        );

      if (configuredLabels.length > 0) {
        return configuredLabelProperties
          .filter((configuredLabelProperty) =>
            configuredLabels.some(
              (configuredLabel) =>
                configuredLabel._id === configuredLabelProperty
            )
          )
          .map((configuredLabelProperty) =>
            configuredLabels.find(
              (configuredLabel) =>
                configuredLabel._id === configuredLabelProperty
            )
          )[0].value;
      }
    }

    return this.label;
  }

  /**
   * Indicates if option is selected
   */
  get selected() {
    return this._isSelected;
  }

  /**
   * Set selected property of option
   */
  set selected(selected: boolean) {
    this._isSelected = selected;
  }

  /**
   * Retrieve count of filter for option
   */
  get count() {
    return get(this.contributions, "count", null);
  }

  addChildren(
    selectedValues: Array<string> = [],
    option: Object = {},
    referenceDate: ISO_DATE = DateUtil.now()
  ) {
    // When contributions contain elements this is a list not nested options
    if (has(option, "elements")) {
      return new ChoiceAttributeOptionCollection();
    }

    return ChoiceAttributeOptionCollection.create(
      {
        value: selectedValues,
      },
      { options: get(option, "children", []) },
      referenceDate
    );
  }

  /**
   * get children of option
   */
  get children() {
    return this._children || null;
  }

  /**
   * Retrieve links of attribute
   */
  get links() {
    if (!this._links) {
      this._links = new LinkCollection(this.contributions._links);
    }

    return this._links;
  }

  set links(links: LinkCollection) {
    this._links = links;
  }

  /**
   * referenceDate received from attribute
   */
  get referenceDate() {
    return this._referenceDate;
  }

  set referenceDate(date: ISO_DATE) {
    this._referenceDate = date;
  }

  /**
   * Retrieve concept link of attribute when available
   */
  get conceptLink() {
    const conceptLink = this.links.getLinkByKey("concept");
    if (conceptLink !== null) {
      conceptLink.href = conceptLink.href.addParameter(
        TIMEVERSION_FILTER_NAME,
        this.referenceDate
      );

      conceptLink.isCacheable = true;
    }

    return conceptLink;
  }

  /**
   * Get concept information
   */
  get concept(): ConceptDetailModel | null {
    return this._concept || null;
  }

  /**
   * Set the concept
   */
  set concept(concept: ?ModularUIModel) {
    this._concept = concept instanceof ConceptDetailModel ? concept : null;
  }

  /**
   * Add content model to attribute
   */
  addContent(type: string, content: ContentModel) {
    if (content.type !== "Content") {
      throw new IllegalArgumentException(
        `Attribute.addContent: not a ContentModel for type ${type}`
      );
    }

    this._content.set(type, content);
  }

  /**
   * Get content models
   */
  get content() {
    return this._content;
  }

  /**
   * Get level of option, used in tree view choice attributes (taxonomy)
   */
  get level() {
    return this._level;
  }

  /**
   * Set level of option
   */
  set level(level: number) {
    this._level = level;
  }

  get isBooleanType() {
    return get(this.contributions, "isBooleanType", false);
  }

  get hasAlternativeLabel() {
    return get(this.contributions, "hasAlternativeLabel", false);
  }

  mergeOption(withOption: ChoiceAttributeOptionModel) {
    this.concept = withOption.concept;

    if (this.children) {
      this.children.mergeOptions(withOption.children);
    }
  }
}

export default ChoiceAttributeOptionModel;
