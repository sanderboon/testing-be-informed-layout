// @flow
import classNames from "classnames";
import styled from "styled-components";

import { StyledTableCell } from "_component-registry/list";
import {
  ButtonDelete,
  ButtonClone,
  ButtonSave,
  ButtonCancel,
  ButtonError,
} from "_component-registry/inline-edit";

import type { ListItemModel, FormModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +item: ?ListItemModel,
  +itemId: string,
  +form: FormModel,
  +isUpdate?: boolean,
  +hasFocus: boolean,
  +isChanged: boolean,
  +canDuplicate?: boolean,
  +onDuplicate?: Function,
  +onSave: Function,
  +onCancel: Function,
};

const StyledCell = styled.div`
  min-width: 110px;
  white-space: nowrap;

  > * {
    margin-right: 1px;
  }
`;

const EditTableRowButtons = ({
  className,
  item,
  itemId,
  form,
  isUpdate,
  hasFocus,
  isChanged,
  canDuplicate,
  onDuplicate,
  onSave,
  onCancel,
}: Props) => {
  if (hasFocus || !item || !isUpdate) {
    const isDuplicate = item && !isUpdate;

    return (
      <StyledCell
        as={StyledTableCell}
        className={classNames("table-cell", className)}
      >
        {form &&
        form.currentFormObject &&
        form.currentFormObject.hasErrors() ? (
          <ButtonError className="btn-error" form={form} />
        ) : (
          (isChanged || isDuplicate) && (
            <ButtonSave className="btn-save" itemId={itemId} onSave={onSave} />
          )
        )}

        <ButtonCancel
          className="btn-cancel"
          itemId={itemId}
          onCancel={onCancel}
        />
      </StyledCell>
    );
  }

  return (
    <StyledCell
      as={StyledTableCell}
      className={classNames("table-cell", className)}
    >
      {item.actionCollection.getActionsByType("delete").map((action) => (
        <ButtonDelete
          key={action.name}
          className="btn-delete"
          itemId={itemId}
          href={action.selfhref}
          label={action.label}
        />
      ))}

      {canDuplicate && (
        <ButtonClone
          className="btn-clone"
          itemId={itemId}
          onClick={onDuplicate}
        />
      )}
    </StyledCell>
  );
};

EditTableRowButtons.displayName = "BI.EditTableRowButtons";

export default EditTableRowButtons;
