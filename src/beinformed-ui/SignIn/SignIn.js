// @flow
import { useState } from "react";
import { get } from "lodash";

import {
  StringAttributeModel,
  PasswordAttributeModel,
} from "beinformed/models";

import { useMessage } from "beinformed/i18n";
import { withNavigation } from "beinformed/connectors/Router";

import {
  SignInView,
  SignInAuthenticated,
} from "_component-registry/authentication";

import type { LocationShape } from "react-router";
export type Props = {
  +className?: string,
  +isAuthenticated: boolean,
  +errorMessage: string | null,
  +location: LocationShape,
  +goBack: () => void,
  +onSubmit: (username: string, password: string) => void,
};

const createUsernameAttribute = (label, placeholder) =>
  new StringAttributeModel(
    {
      key: "username",
      value: "",
    },
    {
      type: "string",
      label,
      placeholder,
      mandatory: true,
    }
  );

const createPasswordAttribute = (label, placeholder) =>
  new PasswordAttributeModel(
    {
      key: "password",
      value: "",
    },
    {
      type: "string",
      label,
      placeholder,
      mandatory: true,
    }
  );

const SignIn = ({
  className,
  isAuthenticated,
  errorMessage,
  location,
  goBack,
  onSubmit,
}: Props) => {
  const userNameLabel = useMessage("Login.Username", "Username");
  const userNamePlaceholder = useMessage(
    "Login.Username.Placeholder",
    "Enter username"
  );
  const passwordLabel = useMessage("Login.Password", "Password");
  const passwordPlaceholder = useMessage(
    "Login.Password.Placeholder",
    "Enter password"
  );

  const [username, setUsername] = useState(
    createUsernameAttribute(userNameLabel, userNamePlaceholder)
  );

  const [password, setPassword] = useState(
    createPasswordAttribute(passwordLabel, passwordPlaceholder)
  );

  const handleInputChange = (attribute, value) => {
    const newAttribute = attribute.clone();
    newAttribute.update(value);

    if (newAttribute.type === "password") {
      setPassword(newAttribute);
    } else {
      setUsername(newAttribute);
    }
  };

  const handleSubmit = () => onSubmit(username.inputvalue, password.inputvalue);

  if (isAuthenticated) {
    return <SignInAuthenticated location={location} />;
  }

  username.label = userNameLabel;
  username.placeholder = userNamePlaceholder;
  password.label = passwordLabel;
  password.placeholder = passwordPlaceholder;

  return (
    <SignInView
      className={className}
      isModal={get(location.state, "modal", false)}
      username={username}
      password={password}
      errorMessage={errorMessage}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
      onClose={goBack}
    />
  );
};

SignIn.displayName = "BI.SignIn";

export default withNavigation(SignIn);
