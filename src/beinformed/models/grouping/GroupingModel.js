// @flow
import AttributeCollection from "beinformed/models/attributes/AttributeCollection";

/**
 * Group information model
 * Put GroupModel here because of possible circular dependency with GroupingModel below
 */
class GroupModel {
  _group: Object;
  _context: Object;
  _attributeCollection: AttributeCollection;
  _grouping: ?GroupingModel;

  constructor(group: Object, context: Object, contributions: Array<Object>) {
    this._group = group;
    this._context = context;

    this._attributeCollection = new AttributeCollection(
      group,
      context.attributes
    );

    if (group.grouping) {
      this._grouping = new GroupingModel(
        { ...group.grouping, dynamicschema: group.dynamicschema },
        contributions
      );
    }
  }

  get type(): string {
    return this._group.type;
  }

  get id(): string {
    return this._group._id || "unknown";
  }

  get label(): string {
    return this._context.label;
  }

  get attributeCollection(): AttributeCollection {
    return this._attributeCollection;
  }

  get grouping(): ?GroupingModel {
    return this._grouping;
  }

  /**
   * Retrieve array of reference id's
   */
  get reference(): Array<number> {
    return this._group.reference || [];
  }

  hasAttributeByKey(key: string) {
    if (this.attributeCollection.hasAttributeByKey(key)) {
      return true;
    }

    if (this.grouping) {
      return this.grouping.hasAttributeByKey(key);
    }

    return false;
  }

  getAttributeByKey(key: string) {
    if (this.attributeCollection.hasAttributeByKey(key)) {
      return this.attributeCollection.getAttributeByKey(key);
    }

    if (this.grouping) {
      return this.grouping.getAttributeByKey(key);
    }

    return null;
  }
}

type Context = {
  prefix: string,
  label: string,
  metadata: Object,
  attributes: Array<Object>,
};

/**
 * Grouping model to group lists
 */
class GroupingModel {
  _prefix: string | null;
  _groups: Array<GroupModel>;

  constructor(data: Object, contexts: Array<Context>) {
    this._prefix = data && data.prefix ? data.prefix : null;

    const context = this.getContextFromContributionsByPrefix(
      contexts,
      this._prefix
    );

    const dynamicschema = data && data.dynamicschema;
    this._groups =
      data && data.group
        ? data.group.map(
            (group) =>
              new GroupModel({ ...group, dynamicschema }, context, contexts)
          )
        : [];
  }

  /**
   * Retrieve groups of grouping
   */
  get groups(): Array<GroupModel> {
    return this._groups;
  }

  /**
   * Inidicates if Grouping has one or more groups
   */
  hasGroups(): boolean {
    return this._groups.length > 0;
  }

  /**
   * Get context of grouping
   */
  getContextFromContributionsByPrefix(
    contexts: Array<Object>,
    prefix: string | null
  ) {
    if (contexts && prefix !== null) {
      return contexts.find((context) => context.prefix === prefix) || {};
    }

    return {};
  }

  hasAttributeByKey(key: string) {
    return this.groups.some((group) => group.hasAttributeByKey(key));
  }

  getAttributeByKey(key: string) {
    return this.groups.find((group) => group.getAttributeByKey(key));
  }

  getGroupByAttributeKey(key: string) {
    return this.groups.find((group) => group.hasAttributeByKey(key));
  }
}

export default GroupingModel;
export { GroupModel };
