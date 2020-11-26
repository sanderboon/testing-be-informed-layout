// @flow
class JsonParseException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "JsonParseException";
  }
}

export default JsonParseException;
