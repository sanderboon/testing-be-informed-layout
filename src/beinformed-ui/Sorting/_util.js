// @flow
import type { GroupModel, SortOptionModel } from "beinformed/models";

export const getGroupLabel = (
  group: ?GroupModel,
  sortOption: SortOptionModel
) => {
  if (!group) {
    return null;
  }

  const { label } = group;

  if (group.grouping) {
    const groupWithOption = group.grouping.getGroupByAttributeKey(
      sortOption.key
    );
    if (groupWithOption) {
      const groupLabel = getGroupLabel(groupWithOption, sortOption);
      return `${label}, ${groupLabel || ""}`;
    }
  }

  return `(${label})`;
};
