// @flow
import classNames from "classnames";
import styled from "styled-components";
import { themeProp, spacer } from "beinformed/theme/utils";

import { ErrorCollection } from "beinformed/models";

import { FormErrorList } from "_component-registry/form";

export type Props = {
  className?: string,
  id: string,
  errors: ErrorCollection,
};

const StyledErrorRow = styled.div`
  display: table;
  padding: ${spacer()};
  color: ${themeProp("DANGER_COLOR")};
`;

const EditTableErrorRow = ({ className, id, errors }: Props) => (
  <StyledErrorRow data-id={id} className={classNames("table-row", className)}>
    <FormErrorList errorCollection={errors} />
  </StyledErrorRow>
);

EditTableErrorRow.displayName = "BI.EditTableErrorRow";

export default EditTableErrorRow;
