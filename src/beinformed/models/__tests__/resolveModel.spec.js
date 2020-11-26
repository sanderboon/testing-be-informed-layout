import resolveModel from "beinformed/models/resolveModel";
import ModularUIResponse from "beinformed/modularui/ModularUIResponse";
import { ApplicationModel } from "beinformed/models";

describe("resolveModel", () => {
  it("should be able to resolve a model based on modular ui contributions", () => {
    expect(() => {
      resolveModel();
    }).toThrow();

    expect(() => {
      resolveModel({});
    }).toThrow();

    const NonExistingModularUIResponse = ModularUIResponse.create({
      key: "non",
      data: { non: {} },
      contributions: { non: { resourcetype: "nonexisting" } },
    });

    const NonExisting = resolveModel(NonExistingModularUIResponse);
    expect(NonExisting).toBeNull();

    const ApplicationModularUIResponse = ModularUIResponse.create({
      key: "app",
      data: { app: {} },
      contributions: { app: { resourcetype: "Application" } },
    });

    const App = resolveModel(ApplicationModularUIResponse);
    expect(App === ApplicationModel).toBeTruthy();
  });
});
