// @flow
import { Redirect } from "react-router-dom";

import type { LocationShape } from "react-router";
export type Props = {
  +location: LocationShape,
};

const SignInAuthenticated = ({ location }: Props) => {
  const redirectTo =
    location.state && location.state.from
      ? location.state.from
      : { pathname: "/", state: {} };

  redirectTo.state = {
    ...redirectTo.state,
    reload: Date.now(),
  };

  return <Redirect to={redirectTo} />;
};

SignInAuthenticated.displayName = "BI.SignInAuthenticated";

export default SignInAuthenticated;
