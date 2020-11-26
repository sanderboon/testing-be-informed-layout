// @flow
import styled from "styled-components";

import { Message } from "beinformed/i18n";

import { CaptchaAnswered, TextInput } from "_component-registry/input";
import { Button } from "_component-registry/buttons";

export type Props = {
  +id?: string,
  +className?: string,
  +answer: string,
  +ariaLabel?: string,
  +ariaLabelledBy?: string,
  +placeholder?: string,
  +isValid: boolean,
  +isValidated: boolean,
  +name: string,
  +onChange: Function,
  +onBlur: Function,
  +onClick: Function,
};

const StyledButton = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

const CaptchaAnswer = ({
  id,
  className,
  answer,
  ariaLabel,
  ariaLabelledBy,
  placeholder,
  isValid,
  isValidated,
  name,
  onChange,
  onBlur,
  onClick,
}: Props) => {
  if (isValid) {
    return <CaptchaAnswered answer={answer} />;
  }

  return (
    <TextInput
      id={id}
      className={className}
      name={name}
      value={answer}
      ariaLabel={ariaLabel}
      ariaLabelledBy={ariaLabelledBy}
      placeholder={placeholder}
      inError={isValidated && !isValid}
      onChange={onChange}
      onBlur={onBlur}
      append={
        <StyledButton className="btn-captcha-verify" onClick={onClick}>
          <Message id="Captcha.VerifyButton" defaultMessage="Verify answer" />
        </StyledButton>
      }
    />
  );
};

CaptchaAnswer.displayName = "BI.CaptchaAnswer";

export default CaptchaAnswer;
