// @flow
import classNames from "classnames";
import styled from "styled-components";
import { spacer } from "beinformed/theme/utils";

import { isUndefined } from "lodash";

import { ListItemSelect, StyledTableRow } from "_component-registry/list";
import {
  EditTableCell,
  EditTableRowButtons,
} from "_component-registry/inline-edit";

import type {
  FormModel,
  ListItemModel,
  AttributeType,
} from "beinformed/models";
export type Props = {
  className?: string,
  itemId: string,
  isUpdate: boolean,
  item: ?ListItemModel,
  attributes: Array<AttributeType | null>,
  form: ?FormModel,
  canDuplicate?: boolean,
  hasFocus: boolean,
  isChanged: boolean,
  isSelected?: boolean,
  selectType?: "single" | "multi",
  onSelect?: () => void,
  onFocus: () => void,
  onBlur: () => void,
  onChange: (attribute: AttributeType, inputvalue: string) => void,
  onCancel?: () => void,
  onDuplicate: () => void,
};

const StyledSelect = styled.div`
  display: inline-block;
  padding: ${spacer(0.75)};
  overflow: hidden;
  vertical-align: top;
`;

const EditTableRowRenderer = ({
  className,
  itemId,
  isUpdate,
  item,
  attributes,
  form,
  canDuplicate,
  hasFocus,
  isChanged,
  isSelected,
  selectType,
  onSelect,
  onDuplicate,
  onFocus,
  onBlur,
  onChange,
  onCancel,
}: Props) => {
  const isSelectable = !isUndefined(selectType);

  return (
    <StyledTableRow
      className={classNames("table-row", className)}
      data-id={itemId}
    >
      {isSelectable && onSelect && (
        <StyledSelect onClick={onSelect}>
          <ListItemSelect
            selectType={selectType}
            isSelected={isSelected || false}
          />
        </StyledSelect>
      )}
      {attributes.map((attribute, idx) => {
        const id = `${itemId}--${attribute ? attribute.name : idx}`;
        return (
          <EditTableCell
            key={id}
            itemId={id}
            attribute={attribute}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onChange}
          />
        );
      })}

      {form && (
        <EditTableRowButtons
          item={item}
          itemId={itemId}
          form={form}
          canDuplicate={canDuplicate || false}
          hasFocus={hasFocus}
          isChanged={isChanged}
          isUpdate={isUpdate}
          onDuplicate={onDuplicate}
          onSave={onBlur}
          onCancel={onCancel}
        />
      )}
    </StyledTableRow>
  );
};
EditTableRowRenderer.displayName = "BI.EditTableRow";

export default EditTableRowRenderer;
