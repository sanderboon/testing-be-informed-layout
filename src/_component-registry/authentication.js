// @flow
export { default as SignInView } from "beinformed-ui/SignIn/SignInView";
export { default as SignInModal } from "beinformed-ui/SignIn/SignInModal";
export { default as SignInPage } from "beinformed-ui/SignIn/SignInPage";

export { default as SignInAlert } from "beinformed-ui/SignIn/SignInAlert";
export { default as SignInAuthenticated } from "beinformed-ui/SignIn/SignInAuthenticated";

import { default as _SignIn } from "beinformed-ui/SignIn/SignIn";

import { connector as connectSignIn } from "beinformed/connectors/SignIn";
export const ConnectedSignIn = connectSignIn(_SignIn);

import { connector as connectSignOut } from "beinformed/connectors/SignOut";
import { default as _SignOut } from "beinformed-ui/SignOut/SignOut";
export const ConnectedSignOut = connectSignOut(_SignOut);
