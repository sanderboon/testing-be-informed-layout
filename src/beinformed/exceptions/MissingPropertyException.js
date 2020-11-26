// @flow
class MissingPropertyException extends Error {
  constructor(message: string) {
    super(message);

    this.name = "MissingPropertyException";
  }
}

export default MissingPropertyException;
