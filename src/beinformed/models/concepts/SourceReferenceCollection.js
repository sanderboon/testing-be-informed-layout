// @flow
import BaseCollection from "beinformed/models/base/BaseCollection";
import SourceReferenceModel from "beinformed/models/concepts/SourceReferenceModel";

/**
 * Source reference collection
 */
export default class SourceReferenceCollection extends BaseCollection<SourceReferenceModel> {
  constructor(
    sourceReferences: Array<Object> = [],
    entryDate: ?ISO_DATE = null
  ) {
    super();

    this.collection = sourceReferences
      ? sourceReferences.map(
          (sourceReference) =>
            new SourceReferenceModel(sourceReference, entryDate)
        )
      : [];
  }

  byTypes(types: string) {
    return this.filter((sourceRef) => types.includes(sourceRef.type));
  }
}
