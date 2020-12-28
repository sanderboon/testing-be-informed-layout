// @flow
import classNames from "classnames";
import { Helmet } from "react-helmet-async";

import styled from "styled-components";

import { Message, useMessage } from "beinformed/i18n";

import { Container, Row, Column } from "_component-registry/grid";
import { Heading } from "_component-registry/elements";
import { HTMLForm } from "_component-registry/form";
import { Button } from "_component-registry/buttons";
import { SignInAlert } from "_component-registry/authentication";
import {
  PasswordAttribute,
  StringAttribute,
} from "_component-registry/attributes";

import DemoImage2 from "./Research-Grant-Cartoon2.png";

import type {
  StringAttributeModel,
  PasswordAttributeModel,
} from "beinformed/models";
export type Props = {
  +className?: string,
  +username: StringAttributeModel,
  +password: PasswordAttributeModel,
  +errorMessage?: string | null,
  +onInputChange: Function,
  +onSubmit: Function,
};

const StyledSignIn = styled.main`
  max-width: 800px;
  margin: 30px auto;
`;

const SignInPage = ({
  className,
  username,
  password,
  errorMessage,
  onInputChange,
  onSubmit,
}: Props) => (
  <StyledSignIn className={classNames("login-page", className)}>
    <Helmet>
      <title>{useMessage("Login.Header", "Login")}</title>
    </Helmet>
   
      <Heading as="h1">
        <Message id="Login.Header" defaultMessage="Login" />
      </Heading>
 <Row>
     <Column>
      <HTMLForm name="login" onSubmit={onSubmit}>
        {errorMessage && <SignInAlert errorMessage={errorMessage} />}
        <StringAttribute
          attribute={username}
          name={username.key}
          onChange={onInputChange}
          autoFocus
        />
        <PasswordAttribute
          attribute={password}
          name={password.key}
          enableSuggestions={false}
          onChange={onInputChange}
        />

        <Button type="submit" name="login" buttonStyle="PRIMARY" asBlock>
          <Message id="Login.Button.Login" defaultMessage="Login" />
        </Button>
      </HTMLForm></Column>
      <Column>
      <h1> TEST HELLO?!
          </h1>
          </Column>
          </Row>
          <Row>
              <Column>
              <h1>Some more text</h1></Column>
              <Column>
              <img src={DemoImage2} alt=""/>
              </Column>
            
          </Row>
    
  </StyledSignIn>
);

SignInPage.displayName = "BI.SignInPage";

export default SignInPage;
