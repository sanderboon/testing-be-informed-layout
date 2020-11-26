// @flow
import { useEffect } from "react";
import { Redirect } from "react-router-dom";

export type Props = {
  +isAuthenticated: boolean,
  +doLogout: () => void,
};

const SignOut = ({ isAuthenticated, doLogout }: Props) => {
  const rootLocation = {
    pathname: "/",
    state: {
      reload: Date.now(),
    },
  };

  useEffect(() => {
    doLogout();
  }, [doLogout]);

  if (!isAuthenticated) {
    return <Redirect to={rootLocation} />;
  }

  return null;
};

SignOut.displayName = "BI.SignOut";

export default SignOut;
