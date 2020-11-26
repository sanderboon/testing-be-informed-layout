// @flow
import { BASE, HTTP_METHODS } from "beinformed/constants/Constants";

import universalFetch from "beinformed/utils/fetch/universalFetch";
import Cache from "beinformed/utils/browser/Cache";

import { UnauthorizedException } from "beinformed/exceptions";

const LOGIN_PATH = `${BASE}/j_security_check`;
const LOGOUT_PATH = `${BASE}/Logoff`;

const usernameField = "j_username";
const passwordField = "j_password";

class Authenticate {
  _isBasic: boolean;

  constructor() {
    this._isBasic = false;
  }

  get isBasicAuthentication(): boolean {
    return this._isBasic;
  }

  set isBasicAuthentication(isBasicAuthentication: boolean) {
    this._isBasic = isBasicAuthentication;
  }

  initLogin(initLogin: boolean): Promise<any> {
    if (this.isBasicAuthentication || !initLogin) {
      return Promise.resolve(true);
    }

    return universalFetch({
      url: `${BASE}/login`,
      method: HTTP_METHODS.GET,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).catch((error) => {
      // when an unauthorizedexception is received on a request to the login service,
      // this indicates a basic authorization scenario
      // in case of form based authentication other exceptions are thrown
      if (error instanceof UnauthorizedException) {
        this.isBasicAuthentication = true;
      }

      return Promise.resolve();
    });
  }

  createLogin(username: string, password: string) {
    const encodedUsername = encodeURIComponent(username);
    const encodedPassword = encodeURIComponent(password);

    return {
      url: LOGIN_PATH,
      method: HTTP_METHODS.POST,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: `${usernameField}=${encodedUsername}&${passwordField}=${encodedPassword}`,
    };
  }

  login(username: string, password: string): Promise<any> {
    return this.initLogin(true).then(() => {
      if (this.isBasicAuthentication) {
        Cache.addItem("basic", btoa(`${username}:${password}`));

        return Promise.resolve();
      }

      return universalFetch(this.createLogin(username, password));
    });
  }

  logout() {
    return universalFetch({
      url: LOGOUT_PATH,
    }).then(() => {
      // clear cache because of cached contributions
      Cache.clear();
    });
  }
}

export default Authenticate;
