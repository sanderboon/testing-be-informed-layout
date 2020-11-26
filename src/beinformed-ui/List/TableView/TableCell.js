// @flow
import classNames from "classnames";

import { AttributeValueText } from "_component-registry/attributes-readonly";
import { Link } from "_component-registry/link";
import { StyledTableCell } from "_component-registry/list";

import type { AttributeType, Href } from "beinformed/models";
export type Props = {
  +attribute?: AttributeType,
  +className?: string,
  +minWidth?: string,
  +width?: string,
  +href: ?Href,
  +renderAsLink?: boolean,
};

/**
 * Render an HTML table cell
 */
const TableCell = ({
  attribute,
  className,
  minWidth,
  width,
  href,
  renderAsLink = true,
}: Props) => {
  const getAriaRole = (): string => {
    const isRowHeader = attribute && attribute.layouthint.has("title");
    return isRowHeader ? "rowheader" : "cell";
  };

  const getAlignment = () => {
    if (attribute) {
      if (
        ["number", "money"].includes(attribute.type) &&
        !attribute.layouthint.has("align-")
      ) {
        return "right";
      }

      return attribute.alignment;
    }

    return "left";
  };

  if (attribute && href && !href.equals("") && renderAsLink) {
    return (
      <StyledTableCell
        as={Link}
        href={href}
        className={classNames("table-cell", className)}
        cellMinWidth={minWidth}
        cellWidth={width}
        align={getAlignment()}
        role={getAriaRole()}
      >
        <AttributeValueText attribute={attribute} />
      </StyledTableCell>
    );
  }

  return (
    <StyledTableCell
      className={classNames("table-cell", className)}
      cellMinWidth={minWidth}
      cellWidth={width}
      role={getAriaRole()}
      align={getAlignment()}
    >
      {attribute ? <AttributeValueText attribute={attribute} /> : "\u00A0"}
    </StyledTableCell>
  );
};

TableCell.displayName = "BI.TableCell";

export default TableCell;
