import ModularUIRequest from "../ModularUIRequest";
import ModularUIResponse from "../ModularUIResponse";
import { ApplicationModel, FormModel } from "beinformed/models";

jest.mock("beinformed/utils/fetch/universalFetch");

describe("ModularUIRequest", () => {
  it("can create an empty request", () => {
    const emptyRequest = new ModularUIRequest();
    expect(emptyRequest).toBeInstanceOf(ModularUIRequest);
    expect(emptyRequest.locale).toBeUndefined();
    expect(emptyRequest.response).toBeInstanceOf(ModularUIResponse);
    expect(emptyRequest.href).toBeUndefined();
    expect(emptyRequest.options).toEqual({
      locale: undefined,
    });
    expect(emptyRequest.withChildModels).toBeTruthy();
    expect(emptyRequest.targetModel).toBeUndefined();

    expect(() => {
      emptyRequest.createModel();
    }).toThrow();
  });

  it("can return a model from a request", () => {
    expect.assertions(1);

    const request = new ModularUIRequest("/");
    return request
      .fetch()
      .then((model) => expect(model instanceof ApplicationModel).toBeTruthy())
      .catch((error) => {
        console.error(error);
      });
  });

  it("can return a model from a cached request", () => {
    expect.assertions(1);

    const request = new ModularUIRequest("/");
    return request
      .fetchFromCache()
      .then((model) => expect(model instanceof ApplicationModel).toBeTruthy())
      .catch((error) => {
        console.error(error);
      });
  });

  it("can return a form model", () => {
    expect.assertions(1);

    const request = new ModularUIRequest(
      "/persons/persons/createperson?commit=false",
      {
        method: "POST",
      }
    );

    return request
      .fetchFromCache()
      .then((model) => expect(model instanceof FormModel).toBeTruthy())
      .catch((error) => {
        console.error(error);
      });
  });
});
