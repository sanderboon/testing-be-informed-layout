// @flow
import classNames from "classnames";
import styled from "styled-components";
import { spacer } from "beinformed/theme/utils";
import { MULTI_ROW_TASK } from "beinformed/constants/LayoutHints";
import { useMessage } from "beinformed/i18n";
import ButtonToolbar from "beinformed-ui/Button/ButtonToolbar";

import { ActionChooser } from "_component-registry/actions";
import { ListViewTypeToggle } from "_component-registry/list";
import { SortChooser } from "_component-registry/sorting";
import { PagingInfo } from "_component-registry/paging";
import { ChosenFilters } from "_component-registry/filters";
import { Row, Column } from "_component-registry/grid";

import type { ListModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +isRoot?: boolean,
  +list: ListModel,
  +availableViews: Array<{
    type: string,
    icon: any,
    label: string,
  }>,
  +viewType: string,
  +showFilters?: boolean,
  +onViewTypeChange: Function,
  +onSortChange?: Function,
};

const StyledButtonColumn = styled(Column)`
  text-align: right;
  margin-bottom: ${spacer(0.25)};
`;

const StyledButtonToolbar = styled(ButtonToolbar)`
  float: right;
  margin-bottom: ${spacer(0.25)};
`;

const ListMainHeader = ({
  className,
  list,
  availableViews,
  viewType,
  showFilters = true,
  onViewTypeChange,
  onSortChange,
}: Props) => {
  const ariaLabel = useMessage(
    "List.AriaLabel.HeaderToolbar",
    "Available actions for {LIST_LABEL} list",
    {
      LIST_LABEL: list && list.label,
    }
  );

  if (list.hasResults() || list.isFiltered()) {
    const { isEnabled, maxpages } = list.paging;
    // only show paginginfo if paging is enabled and there is more than 1 page
    const showPaging = isEnabled ? maxpages > 1 : false;

    // Retrieve the list actions. When the list is in editable modus, the create action is not rendered on the list
    const listActionsNoMultiRowTasks = list.actionCollection.filter(
      (action) => !action.layouthint.has(MULTI_ROW_TASK)
    );

    const listActions =
      viewType === "EditableTableView" && list.hasResults()
        ? listActionsNoMultiRowTasks.filter(
            (action) => action.type !== "create"
          )
        : listActionsNoMultiRowTasks;

    const hasMultipleViewTypes = list.hasResults() && availableViews.length > 1;

    const listIsSortable =
      list.sorting.options.length > 1 && list.listItemCollection.length > 1;

    // in table view or inline edit sorting in done on table header
    const showSortChooser =
      listIsSortable && (list.grouping.hasGroups() || viewType === "ListView");

    return (
      <div className={classNames("list-main-header", className)}>
        <Row>
          {showPaging && <Column as={PagingInfo} size={3} list={list} />}

          <StyledButtonColumn size={showPaging ? 9 : 12}>
            <StyledButtonToolbar ariaLabel={ariaLabel}>
              {listActions && (
                <ActionChooser
                  align="right"
                  size="small"
                  actions={listActions}
                />
              )}

              {showSortChooser && (
                <SortChooser
                  align="right"
                  size="small"
                  list={list}
                  onChange={onSortChange}
                />
              )}

              {hasMultipleViewTypes && (
                <ListViewTypeToggle
                  activeType={viewType}
                  availableViews={availableViews}
                  listKey={list.key}
                  onChange={onViewTypeChange}
                />
              )}
            </StyledButtonToolbar>
          </StyledButtonColumn>
        </Row>

        {showFilters && <ChosenFilters list={list} />}
      </div>
    );
  }

  return null;
};

ListMainHeader.displayName = "BI.ListMainHeader";

export default ListMainHeader;
