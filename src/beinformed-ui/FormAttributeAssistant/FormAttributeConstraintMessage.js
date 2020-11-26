// @flow
import styled, { css } from "styled-components";
import { themeProp } from "beinformed/theme/utils";
import { Message } from "beinformed/i18n";
import classNames from "classnames";
import { Icon } from "_component-registry/icon";

const StyledMessage = styled.li`
  ${({ isError }) =>
    isError &&
    css`
      color: ${themeProp("DANGER_COLOR", "#dc3545")};
    `}
`;

export type Props = {
  +className?: string,
  +id?: string,
  +defaultMessage: string,
  +parameters?: Object,
  +isError?: boolean,
};

const FormAttributeConstraintMessage = ({
  className,
  id,
  defaultMessage,
  parameters,
  isError = false,
}: Props) => (
  <StyledMessage
    key={id}
    className={classNames(
      className,
      isError ? "constraint-message" : "assistant-message"
    )}
    isError={isError}
  >
    <Icon name={isError ? "alert-circle" : "information-outline"} textAfter />
    <Message id={id} defaultMessage={defaultMessage} data={parameters} />
  </StyledMessage>
);
FormAttributeConstraintMessage.displayName =
  "BI.FormAttributeConstraintMessage";

export default FormAttributeConstraintMessage;
