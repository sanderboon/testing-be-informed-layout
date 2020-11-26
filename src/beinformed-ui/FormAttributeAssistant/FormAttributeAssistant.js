// @flow
import classNames from "classnames";
import styled from "styled-components";
import { themeProp, spacer } from "beinformed/theme/utils";

import { getSetting } from "beinformed/constants/Settings";

import {
  FormAttributeAssistantMessage,
  FormAttributeConstraintMessage,
} from "_component-registry/attributes-assistant";

import type { AttributeType } from "beinformed/models";
export type Props = {
  +className?: string,
  +attribute: AttributeType,
  +showErrors?: boolean,
};

const StyledAssistant = styled.ul`
  color: ${themeProp("INPUT_ASSISTANT_COLOR", "#6c757d")};
  margin-top: ${spacer(0.3)};
  margin-bottom: 0;
  padding-left: 0;
  list-style: none;
  font-size: ${themeProp("FONT_SIZE_SMALL", "0.875rem")};
`;

/**
 * constraints without validations (informative)
 */
const getInformativeConstraints = (attribute) =>
  attribute.constraintCollection.filter(
    (constraint) =>
      !constraint.hasValidation() && constraint.id !== "Constraint.Mandatory"
  );

/**
 * constraints in error, checked in the browser
 */
const getClientsideErrors = (attribute) => {
  if (attribute.isOptionalAndEmpty(attribute.inputvalue)) {
    return [];
  }

  // render client validations when client side validation is enabled and the value of the attribute has changed
  if (getSetting("USE_CLIENTSIDE_VALIDATION") && attribute.isChangedSince(0)) {
    const clientMandatoryConstraintInError = attribute.constraintCollection.find(
      (constraint) =>
        constraint.isMandatoryConstraint &&
        !constraint.validate(attribute.inputvalue)
    );

    if (clientMandatoryConstraintInError) {
      return [clientMandatoryConstraintInError];
    }

    return attribute.constraintCollection.filter(
      (constraint) =>
        constraint.hasValidation() && !constraint.validate(attribute.inputvalue)
    );
  }

  return [];
};

/**
 * constraints in error, checked on the server
 */
const getServersideErrors = (attribute, clientErrors) => {
  if (
    getSetting("USE_INSTANT_SERVER_VALIDATION") &&
    !attribute.isChangedSince(0)
  ) {
    return [];
  }

  const clientErrorIds = clientErrors.map((clientError) => clientError.id);
  const uniqueServerErrors = attribute.errorCollection.filter(
    (error) => !error.isClientConstraint && !clientErrorIds.includes(error.id)
  );

  const serverMandatoryConstraintInError = uniqueServerErrors.find(
    (error) => !error.isClientConstraint && error.isMandatoryConstraint
  );

  if (serverMandatoryConstraintInError) {
    return [serverMandatoryConstraintInError];
  }

  return uniqueServerErrors;
};

const FormAttributeAssistant = ({
  className,
  attribute,
  showErrors = true,
}: Props) => {
  const informativeMessages = getInformativeConstraints(attribute);

  const errorMessages = [];
  if (showErrors) {
    errorMessages.push(...getClientsideErrors(attribute));
    errorMessages.push(...getServersideErrors(attribute, errorMessages));
  }

  if (
    attribute.assistantMessage ||
    informativeMessages.length > 0 ||
    errorMessages.length > 0
  ) {
    return (
      <StyledAssistant className={classNames("input-assistant", className)}>
        {attribute.assistantMessage && (
          <FormAttributeAssistantMessage
            assistantMessage={attribute.assistantMessage}
          />
        )}
        {informativeMessages.map((message) => (
          <FormAttributeConstraintMessage
            key={message.id}
            id={message.id}
            defaultMessage={message.defaultMessage}
            parameters={message.parameters}
          />
        ))}
        {errorMessages.map((message) => (
          <FormAttributeConstraintMessage
            key={message.id}
            id={message.id}
            defaultMessage={message.defaultMessage}
            parameters={message.parameters}
            isError
          />
        ))}
      </StyledAssistant>
    );
  }

  return null;
};

FormAttributeAssistant.displayName = "BI.FormAttributeAssistant";

export default FormAttributeAssistant;
