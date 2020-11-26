// @flow
import { createHashFromHref } from "beinformed/utils/helpers/createHash";

import ContentLinkModel from "beinformed/models/content/ContentLinkModel";
import Href from "beinformed/models/href/Href";

class SourceReferenceModel {
  _sourceReference: Object;
  _entryDate: ?ISO_DATE;

  constructor(sourceReference: Object, entryDate: ?ISO_DATE = null) {
    this._sourceReference = sourceReference;
    this._entryDate = entryDate;
  }

  get link() {
    const section = this._sourceReference._links.self.href.replace(
      `${this._sourceReference._links.content.href}/`,
      ""
    );

    return new ContentLinkModel(
      {
        ...this._sourceReference,
        section,
      },
      this._entryDate
    );
  }

  get selfhref() {
    return new Href(this._sourceReference._links.self.href);
  }

  get type() {
    return this._sourceReference.type;
  }

  get label() {
    return this._sourceReference.label;
  }

  get sourceLabel() {
    return this._sourceReference.sourceLabel;
  }

  get referenceHash() {
    return createHashFromHref(this.selfhref);
  }
}

export default SourceReferenceModel;
