// @flow
import { get } from "lodash";

import ResourceModel from "beinformed/models/base/ResourceModel";
import ConceptRelationCollection from "beinformed/models/concepts/ConceptRelationCollection";
import SourceReferenceCollection from "beinformed/models/concepts/SourceReferenceCollection";
import ConceptTypeDetailModel from "beinformed/models/concepts/ConceptTypeDetailModel";
import { TIMEVERSION_FILTER_NAME } from "beinformed/constants/Constants";

import type { ModularUIModel, Href, LinkModel } from "beinformed/models";
import type { ModularUIResponse } from "beinformed/modularui";

/**
 * Model for concept details, available through modelcatalog
 */
export default class ConceptDetailModel extends ResourceModel {
  _relations: ConceptRelationCollection;
  _conceptType: ?ConceptTypeDetailModel;
  // _filterCollection: FilterCollection;
  _sourceReferences: SourceReferenceCollection;

  constructor(modularuiResponse: ModularUIResponse) {
    super(modularuiResponse);

    this._relations = new ConceptRelationCollection(
      this.data.relations,
      this.entryDate
    );
  }

  get type(): string {
    return "ConceptDetail";
  }

  static isApplicableModel(data: ModularUIResponse) {
    return (
      data.contributions.resourcetype &&
      data.contributions.resourcetype === "ConceptDetail"
    );
  }

  getInitialChildModelLinks(): Array<LinkModel> {
    const conceptTypeLink = this.links.getLinkByKey("concepttype");
    const relationsCollectionLinks = this.relationsCollection.getInitialChildModelLinks();

    if (conceptTypeLink) {
      conceptTypeLink.isCacheable = true;
      return [conceptTypeLink, ...relationsCollectionLinks];
    }

    return relationsCollectionLinks;
  }

  setChildModels(models: Array<ModularUIModel>) {
    const conceptTypeModel = models.find(
      (model) => model.type === "ConceptTypeDetail"
    );

    if (conceptTypeModel) {
      this.conceptType = conceptTypeModel;
    }

    this.relationsCollection.setChildModels(models);
  }

  /**
   * Retrieve concept detail identifier as key for this model
   */
  get key(): string {
    return this.data._id || "concept";
  }

  /**
   * Getting the self link of this Concept
   */
  get selfhref(): Href {
    const { href } = this.selflink;

    if (this.entryDate) {
      href.setParameter(TIMEVERSION_FILTER_NAME, this.entryDate);
    } else {
      href.removeParameter(TIMEVERSION_FILTER_NAME);
    }

    return href;
  }

  /**
   * Get conceptType of concept
   */
  get conceptType(): ?ConceptTypeDetailModel {
    return this._conceptType;
  }

  set conceptType(conceptType: ?ModularUIModel) {
    this._conceptType =
      conceptType instanceof ConceptTypeDetailModel ? conceptType : null;
  }

  /**
   * Get concept label
   */
  get label(): string {
    return this.data.conceptLabel;
  }

  /**
   * Get taxonomy type
   */
  get taxonomyType(): string {
    return this.data.taxonomyType || "default";
  }

  /**
   * Get concept relations collection
   */
  get relationsCollection(): ConceptRelationCollection {
    return this._relations;
  }

  /**
   * Get concept formula
   */
  get formula(): string {
    return this.data.formula;
  }

  /**
   * Get additional labels of concept
   */
  get labels(): Array<labelsJSON> {
    return this.conceptType && this.conceptType.labelTypes
      ? this.conceptType.labelTypes.map((labelType) => {
          const setting = this.data.labels
            ? this.data.labels.find((label) => label.type === labelType._id)
            : {};

          return {
            ...labelType,
            ...setting,
          };
        })
      : [];
  }

  /**
   * Get label elements by id
   */
  getLabelElementByIds(ids: Array<string>): Array<labelsJSON> {
    return this.labels.filter((label: labelsJSON) => ids.includes(label._id));
  }

  /**
   * Get concept properties
   */
  get conceptProperties(): Array<propertyJSON> {
    return this.conceptType && this.conceptType.propertyTypes
      ? this.conceptType.propertyTypes.map((propertyType) => {
          const setting = this.data.properties
            ? this.data.properties.find(
                (property) => property.type === propertyType._id
              )
            : {};

          return {
            ...propertyType,
            ...setting,
          };
        })
      : [];
  }

  /**
   * Get concept properties by id
   */
  getConceptPropertiesByIds(ids: Array<string>): Array<propertyJSON> {
    return this.conceptProperties.filter((property) =>
      ids.includes(property._id)
    );
  }

  /**
   * Get Text fragments
   */
  get textfragments(): Array<textfragmentJSON> {
    const textFragments = this.data.textFragments
      ? this.data.textFragments.map((textFragment) => {
          const textFragmentConfig =
            this.conceptType &&
            this.conceptType.textFragmentTypes.find(
              (textFragmentType) => textFragment.type === textFragmentType._id
            );

          return {
            ...textFragmentConfig,
            ...textFragment,
          };
        })
      : [];

    const notConfiguredTextFragments =
      this.conceptType && this.conceptType.textFragmentTypes
        ? this.conceptType.textFragmentTypes.filter((textFragmentType) => {
            if (!this.data.textFragments) {
              return true;
            }

            return !this.data.textFragments.some(
              (textfragment) => textfragment.type === textFragmentType._id
            );
          })
        : [];

    return [...textFragments, ...notConfiguredTextFragments];
  }

  /**
   * Get text fragments by id
   */
  getTextFragmentByKeys(keys: Array<string>): Array<textfragmentJSON> {
    return this.textfragments.filter((textfragment) =>
      keys.includes(textfragment.type)
    );
  }

  /**
   * Get source reference collection
   */
  getSourceReferenceCollection(availableLocales: Array<string> = []) {
    if (!this._sourceReferences) {
      this._sourceReferences = new SourceReferenceCollection(
        this.getSourceReferencesForCurrentLanguage(availableLocales),
        this.entryDate
      );
    }

    return this._sourceReferences;
  }

  /*
   * Retrieve all sourceReferenceTypes that are valid for the current language
   * Used by sourceRef collection
   */
  getSourceReferencesForCurrentLanguage(availableLocales: Array<string>) {
    const LANGUAGE_POSTFIX_LENGTH = 3;
    if (this.data.sourceReferences) {
      const availableLanguagesInSourceReferences = this.data.sourceReferences.map(
        (sourceReference) =>
          sourceReference.type.substring(
            sourceReference.type.length - LANGUAGE_POSTFIX_LENGTH
          )
      );

      const currentLanguagePostfix = `_${this.locale}`;

      if (
        availableLanguagesInSourceReferences.includes(currentLanguagePostfix)
      ) {
        // return all sourceReferences that end with language that is selected
        return this.data.sourceReferences.filter((sourceReference) =>
          sourceReference.type.endsWith(currentLanguagePostfix)
        );
      }

      const availableLanguages = availableLocales.map(
        (locale) => `_${locale.split("-")[0]}`
      );

      // return all sourceReferences that do not end with language postfix
      return this.data.sourceReferences.filter(
        (sourceReference) =>
          !availableLanguages.includes(
            sourceReference.type.substring(
              sourceReference.type.length - LANGUAGE_POSTFIX_LENGTH
            )
          )
      );
    }
    return [];
  }

  /**
   * Retrieve entrydate of content toc
   */
  get entryDate(): string | null {
    return get(this.data, `filter.${TIMEVERSION_FILTER_NAME}.value`, null);
  }
}
