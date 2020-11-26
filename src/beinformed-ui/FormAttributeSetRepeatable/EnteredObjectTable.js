// @flow
import styled from "styled-components";
import { spacer } from "beinformed/theme/utils";
import classNames from "classnames";

import { Message } from "beinformed/i18n";

import {
  Cell,
  HeaderCell,
  Table,
  TableWrapper,
  TableHeaderRow,
  TableRow,
} from "_component-registry/elements";
import { AttributeValueText } from "_component-registry/attributes-readonly";
import { Button } from "_component-registry/buttons";

import type { FormObjectModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +objects: Array<FormObjectModel>,
  +objectLabel: string,
  +onRemove: (formObject: FormObjectModel) => void,
};

const StyledNoObjects = styled.div`
  margin-bottom: ${spacer()};
`;
const StyledDeleteCell = styled(Cell)`
  width: 1px;
  white-space: nowrap;
`;

const EnteredObjectTable = ({
  className,
  objects,
  objectLabel = "",
  onRemove,
}: Props) => {
  if (objects.length === 0) {
    return (
      <StyledNoObjects className={classNames(className, "no-entered-objects")}>
        <Message
          id="ListNoResults.Msg.NoResults"
          defaultMessage="No {LABEL} available"
          data={{
            LABEL: objectLabel.toLowerCase(),
          }}
        />
      </StyledNoObjects>
    );
  }

  return (
    <TableWrapper className={className}>
      <Table>
        <thead>
          <TableHeaderRow>
            {objects[0].attributeCollection.map((cell) => (
              <HeaderCell key={`th-${cell.name}`} scope="col">
                {cell.label}
              </HeaderCell>
            ))}
            <HeaderCell>&nbsp;</HeaderCell>
          </TableHeaderRow>
        </thead>
        <tbody>
          {objects.map((enteredObject, index) => (
            <TableRow
              key={`${enteredObject.key}-${enteredObject.repeatIndex}`}
              className="attributeset-row"
            >
              {enteredObject.attributeCollection.all.map((cell) => (
                <Cell key={cell.name}>
                  <AttributeValueText attribute={cell} />
                </Cell>
              ))}
              <StyledDeleteCell>
                <Button
                  type="button"
                  name="delete"
                  dataId={`delete-${enteredObject.key}-${index}`}
                  icon="delete"
                  onClick={() => onRemove(enteredObject)}
                />
              </StyledDeleteCell>
            </TableRow>
          ))}
          <tr />
        </tbody>
      </Table>
    </TableWrapper>
  );
};
EnteredObjectTable.displayName = "BI.EnteredObjectTable";

export default EnteredObjectTable;
