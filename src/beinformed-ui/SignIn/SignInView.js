// @flow
import { SignInModal, SignInPage } from "_component-registry/authentication";

import type {
  StringAttributeModel,
  PasswordAttributeModel,
} from "beinformed/models";
export type Props = {
  +isModal: boolean,
  +className?: string,
  +username: StringAttributeModel,
  +password: PasswordAttributeModel,
  +errorMessage?: string | null,
  +onInputChange: Function,
  +onSubmit: Function,
  +onClose: Function,
};

const SignInView = ({
  className,
  isModal,
  username,
  password,
  errorMessage,
  onInputChange,
  onSubmit,
  onClose,
}: Props) => {
  if (isModal) {
    return (
      <SignInModal
        className={className}
        username={username}
        password={password}
        errorMessage={errorMessage}
        onInputChange={onInputChange}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    );
  }

  return (
    <SignInPage
      className={className}
      username={username}
      password={password}
      errorMessage={errorMessage}
      onInputChange={onInputChange}
      onSubmit={onSubmit}
    />
  );
};

SignInView.displayName = "BI.SignInView";

export default SignInView;
