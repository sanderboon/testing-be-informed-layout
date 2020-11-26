// @flow
import { TableHead, TableHeadCell } from "_component-registry/list";

import type { ListModel } from "beinformed/models";

export type Props = {
  +className?: string,
  +list: ListModel,
  +isSelectable?: boolean,
};

const EditTableHead = ({ className, list, isSelectable = false }: Props) => (
  <TableHead className={className} list={list} isSelectable={isSelectable}>
    <TableHeadCell>&nbsp;</TableHeadCell>
  </TableHead>
);

EditTableHead.displayName = "BI.EditTableHead";

export default EditTableHead;
