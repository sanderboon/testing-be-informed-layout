// @flow
import classNames from "classnames";

export type Props = {
  +className?: string,
  +assistantMessage: string,
};

const FormAttributeAssistantMessage = ({
  className,
  assistantMessage,
}: Props) => (
  <li className={classNames("assistant-message", className)}>
    {assistantMessage}
  </li>
);
FormAttributeAssistantMessage.displayName = "BI.FormAttributeAssistantMessage";

export default FormAttributeAssistantMessage;
