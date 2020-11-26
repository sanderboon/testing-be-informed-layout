// @flow
import { Fragment, useState } from "react";
import { isUndefined } from "lodash";

import classNames from "classnames";

import { StyledTableWrapper, StyledTable } from "_component-registry/list";
import {
  EditTableHead,
  EditTableRows,
  EditTableCreateButtons,
} from "_component-registry/inline-edit";

import type { ListModel, ListItemModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +list: ListModel,
  +selectType?: "single" | "multi",
  +selectedItems?: Array<ListItemModel>,
  +onItemSelect?: Function,
  +openListItemInCaseView?: boolean,
};

const EditTable = ({
  className,
  list,
  selectType,
  selectedItems = [],
  onItemSelect,
}: Props) => {
  const isSelectable = !isUndefined(selectType);
  const [showCreateForm, setShowCreateForm] = useState(null);

  return (
    <Fragment>
      <StyledTableWrapper
        className={classNames(className, "table-inline-edit")}
      >
        <StyledTable className="table">
          <EditTableHead list={list} isSelectable={isSelectable} />
          <EditTableRows
            list={list}
            selectType={selectType}
            selectedItems={selectedItems}
            onItemSelect={onItemSelect}
            showCreateForm={showCreateForm}
            setShowCreateForm={setShowCreateForm}
          />
        </StyledTable>
      </StyledTableWrapper>
      <EditTableCreateButtons
        list={list}
        showCreateForm={showCreateForm}
        setShowCreateForm={setShowCreateForm}
      />
    </Fragment>
  );
};

EditTable.displayName = "BI.EditTable";

export default EditTable;
