// @flow
import { createHashFromHref } from "beinformed/utils/helpers/createHash";

import BaseModel from "beinformed/models/base/BaseModel";
import LinkCollection from "beinformed/models/links/LinkCollection";
import Href from "beinformed/models/href/Href";

/**
 * Link to a concept
 */
export default class SubSectionModel extends BaseModel {
  _links: LinkCollection;

  constructor(data: Object) {
    super(data, {});
  }

  /**
   * Retrieve key of subsection
   */
  get key() {
    return this.data._id;
  }

  /**
   * Retrieve html body
   */
  get body() {
    return this.data.body || "";
  }

  /**
   * Retrieve number of section
   */
  get number() {
    return this.data.number;
  }

  /**
   * Retrieve label of section
   */
  get label() {
    return this.data.label;
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

  /**
   * Retrieve links of section
   */
  get links() {
    if (!this._links) {
      this._links = new LinkCollection(
        this.data._links,
        this.contributions._links
      );
    }

    return this._links;
  }

  /**
   * Get self link of model
   */
  get selflink() {
    return this.links.getLinkByKey("self");
  }

  /**
   * Return default self link of resource
   */
  get selfhref() {
    return this.selflink ? this.selflink.href : null;
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
      return relatedConceptsLink.href;
    }

    return null;
  }

  get referenceHash() {
    const selfhref = this.selfhref || new Href();

    return createHashFromHref(selfhref);
  }
}
