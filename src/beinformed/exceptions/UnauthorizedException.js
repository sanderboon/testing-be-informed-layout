// @flow
class UnauthorizedException extends Error {
  status: number;
  id: string;
  response: ErrorResponseJSON | null;

  constructor(
    url: string,
    method: string,
    errorResponse: ErrorResponseJSON | null
  ) {
    super(`Cannot request resource ${url} with method ${method}`);

    this.name = "UnauthorizedException";
    this.id = "UnauthorizedException";
    this.status = 401;
    this.response = errorResponse;
  }
}

export default UnauthorizedException;
