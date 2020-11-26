// @flow
class IllegalArgumentException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "IllegalArgumentException";
  }
}

export default IllegalArgumentException;
