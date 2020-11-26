// @flow
import styled from "styled-components";
import {
  roundedCorners,
  spacer,
  spacers,
  themeProp,
} from "beinformed/theme/utils";

import { Message } from "beinformed/i18n";

const Alert = styled.div`
  position: relative;
  padding: ${spacers(0.75, 1.25)};
  margin-bottom: ${spacer()};
  border: 1px solid transparent;
  ${roundedCorners()};
  color: ${themeProp("ALERT_COLOR", "#721c24")};
  background-color: ${themeProp("ALERT_BG", "#f8d7da")};
  border-color: ${themeProp("ALERT_BORDER_COLOR", "#f5c6cb")};
`;

export type Props = {
  +className?: string,
  +errorMessage: string,
};

const SignInAlert = ({ className, errorMessage }: Props) => (
  <Alert className={className} role="alert">
    <Message id={errorMessage} />
  </Alert>
);

SignInAlert.displayName = "BI.SignInAlert";

export default SignInAlert;
