// @flow
import { StyledTableRow, StyledTableCell } from "_component-registry/list";

import type { ListModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +list: ListModel,
};

const EditTableNoResults = ({ className, list }: Props) => (
  <StyledTableRow className={className}>
    <StyledTableCell>No results</StyledTableCell>
    {list.headers.map((header) => (
      <StyledTableCell key={header.key} />
    ))}
  </StyledTableRow>
);

EditTableNoResults.displayName = "BI.EditTableNoResults";

export default EditTableNoResults;
