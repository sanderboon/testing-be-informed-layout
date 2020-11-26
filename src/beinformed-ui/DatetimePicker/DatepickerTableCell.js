// @flow
import { forwardRef } from "react";

import styled, { css } from "styled-components";
import { themeProp, roundedCorners, spacer } from "beinformed/theme/utils";

import type { Node } from "react";
export type Props = {
  +children?: Node,
  +className?: string,
  +renderEmpty?: boolean,
  +value: string,
  +ariaLabel?: string,
  +isActive?: boolean,
  +isToday?: boolean,
  +isOther?: boolean,
  +isDisabled?: boolean,
  +onClick: (e: SyntheticEvent<*>) => void,
  +onKeyDown?: (value: SyntheticKeyboardEvent<*>) => void,
};

const TableCell = styled.td`
  padding: ${spacer(0.5)};
  text-align: center;

  ${roundedCorners("border-radius", "", "2px")};

  &:focus,
  &:hover {
    background-color: ${themeProp("GREY_100", "#f8f9fa")};
  }

  &:active {
    color: #fff;
    background-color: ${themeProp("PRIMARY_COLOR", "#007bff")};
  }

  ${({ isToday }) =>
    isToday &&
    css`
      font-weight: 400;
      color: #000;
      background-color: ${themeProp("GREY_200", "#f8f9fa")};
    `}

  ${({ isActive }) =>
    isActive &&
    css`
      color: #fff;
      background-color: ${themeProp("PRIMARY_COLOR", "#007bff")};
    `}

  ${(props) => props.isOther && `opacity: 0.65;`}

  ${({ isDisabled }) =>
    isDisabled
      ? css`
          opacity: 0.65;
          color: ${themeProp("GREY_600", "#6c757d")};
          cursor: no-drop;
        `
      : `cursor: pointer`}
`;

const DatepickerTableCell = forwardRef<Props, typeof TableCell>(
  (
    {
      children,
      className,
      renderEmpty,
      value,
      isActive,
      isToday,
      isOther,
      isDisabled,
      ariaLabel,
      onClick,
      onKeyDown,
    }: Props,
    ref
  ) => {
    if (renderEmpty) {
      return (
        <TableCell ref={ref} className={className} role="gridcell">
          &nbsp;
        </TableCell>
      );
    }

    return (
      <TableCell
        ref={ref}
        className={className}
        data-value={value}
        role="link"
        isActive={isActive}
        isToday={isToday}
        isOther={isOther}
        isDisabled={isDisabled}
        aria-label={ariaLabel}
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        {children}
      </TableCell>
    );
  }
);

DatepickerTableCell.displayName = "BI.DatepickerTableCell";

export default DatepickerTableCell;
