// @flow
import styled from "styled-components";
import { spacer, themeProp } from "beinformed/theme/utils";

const StyledTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: visible;
  margin-bottom: ${spacer()};
`;

const StyledTable = styled.div`
  display: table;
  border-collapse: collapse;

  width: 100%;
  background-color: transparent;
  min-width: ${({ minWidth }) => (minWidth ? minWidth : 0)};
`;

const StyledTableHead = styled.div`
  display: table-header-group;

  font-weight: 700;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-bottom-width: 2px;
`;

const StyledTableHeadCell = styled.div`
  display: table-cell;
  color: ${themeProp("TABLE_HEADER_COLOR")};

  &:focus,
  &:hover {
    text-decoration: none;
  }

  padding: ${spacer(0.75)};
  vertical-align: top;

  ${({ cellMinWidth }) => cellMinWidth && `min-width: ${cellMinWidth}`};
  ${({ cellWidth }) => cellWidth && `width: ${cellWidth}`};
  ${({ align }) =>
    (align === "right" && "text-align: right;") ||
    (align === "center" && "text-align: center;")};
`;

const StyledTableRows = styled.div`
  display: table-row-group;
`;

const StyledTableRow = styled.div`
  display: table-row;

  border: 1px solid rgba(0, 0, 0, 0.125);
`;

const StyledTableCell = styled.div`
  display: table-cell;

  padding: ${spacer(0.75)};
  vertical-align: ${({ verticalAlign }) => verticalAlign || "top"};

  ${({ cellMinWidth }) => cellMinWidth && `min-width: ${cellMinWidth}`};
  ${({ cellWidth }) => cellWidth && `width: ${cellWidth}`};
  ${({ align }) =>
    (align === "right" && "text-align: right;") ||
    (align === "center" && "text-align: center;")};
`;

export {
  StyledTableWrapper,
  StyledTable,
  StyledTableHead,
  StyledTableHeadCell,
  StyledTableRows,
  StyledTableRow,
  StyledTableCell,
};
