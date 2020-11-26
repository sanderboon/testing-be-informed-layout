// @flow
class NotAllowedUriException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotAllowedUriException";
  }
}

export default NotAllowedUriException;
