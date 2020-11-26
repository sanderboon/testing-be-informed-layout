// @flow
import BaseCollection from "beinformed/models/base/BaseCollection";

import RangeFilterModel from "beinformed/models/filters/RangeFilterModel";
import AssignmentFilterModel from "beinformed/models/filters/AssignmentFilterModel";
import FilterModel from "beinformed/models/filters/FilterModel";
import ConceptIndexFilterModel from "beinformed/models/filters/ConceptIndexFilterModel";
import CompositeAttributeModel from "beinformed/models/attributes/CompositeAttributeModel";

import type { AttributeType, FilterType } from "beinformed/models";

/**
 * Contains a collection of filters
 */
export default class FilterCollection extends BaseCollection<FilterType> {
  /**
   * Construct a collection of filters
   */
  constructor(data: Object = {}, contributions: Object = {}) {
    super();

    if (data && contributions && Array.isArray(contributions.filter)) {
      this.collection = contributions.filter
        .filter((filterContribution) => Object.keys(filterContribution)[0])
        .map((filterContribution) => {
          const [filterKey] = Object.keys(filterContribution);
          const filterData = data[filterKey];
          const filterContributionByKey = filterContribution[filterKey];

          const filter = this.createFilter(
            filterKey,
            {
              ...filterData,
              dynamicschema: contributions.dynamicschema,
            },
            filterContributionByKey
          );

          if (contributions.listkey) {
            filter.listkey = contributions.listkey;
          }

          if (contributions.contexts && filterContributionByKey.contextid) {
            const filterContext = contributions.contexts.find(
              (context) => context.id === filterContributionByKey.contextid
            );
            if (filterContext) {
              filter.context = filterContext;
            }
          }

          return filter;
        });
    }
  }

  createFilter(filterKey: string, data: Object, contributions: Object) {
    const type = contributions.type || "stringfilter";
    if (type === "choicefilter" && filterKey === "index") {
      return new ConceptIndexFilterModel(data, contributions);
    }

    if (type.includes("rangefilter")) {
      return new RangeFilterModel(data, contributions);
    }

    if (type === "assignmentfilter") {
      return new AssignmentFilterModel(data, contributions);
    }

    return new FilterModel(data, contributions);
  }

  /**
   * Call the reset function on all filters
   * @see {FilterRen#reset()}
   */
  reset() {
    this.collection = this.collection.map((filter) => filter.reset());

    return this;
  }

  /**
   * Checks if range attribute key equals key
   */
  checkRangeFilterByAttributeKey(filter: RangeFilterModel, key: string) {
    const rangeAttribute = filter.attribute;

    if (rangeAttribute instanceof CompositeAttributeModel) {
      return (
        rangeAttribute.key === key ||
        (rangeAttribute.start && rangeAttribute.start.key === key) ||
        (rangeAttribute.end && rangeAttribute.end.key === key)
      );
    }

    return false;
  }

  /**
   * Check if assignment filter attribute matches key
   */
  checkAssignmentFilterByAttributeKey(
    filter: AssignmentFilterModel,
    key: string
  ) {
    return (
      filter.key === key ||
      (filter.user && filter.user.key === key) ||
      (filter.assignmenttype && filter.assignmenttype.key === key)
    );
  }

  /**
   * Getting the filter by name
   */
  getFilterByAttributeKey(key: string) {
    return (
      this.find((filter) => {
        if (filter instanceof RangeFilterModel) {
          return this.checkRangeFilterByAttributeKey(filter, key);
        }

        if (filter instanceof AssignmentFilterModel) {
          return this.checkAssignmentFilterByAttributeKey(filter, key);
        }

        return filter.attribute.key === key;
      }) || null
    );
  }

  /**
   * Update Filter by input name and value
   */
  update(attribute: AttributeType, value: string) {
    const filterToUpdate = attribute.parentKey
      ? this.getFilterByAttributeKey(attribute.parentKey)
      : this.getFilterByAttributeKey(attribute.key);

    if (!filterToUpdate) {
      throw new Error(`Can not find filter by attribute key: ${attribute.key}`);
    }

    const newFilter = filterToUpdate.clone();
    newFilter.update(attribute, value);

    this.collection = this.collection.map((filter) => {
      if (filter.name === newFilter.name) {
        return newFilter;
      }

      return filter;
    });
  }

  /**
   * Retrieve if all filters are valid
   */
  get isValid() {
    return this.collection.every((filter) => filter.isValid);
  }

  /**
   * Indicates if an active filter is present in the collection
   */
  hasActiveFilters() {
    return this.collection.some((filter) => filter.isActive());
  }
}
