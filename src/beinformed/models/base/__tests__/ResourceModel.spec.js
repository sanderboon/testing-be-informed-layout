import ModularUIResponse from "beinformed/modularui/ModularUIResponse";

import ResourceModel from "beinformed/models/base/ResourceModel";
import LinkCollection from "beinformed/models/links/LinkCollection";

import mockWebapp from "./webapp.json";

describe("ResourceModel", () => {
  let modUIResponse;
  beforeEach(() => {
    modUIResponse = new ModularUIResponse();
  });

  it("should be able to create an empty ResourceModel object", () => {
    expect(() => {
      ResourceModel.isApplicableModel();
    }).toThrow();

    const model = new ResourceModel();

    expect(model.data).toEqual({});
    expect(model.contributions).toEqual({});

    expect(model.key).toBe("unknown");

    expect(model.links).toBeInstanceOf(LinkCollection);
    expect(model.links.isEmpty).toBeTruthy();

    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const { selflink } = model;
    }).toThrow();
    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const { selfhref } = model;
    }).toThrow();
    expect(() => {
      model.type;
    }).toThrow();

    expect(Array.isArray(model.getInitialChildModelLinks())).toBeTruthy();
    expect(model.childModels).toHaveLength(0);
    expect(model.locale).toBe("en");
  });

  it("should handle data without contributions", () => {
    modUIResponse.data = mockWebapp.webapplication;

    const model = new ResourceModel(modUIResponse);

    expect(model).toBeInstanceOf(ResourceModel);
    expect(model.contributions).toEqual({});
    expect(model.selflink.href.path).toBe("/");
  });

  it("should handle data with contributions", () => {
    const goodContributionResult = {
      resourcetype: "Application",
    };
    modUIResponse.data = mockWebapp.webapplication;
    modUIResponse.contributions = goodContributionResult;

    const model = new ResourceModel(modUIResponse);

    expect(model).toBeInstanceOf(ResourceModel);
    expect(model.resourcetype).toBe("Application");
  });

  it("should handle data with wrong contributions", () => {
    const wrongContributionResult = {
      bla: {},
    };
    modUIResponse.data = mockWebapp.webapplication;
    modUIResponse.contributions = wrongContributionResult;

    const model = new ResourceModel(modUIResponse);

    expect(model).toBeInstanceOf(ResourceModel);
  });

  it("can handle request information", () => {
    const modelWithoutLocale = new ResourceModel(modUIResponse);
    expect(modelWithoutLocale.locale).toBe("en");

    modUIResponse.locale = "nl";
    const modelWithLocale = new ResourceModel(modUIResponse);

    expect(modelWithLocale.locale).toBe("nl");
  });

  it("Childmodels should return same model", () => {
    const model = new ResourceModel();
    expect(model.addChildModels([])).toBe(model);
  });
});
