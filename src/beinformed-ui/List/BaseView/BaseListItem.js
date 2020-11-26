// @flow
import { forwardRef } from "react";
import { isUndefined } from "lodash";

import classNames from "classnames";
import styled, { css } from "styled-components";
import { themeProp, spacers } from "beinformed/theme/utils";

import { useDispatch, useSelector } from "react-redux";
import { push } from "beinformed/redux/actions/Router";

import { ListItemSelect } from "_component-registry/list";

import { getListItemHref } from "../_util";

import type { Node } from "react";
import type { ListModel, ListItemModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +children?: Node,
  +list: ListModel,
  +item: ListItemModel,
  +selectType?: "single" | "multi",
  +isSelected: boolean,
  +querystring?: string,
  +openListItemInCaseView?: boolean,
  +onSelect?: Function,
  +isLookup?: boolean,
  +role?: string,
  +onClick?: (
    e: SyntheticMouseEvent<HTMLDivElement>,
    defaultClickHandler: (e: SyntheticMouseEvent<HTMLDivElement>) => void
  ) => void,
  +onFocus?: Function,
  +onBlur?: Function,
  +onMouseEnter?: Function,
  +onMouseLeave?: Function,
  +onTouchStart?: Function,
  +onTouchMove?: Function,
  +onTouchEnd?: Function,
  +onKeyUp?: Function,
  +onKeyDown?: Function,
  +alternativeBackground?: boolean,
};

const StyledListItem = styled.div`
  position: relative;
  margin-top: -1px;
  width: 100%;

  ${({ isActive, alternativeBackground }) =>
    isActive
      ? css`
          z-index: 2;
          color: ${themeProp("LISTITEM_ACTIVE_COLOR", "#fff")};
          background-color: ${themeProp("LISTITEM_ACTIVE_BG", "#007bff")};
          border-color: ${themeProp("LISTITEM_ACTIVE_BG", "#007bff")};
        `
      : css`
          color: ${themeProp("GREY_700", "#495057")};
          background-color: ${alternativeBackground
            ? themeProp("TABLE_ROW_ALT")
            : themeProp("TABLE_ROW")};
        `};

  > a,
  > a:hover,
  > a:focus {
    color: inherit;
  }
`;

const StyledSelect = styled.div`
  padding: ${spacers(0.75, 0.625, 0.75, 1.25)};
`;

const BaseListItem = forwardRef<Props, typeof StyledListItem>(
  (
    {
      className,
      children,
      list,
      item,
      selectType,
      querystring,
      isSelected,
      openListItemInCaseView,
      isLookup,
      role,
      onClick,
      onSelect,
      onFocus,
      onBlur,
      onMouseEnter,
      onMouseLeave,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onKeyUp,
      onKeyDown,
      alternativeBackground,
    }: Props,
    ref
  ) => {
    const dispatch = useDispatch();
    const location = useSelector((state) => state.router.location);

    const href = isLookup
      ? null
      : getListItemHref(list, item, querystring, openListItemInCaseView);

    const isSelectable = !isUndefined(selectType) && Boolean(onSelect);

    const defaultHandleClick = (e: SyntheticMouseEvent<HTMLDivElement>) => {
      // $FlowFixMe
      if (isSelectable && onSelect && e.target.closest(".listitem-option")) {
        onSelect(item);
        // $FlowFixMe
      } else if (!e.target.closest("a") && href) {
        dispatch(push(href.toLocation()));
      }
    };

    const handleClick = (e: SyntheticMouseEvent<HTMLDivElement>) => {
      if (onClick) {
        onClick(e, defaultHandleClick);
      } else {
        defaultHandleClick(e);
      }
    };

    const isActive = href && href.equals(location.pathname);

    return (
      <StyledListItem
        ref={ref}
        data-id={item.id}
        className={classNames("list-group-item", className)}
        isSelectable={isSelectable}
        isActive={isActive}
        onClick={handleClick}
        role={role}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        alternativeBackground={alternativeBackground}
      >
        {isSelectable && (
          <StyledSelect>
            <ListItemSelect selectType={selectType} isSelected={isSelected} />
          </StyledSelect>
        )}
        {children}
      </StyledListItem>
    );
  }
);
BaseListItem.displayName = "BI.BaseListItem";

export default BaseListItem;
