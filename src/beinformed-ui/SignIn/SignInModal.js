// @flow
import classNames from "classnames";
import { Helmet } from "react-helmet-async";

import { Message, useMessage } from "beinformed/i18n";

import { SignInAlert } from "_component-registry/authentication";
import {
  ConnectedModal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "_component-registry/modal";
import { HTMLForm } from "_component-registry/form";
import { Button } from "_component-registry/buttons";
import {
  PasswordAttribute,
  StringAttribute,
} from "_component-registry/attributes";

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
  +onClose: Function,
};

const SignInModal = ({
  className,
  username,
  password,
  errorMessage,
  onInputChange,
  onSubmit,
  onClose,
}: Props) => (
  <ConnectedModal className={classNames("login-modal", className)}>
    <Helmet>
      <title>{useMessage("Login.Header", "Login")}</title>
    </Helmet>
    <ModalHeader showClose onClose={onClose}>
      <ModalTitle>
        <Message id="Login.Header" defaultMessage="Login" />
      </ModalTitle>
    </ModalHeader>
    <HTMLForm name="login" onSubmit={onSubmit}>
      <ModalBody>
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
      </ModalBody>
      <ModalFooter>
        <Button type="button" name="close" onClick={onClose}>
          <Message id="Login.Button.Close" defaultMessage="Close" />
        </Button>
        <Button type="submit" name="login" buttonStyle="PRIMARY">
          <Message id="Login.Button.Login" defaultMessage="Login" />
        </Button>
      </ModalFooter>
    </HTMLForm>
  </ConnectedModal>
);

SignInModal.displayName = "BI.SignInModal";

export default SignInModal;
