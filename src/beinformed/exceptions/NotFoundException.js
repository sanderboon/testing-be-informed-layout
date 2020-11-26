// @flow
class NotFoundException extends Error {
  status: number;
  id: string;
  isReload: boolean;

  constructor(url: string, method: string, isReload: boolean = false) {
    super(`Resource ${url} with method ${method} not found`);

    this.name = "NotFoundException";
    this.id = "NotFoundException";
    this.status = 404;
    this.isReload = isReload;
  }
}

export default NotFoundException;
