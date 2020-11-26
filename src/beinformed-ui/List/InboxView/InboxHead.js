// @flow
import classNames from "classnames";

import {
  InboxHeadCell,
  InboxHeadCellSortable,
  StyledTableHead,
} from "_component-registry/list";

import { INBOX_HIGHLIGHT } from "beinformed/constants/LayoutHints";

import type { ListModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +list: ListModel,
  +isSelectable?: boolean,
};

/**
 * Render an HTML table
 */
const InboxHead = ({ className, list, isSelectable = false }: Props) => (
  <StyledTableHead className={classNames("table-header", className)} role="row">
    {isSelectable && <InboxHeadCell width="40px">&nbsp;</InboxHeadCell>}
    {list.headers
      .filter((header) => !header.layouthint.has(INBOX_HIGHLIGHT))
      .map((header) => {
        let cellWidth = "15%";
        if (header.key === "subject") {
          cellWidth = "25%";
        } else if (header.key === "inboxItemData") {
          cellWidth = "35%";
        }

        return (
          <InboxHeadCellSortable
            key={`headercell--${header.key}`}
            align={header.alignment}
            width={cellWidth}
            minWidth="125px"
            header={header}
            listHref={list.selfhref}
          >
            {header.label}
          </InboxHeadCellSortable>
        );
      })}
  </StyledTableHead>
);

InboxHead.displayName = "BI.InboxHead";

export default InboxHead;
