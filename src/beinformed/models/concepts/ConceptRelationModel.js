// @flow
import ConceptLinkModel from "beinformed/models/concepts/ConceptLinkModel";
import LinkModel from "beinformed/models/links/LinkModel";

import type { ModularUIModel } from "beinformed/models";

/**
 * Concept relation model
 */
export default class ConceptRelationModel {
  _relation: Object;
  _concept: ConceptLinkModel;

  constructor(relation: Object, entryDate: ?ISO_DATE = null) {
    this._relation = relation;

    if (relation && relation.concept) {
      this._concept = new ConceptLinkModel(relation.concept, entryDate);
    }
  }

  getInitialChildModelLinks(): Array<LinkModel> {
    return this.concept.getInitialChildModelLinks();
  }

  setChildModels(models: Array<ModularUIModel>) {
    this.concept.setChildModels(models);
  }

  /**
   * Get key of relation
   */
  get key() {
    return this._relation.relationType;
  }

  /**
   * Get Text fragments
   */
  get textfragments() {
    return this._relation.textFragments;
  }

  /**
   * Get Label of relation
   */
  get label() {
    return this._relation.relationLabel;
  }

  /**
   * Get direction of relation
   */
  get direction() {
    return this._relation.relationDirection;
  }

  /**
   * Get other concept
   */
  get concept() {
    return this._concept;
  }

  /**
   * Set concept information
   */
  set concept(concept: ConceptLinkModel) {
    this._concept = concept;
  }
}
