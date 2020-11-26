import ModularUIResponse from "beinformed/modularui/ModularUIResponse";

import ApplicationModel from "beinformed/models/application/ApplicationModel";
import UserServicesModel from "beinformed/models/user/UserServicesModel";

import mockWebapp from "./webapp.json";
import mockWebappContributions from "./webappContributions.json";

describe("Application", () => {
  it("should be able to create an empty Application object", () => {
    const application = new ApplicationModel({});

    expect(application.type).toBe("Application");
    expect(application.label).toBe("");
    expect(application.tabs.size).toBe(0);
  });

  it("Application model is applicable for contributions with resourcetype Application", () => {
    const data = ModularUIResponse.create({
      key: "Webapp",
      data: mockWebapp,
      contributions: mockWebappContributions,
    });
    expect(ApplicationModel.isApplicableModel(data)).toBeTruthy();
  });

  it("should create an application object with links an a label on a typical modular ui response", () => {
    const data = ModularUIResponse.create({
      key: "Webapp",
      data: mockWebapp,
      contributions: mockWebappContributions,
    });

    const application = new ApplicationModel(data);

    expect(application).toBeInstanceOf(ApplicationModel);
    expect(application.label).toBe("Webapp");
    expect(application.tabs.size).toBe(4);
    expect(application.getInitialChildModelLinks()).toHaveLength(1);
    expect(application.modelcatalog.label).toBe("Model catalog");

    application.userServices = null;
    expect(application.userServices).toBeNull();

    const userServicesModel = new UserServicesModel({});
    application.userServices = userServicesModel;
    expect(application.userServices).toEqual(userServicesModel);
  });

  it("Sets user service models as child models", () => {
    const application = new ApplicationModel({});

    application.addChildModels([]);
    expect(application.userServices).toBeNull();

    const userServicesModel = new UserServicesModel({});
    application.addChildModels([userServicesModel]);
    expect(application.userServices).toEqual(userServicesModel);
  });
});
