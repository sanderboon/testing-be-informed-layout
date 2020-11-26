// @flow
import ResourceCollection from "beinformed/models/base/ResourceCollection";
import ConceptRelationModel from "beinformed/models/concepts/ConceptRelationModel";

/**
 * concept relation collection
 */
export default class ConceptRelationCollection extends ResourceCollection<ConceptRelationModel> {
  _entryDate: ?ISO_DATE;

  constructor(relations: Array<Object> = [], entryDate: ?ISO_DATE = null) {
    super();

    this._entryDate = entryDate;

    this.collection = Array.isArray(relations)
      ? relations.map((relation) =>
          relation instanceof ConceptRelationModel
            ? relation
            : new ConceptRelationModel(relation, entryDate)
        )
      : [new ConceptRelationModel(relations, entryDate)];
  }

  /**
   * Get unique list of relation types
   */
  get types(): Array<{ key: string, label: string }> {
    return this.collection
      .filter(
        (relation, pos, arr) =>
          arr.findIndex((item) => item.key === relation.key) === pos
      )
      .map((relation) => ({
        key: relation.key,
        label: relation.label,
      }));
  }

  /**
   * Get relation by its type
   */
  byType(type: string): ConceptRelationCollection {
    return new ConceptRelationCollection(
      this.filter((relation) => relation.key === type),
      this._entryDate
    );
  }

  hasIncoming() {
    return this.incoming.length > 0;
  }

  hasOutgoing() {
    return this.outgoing.length > 0;
  }

  get incoming() {
    return new ConceptRelationCollection(
      this.filter((relation) => relation.direction === "incoming"),
      this._entryDate
    );
  }

  get outgoing() {
    return new ConceptRelationCollection(
      this.filter((relation) => relation.direction === "outgoing"),
      this._entryDate
    );
  }
}
