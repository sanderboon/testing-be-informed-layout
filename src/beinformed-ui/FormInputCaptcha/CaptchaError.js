// @flow
import classNames from "classnames";
import styled from "styled-components";
import { themeProp } from "beinformed/theme/utils";

import { Message } from "beinformed/i18n";

import { Icon } from "_component-registry/icon";

export type Props = {
  +className?: string,
  +inError: boolean,
};

const StyledList = styled.ul`
  color: ${themeProp("GREY_600", "#6c757d")};
  margin-bottom: 0;
  padding-left: 0;
  list-style: none;
  font-size: ${themeProp("FONT_SIZE_SMALL", "0.875rem")};
`;

const StyledError = styled.li`
  color: ${themeProp("INPUT_ERROR_COLOR", "#dc3545")};
`;

const CaptchaError = ({ className, inError }: Props) => {
  if (inError) {
    return (
      <StyledList className={classNames("input-assistant", className)}>
        <StyledError className="constraint-message">
          <Icon name="alert-circle" textAfter />
          <Message
            id="Constraint.Captcha.InvalidToken"
            defaultMessage="The given answer does not match the expected answer, please try again"
          />
        </StyledError>
      </StyledList>
    );
  }

  return null;
};

CaptchaError.displayName = "BI.CaptchaError";

export default CaptchaError;
