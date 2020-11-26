// @flow
import classNames from "classnames";
import styled from "styled-components";
import { spacer } from "beinformed/theme/utils";

import { ListItemCollection } from "beinformed/models";

import { ListResults, ListGroupHeader } from "_component-registry/list";

import type { GroupingModel, ListModel } from "beinformed/models";
export type Props = {
  +grouping: GroupingModel,
  +level?: number,
  +className?: string,
  +list: ListModel,
  +getView: (viewProps: Object) => any,
};

const StyledGroup = styled.div`
  margin-bottom: ${spacer()};
`;

/**
 * Retrieve all list item that have a reference to the group reference
 */
const getFilteredList = (list: ListModel, references: Array<number>) => {
  const filteredList = list.clone();

  filteredList.listItemCollection = new ListItemCollection();
  filteredList.listItemCollection.collection = list.listItemCollection.filter(
    (listitem) => references.includes(listitem.id)
  );

  return filteredList;
};

const ListGroup = ({
  className,
  grouping,
  level = 1,
  list,
  getView,
}: Props) => {
  if (grouping.hasGroups()) {
    return (
      <div className={classNames("grouped-list", className)}>
        {grouping.groups.map((group) => {
          const filteredList = getFilteredList(list, group.reference);
          return (
            <StyledGroup
              key={group.id}
              className="grouped-list-group"
              data-id={group.id}
            >
              <ListGroupHeader level={level} group={group} />

              {group.reference && group.reference.length > 0 && (
                <ListResults list={filteredList} getView={getView} />
              )}

              {group.grouping && (
                <ListGroup
                  grouping={group.grouping}
                  level={level + 1}
                  list={list}
                  getView={getView}
                />
              )}
            </StyledGroup>
          );
        })}
      </div>
    );
  }

  return <ListResults className={className} list={list} getView={getView} />;
};

ListGroup.displayName = "BI.ListGroup";

export default ListGroup;
