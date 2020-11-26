// @flow

import classNames from "classnames";
import { Message } from "beinformed/i18n";
import styled from "styled-components";
import { spacer } from "beinformed/theme/utils/spacers";

export type Props = {
  +className?: string,
  +anchor: string,
  +label: string,
  +error: Object,
  +onClick: Function,
};

const StyledAttributeLink = styled.a`
  margin-right: ${spacer(0.5)};
`;

const FormErrorsAttribute = ({
  className,
  anchor,
  label,
  error,
  onClick,
}: Props) => {
  return (
    <li
      className={classNames("form-errors-item", className)}
      data-type={error.id}
    >
      <StyledAttributeLink
        href={`#${anchor}`}
        onClick={onClick}
        className="form-errors-attribute-label no-initial-focus"
      >
        <span>{`${label}: `}</span>
        <Message
          id={error.id}
          defaultMessage={error.defaultMessage}
          data={error.parameters}
        />
      </StyledAttributeLink>
    </li>
  );
};

FormErrorsAttribute.displayName = "BI.FormErrorAttribute";

export default FormErrorsAttribute;
