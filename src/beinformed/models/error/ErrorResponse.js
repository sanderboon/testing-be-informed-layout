// @flow
import { isObject } from "lodash";
import Href from "beinformed/models/href/Href";

import type { MessageParameters } from "beinformed/i18n";
/**
 * Error response model
 */
export default class ErrorResponse {
  _error: Object;
  _connectKey: string;

  /**
   * Construct ErrorResponse
   */
  constructor(data: Object) {
    this._error = data;
  }

  set connectKey(key: string) {
    this._connectKey = key;
  }

  get connectKey(): string {
    return this._connectKey;
  }

  /**
   * Return error information
   */
  get error(): Object {
    return this._error;
  }

  /**
   * Get request status code
   */
  get status(): number {
    const NO_RESPONSE_CODE = 0;
    const DECIMAL_RADIX = 10;
    return this.error.status
      ? parseInt(this.error.status, DECIMAL_RADIX)
      : NO_RESPONSE_CODE;
  }

  /**
   * Return error type information
   */
  get id(): string {
    if (this.isResourceNotFound && this.error.id !== "Error.NotAuthorized") {
      return "Error.ResourceNotFound";
    }

    return this.error.id || this.error.name || "Error.GeneralError";
  }

  get message(): string {
    return this.error.message || this.id;
  }

  get response(): Object {
    return this.error.response || {};
  }

  get properties(): Object {
    const { properties } = this.error;
    if (properties !== null && isObject(properties)) {
      return properties;
    }

    return {};
  }

  /**
   * Return error parameters
   */
  get parameters(): ?MessageParameters {
    return this.error.parameters || null;
  }

  get isResourceNotFound(): boolean {
    const RESOURCE_NOT_FOUND_RESPONSE_CODE = 404;

    return this.status === RESOURCE_NOT_FOUND_RESPONSE_CODE;
  }

  get isResourceNotFoundAfterReload(): boolean {
    return this.isResourceNotFound && this.error.isReload;
  }

  /**
   * Check if the error message is an authorization error
   */
  get isUnauthorized(): boolean {
    const UNAUTHORIZED_RESPONSE_CODE = 401;

    const hasUnauthorizedStatus = this.status === UNAUTHORIZED_RESPONSE_CODE;
    const hasUnauthorizedErrorId =
      this.id === "Error.NotAuthorized" ||
      this.id === "Error.Authentication.Required" ||
      this.id === "Error.Authentication.InvalidUsername" ||
      this.id === "Error.Authentication.InvalidCredentials";

    const hasLoginAction = this.error.action
      ? this.error.action.name === "login"
      : false;

    return hasUnauthorizedStatus || hasUnauthorizedErrorId || hasLoginAction;
  }

  get isChangePassword(): boolean {
    return this.id === "Error.ChangePasswordRequired";
  }

  get isConcurrentUser(): boolean {
    return this.id === "Error.Authentication.ConcurrentUser";
  }

  get isConcurrentError(): boolean {
    return (
      this.id === "Error.Case.ConcurrentModification" ||
      this.id === "Error.DataStore.ConcurrentModification" ||
      this.id === "Error.DataStore.RecordAlreadyExists" ||
      this.id === "Error.DataStore.RowCannotBeLocked"
    );
  }

  get isBlocked(): boolean {
    return this.id === "Error.Authentication.BlockedUser";
  }

  get isInvalidUsername(): boolean {
    return this.id === "Error.Authentication.InvalidUsername";
  }

  get isTimeoutError(): boolean {
    return this.id === "Error.CodemapLookup.InvalidToken";
  }

  get isRemoteServiceException(): boolean {
    return this.id === "Error.RemoteServiceException";
  }

  /**
   * Get response url
   */
  get changePasswordHref(): ?Href {
    return this.properties.redirect ? new Href(this.properties.redirect) : null;
  }

  /**
   * When no action information is present in the unauthorized response, for now we assume it is Basic Authentication
   */
  get isBasicAuthentication(): boolean {
    const UNAUTHORIZED_RESPONSE_CODE = 401;
    return (
      this.isUnauthorized &&
      this.status === UNAUTHORIZED_RESPONSE_CODE &&
      this.response.error === "No responseText"
    );
  }

  /**
   * Retrieve a failed login attempt
   */
  get loginFailed(): boolean {
    return (
      this.id === "Error.Authentication.Required" ||
      this.id === "Error.Authentication.InvalidCredentials"
    );
  }

  get shouldThrowOnServer(): boolean {
    return !this.isChangePassword && !this.isBlocked && !this.isConcurrentUser;
  }
}
