// @flow
import classNames from "classnames";

import { AttributeValue } from "_component-registry/attributes-readonly";
import { StyledTableCell } from "_component-registry/list";
import { AttributeRenderer } from "_component-registry/inline-edit";

import { BooleanAttributeModel, ChoiceAttributeModel } from "beinformed/models";

import type { AttributeType } from "beinformed/models";
export type Props = {
  +itemId: string,
  +attribute?: ?AttributeType,
  +className?: string,
  +onFocus?: Function,
  +onBlur?: Function,
  +onChange?: Function,
};

/**
 * Render an HTML table cell
 */
const EditTableCell = ({
  itemId,
  attribute,
  className,
  onFocus,
  onBlur,
  onChange,
}: Props) => {
  if (!attribute) {
    return (
      <StyledTableCell className={classNames("table-cell", className)}>
        &nbsp;
      </StyledTableCell>
    );
  }

  const getVerticalAlign = (attribute) => {
    if (
      attribute instanceof ChoiceAttributeModel ||
      attribute instanceof BooleanAttributeModel
    ) {
      if (
        attribute.choicetype === "radiobutton" ||
        attribute.choicetype === "checkbox" ||
        attribute.choicetype === "toggle"
      ) {
        return "middle";
      }
    }
    return "top";
  };

  return (
    <StyledTableCell
      className={classNames("table-cell", `${attribute.type}widget`, className)}
      data-id={itemId}
      verticalAlign={getVerticalAlign(attribute)}
    >
      {attribute.readonly ? (
        <AttributeValue attribute={attribute} />
      ) : (
        <AttributeRenderer
          itemId={itemId}
          attribute={attribute}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
        />
      )}
    </StyledTableCell>
  );
};

EditTableCell.displayName = "BI.EditTableCell";

export default EditTableCell;
