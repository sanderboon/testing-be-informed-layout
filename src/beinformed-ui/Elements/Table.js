// @flow
import styled from "styled-components";
import { spacer, themeProp } from "beinformed/theme/utils";

const TableWrapper = styled.div`
  display: block;
  width: 100%;
  overflow-x: auto;
`;
const Table = styled.table`
  width: 100%;
  margin-bottom: ${spacer()};
  background-color: transparent;
`;

const TableHeaderRow = styled.tr`
  border-bottom: 1px solid ${themeProp("TABLE_ROW_DIVIDER")};
`;

const TableRow = styled.tr`
  border-bottom: 1px solid ${themeProp("TABLE_ROW_DIVIDER")};

  &:nth-child(even) {
    background: ${themeProp("TABLE_ROW")};
  }

  &:nth-child(odd) {
    background: ${themeProp("TABLE_ROW_ALT")};
  }
`;
const HeaderCell = styled.th`
  padding: ${spacer(0.75)};
  vertical-align: bottom;
  border-top: 1px solid ${themeProp("GREY_300", "#dee2e6")};
  border-bottom: 2px solid ${themeProp("GREY_300", "#dee2e6")};
`;
const Cell = styled.td`
  padding: ${spacer(0.75)};
  vertical-align: top;
  border-top: 1px solid ${themeProp("GREY_300", "#dee2e6")};
`;

export { TableWrapper, Table, TableHeaderRow, HeaderCell, TableRow, Cell };
