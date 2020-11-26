// @flow
import { useState } from "react";

import classNames from "classnames";
import styled, { css } from "styled-components";
import { themeProp } from "beinformed/theme/utils/themeProps";

import {
  BaseListItem,
  InboxCell,
  StyledTableRow,
} from "_component-registry/list";

import { getListItemHref } from "../_util";
import { INBOX_HIGHLIGHT } from "beinformed/constants/LayoutHints";

import type { ListModel, ListItemModel } from "beinformed/models";
import { isUndefined } from "lodash";
export type Props = {
  +className?: string,
  +list: ListModel,
  +item: ListItemModel,
  +selectType?: "single" | "multi",
  +isSelected: boolean,
  +querystring?: string,
  +openListItemInCaseView?: boolean,
  +onSelect?: Function,
  +isLookup?: boolean,
};

const StyledInboxRow = styled(StyledTableRow)`
  ${({ isHighlighted }) =>
    isHighlighted &&
    css`
      font-weight: ${themeProp("FONT_WEIGHT_BOLD")};
    `};
`;

/**
 * Render an HTML table row
 */
const InboxRow = ({
  className,
  list,
  item,
  selectType,
  isSelected,
  querystring,
  openListItemInCaseView,
  isLookup,
  onSelect,
}: Props) => {
  const [isClicked, setIsClicked] = useState(false);
  const { titleAttribute } = item;
  const isSelectable = !isUndefined(selectType) && Boolean(onSelect);

  const href = isLookup
    ? null
    : getListItemHref(list, item, querystring, openListItemInCaseView);

  const highlightCell = item.attributeCollection.getAttributeByLayoutHint(
    INBOX_HIGHLIGHT
  );
  const isHighlighted =
    !isClicked && highlightCell && highlightCell.value === "true";

  const handleClick = (e, defaultClickHandler) => {
    setIsClicked(true);
    defaultClickHandler(e);
  };

  return (
    <StyledInboxRow
      as={BaseListItem}
      className={classNames(
        "table-row",
        { "is-unread": isHighlighted },
        className
      )}
      isSelectable={isSelectable}
      isHighlighted={isHighlighted}
      list={list}
      item={item}
      selectType={selectType}
      querystring={querystring}
      openListItemInCaseView={openListItemInCaseView}
      isLookup={isLookup}
      isSelected={isSelected}
      onSelect={onSelect}
      role="row"
      onClick={handleClick}
    >
      {list.headers
        .filter((header) => !header.layouthint.has(INBOX_HIGHLIGHT))
        .map((header) => {
          const attribute = item.getAttributeByKey(header.key);

          let cellWidth = "15%";
          if (header.key === "subject") {
            cellWidth = "25%";
          } else if (header.key === "inboxItemData") {
            cellWidth = "35%";
          }

          return (
            <InboxCell
              key={`${item.id}--${header.key}`}
              width={cellWidth}
              minWidth="125px"
              attribute={attribute}
              href={href}
              renderAsLink={!titleAttribute || attribute.equals(titleAttribute)}
            />
          );
        })}
    </StyledInboxRow>
  );
};

InboxRow.displayName = "BI.InboxRow";

export default InboxRow;
