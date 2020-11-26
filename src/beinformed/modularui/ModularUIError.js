// @flow
class ModularUIError extends Error {
  response: Object;
  resource: string;

  constructor(message: string, response: Object, resource: string) {
    super(message);

    this.response = response;
    this.resource = resource;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ModularUIError);
    }
  }
}

export default ModularUIError;
