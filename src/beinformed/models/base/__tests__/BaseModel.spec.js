import BaseModel from "beinformed/models/base/BaseModel";
import mockWebapp from "./webapp.json";

import LayoutHintCollection from "beinformed/models/layouthint/LayoutHintCollection";

describe("BaseModel", () => {
  it("should be able to create an empty BaseModel object", () => {
    const model = new BaseModel();

    expect(model.data).toEqual({});
    expect(model.contributions).toEqual({});
    expect(model.hasData).toBeFalsy();

    expect(model.clone()).toEqual(model);
  });

  it("should handle data without contributions", () => {
    const model = new BaseModel(mockWebapp.Webapp);

    expect(model).toBeInstanceOf(BaseModel);
    expect(model.contributions).toEqual({});
    expect(model.clone()).toEqual(model);
  });

  it("should handle data with wrong contributions", () => {
    const wrongContributionResult = {
      data: {},
    };

    const model = new BaseModel(mockWebapp.Webapp, wrongContributionResult);

    expect(model).toBeInstanceOf(BaseModel);
  });

  it("should be able to get and set layouthints", () => {
    const model = new BaseModel();

    expect(model.layouthint).toBeInstanceOf(LayoutHintCollection);
    expect(model.layouthint.all).toEqual([]);

    model.layouthint = ["test-hint"];
    expect(model.layouthint.first).toBe("test-hint");
  });

  it("can handle connectKeys", () => {
    const model = new BaseModel();

    model.connectKey = "ConnectKey";
    expect(model.connectKey).toBe("ConnectKey");
  });

  it("can dehydrate and rehydrate", () => {
    const model = new BaseModel({ name: "value" }, { name: "value" });
    model.connectKey = "ConnectKey";

    const dehydrateData = model.dehydrate();
    expect(dehydrateData).toEqual({
      data: { name: "value" },
      contributions: { name: "value" },
      connectKey: "ConnectKey",
    });

    const newModel = new BaseModel();
    newModel.rehydrate(dehydrateData);
    expect(newModel.connectKey).toBe("ConnectKey");
  });

  it("can clone deep", () => {
    const model = new BaseModel({
      prop: {
        child: "value",
      },
    });

    const shallowClone = model.clone();
    expect(model.data.prop === shallowClone.data.prop).toBeTruthy();

    const deepClone = model.clone(true);
    expect(model.data.prop === deepClone.data.prop).toBeFalsy();
  });
});
