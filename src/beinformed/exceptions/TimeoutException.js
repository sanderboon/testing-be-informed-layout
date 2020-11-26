// @flow
class TimeoutException extends Error {
  constructor(url: string, method: string) {
    super(`Timeout occurred in connection to ${url} with method ${method}.`);

    this.name = "TimeoutException";
  }
}

export default TimeoutException;
