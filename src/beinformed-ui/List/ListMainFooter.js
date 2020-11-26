// @flow
import classNames from "classnames";
import styled from "styled-components";
import { spacer } from "beinformed/theme/utils";

import { MultiRowTask } from "_component-registry/list";
import { PagesizeChooser, Pagination } from "_component-registry/paging";

import { MULTI_ROW_TASK } from "beinformed/constants/LayoutHints";

import type { ListModel, ListItemModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +list: ListModel,
  +selectedItems?: Array<ListItemModel>,
  +onPageChange?: Function,
  +onPagesizeChange?: Function,
};

const StyledMultiRowTask = styled.div`
  flex-basis: 100%;
  margin-bottom: ${spacer()};
`;
const StyledPagination = styled(Pagination)`
  align-self: flex-start;
`;
const StyledPagesizeChooser = styled(PagesizeChooser)`
  margin-left: auto;
  flex-grow: 0;
`;
const StyledFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: ${spacer()};
`;

const ListMainFooter = ({
  className,
  list,
  selectedItems,
  onPageChange,
  onPagesizeChange,
}: Props) => {
  const maxPageSize = list.paging.totalResults;

  const pagesizeOptions = list.paging.pagesize.options.filter(
    (option, i, arr) =>
      maxPageSize === -1 || option < maxPageSize || arr[i - 1] < maxPageSize
  );
  const multiRowTaskActions = list.actionCollection.getActionsByLayoutHint(
    MULTI_ROW_TASK
  );

  const hasMultiRowTasks = multiRowTaskActions.hasItems;
  const hasPagination =
    list.paging.isEnabled &&
    (!list.paging.maxpages || list.paging.maxpages > 1);
  const hasPagesize = pagesizeOptions.length >= 2;

  if (hasPagination || hasMultiRowTasks || hasPagesize) {
    return (
      <StyledFooter className={classNames("list-footer", className)}>
        {hasMultiRowTasks && (
          <StyledMultiRowTask
            as={MultiRowTask}
            actions={multiRowTaskActions}
            selectedItems={selectedItems}
          />
        )}

        {hasPagination && (
          <StyledPagination list={list} onChange={onPageChange} />
        )}

        {hasPagesize && (
          <StyledPagesizeChooser
            align="right"
            size="small"
            direction="up"
            list={list}
            onChange={onPagesizeChange}
          />
        )}
      </StyledFooter>
    );
  }

  return null;
};

ListMainFooter.displayName = "BI.ListMainFooter";

export default ListMainFooter;
