// @flow
import classNames from "classnames";
import styled, { css } from "styled-components";

import { spacer, themeProp } from "beinformed/theme/utils";

import SortIconSVG from "./sort-icon.svg";

export type Props = {
  +className?: string,
  +sortorder: "desc" | "asc",
  +color?: string,
};

const StyledSVG = styled.svg`
  width: 16px;
  height: 16px;
  color: ${themeProp("PRIMARY_COLOR")};

  fill: ${({ color }) => color || "currentColor"};

  ${(props) =>
    props.textAfter &&
    css`
      margin-right: ${spacer(0.25)};
    `};
  ${(props) =>
    props.textBefore &&
    css`
      margin-left: ${spacer(0.25)};
    `};
`;

const TableHeadSortIcon = ({ className, color, sortorder }: Props) => (
  <StyledSVG
    className={classNames("table-head-sort-icon", className)}
    viewBox="0 0 24 24"
    color={color}
    textBefore
    ariaHidden
  >
    <use xlinkHref={`${SortIconSVG}#${sortorder}`} />
  </StyledSVG>
);

TableHeadSortIcon.displayName = "BI.TableHeadSortIcon";

export default TableHeadSortIcon;
