// @flow
class NetworkException extends Error {
  status: number;
  id: string;

  constructor(url: string, method: string) {
    super(
      `An unexpected network error occurred, cannot request resource ${url} with method ${method}`
    );

    this.name = "NetworkException";
    this.id = "NetworkException";
    this.status = 0;
  }
}

export default NetworkException;
