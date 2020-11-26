import BusinessScenarioModel from "beinformed/models/concepts/BusinessScenarioModel";

describe("BusinessScenarioModel", () => {
  it("should be able to create an empty BusinessScenarioModel object", () => {
    const businessScenario = new BusinessScenarioModel();

    expect(businessScenario).toBeInstanceOf(BusinessScenarioModel);
    expect(businessScenario.type).toBe("BusinessScenario");
  });
});
