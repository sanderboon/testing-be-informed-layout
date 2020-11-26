// @flow
import classNames from "classnames";
import styled from "styled-components";

import { Message } from "beinformed/i18n";

import type { ErrorCollection } from "beinformed/models";
export type Props = {
  +className?: string,
  +errorCollection: ErrorCollection,
  +onlyServerErrors?: boolean,
};

const StyledList = styled.ul`
  padding-left: 0;
  list-style: none;
`;

/**
 * Render a list of (error) messages
 */
const FormErrorList = ({
  className,
  errorCollection,
  onlyServerErrors = false,
}: Props) => (
  <StyledList className={classNames("form-errorlist", className)}>
    {errorCollection
      .filter(
        (error) =>
          (error.id === "Constraint.Mandatory" ||
            !errorCollection.hasMandatoryError()) &&
          (!onlyServerErrors || !error.isClientConstraint)
      )
      .map((error) => (
        <li key={error.id} data-type={error.id}>
          <Message
            id={error.id}
            defaultMessage={error.defaultMessage}
            data={error.parameters}
          />
        </li>
      ))}
  </StyledList>
);

FormErrorList.displayName = "BI.FormErrorList";

export default FormErrorList;
