// @flow
import styled from "styled-components";
import { spacer } from "beinformed/theme/utils";

import { useMessage } from "beinformed/i18n";

import type { Node } from "react";
export type Props = {
  +children?: Node,
  +className?: string,
  +title: string,
};

const TableHeaderCell = styled.th`
  padding: ${spacer()};
  text-align: center;
  border-top: 0;
`;

const DatepickerTableHeaderCell = (props: Props) => (
  <TableHeaderCell {...props} title={useMessage()} />
);

DatepickerTableHeaderCell.displayName = "BI.DatepickerTableHeaderCell";

export default DatepickerTableHeaderCell;
