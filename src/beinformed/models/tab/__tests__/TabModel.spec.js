import TabModel from "beinformed/models/tab/TabModel";

import mockTab from "./tab.json";
import mockTabContributions from "./tabContributions.json";

describe("TabModel spec", () => {
  it("should be able to create an empty Tab object", () => {
    const tab = new TabModel({});

    expect(tab.label).toBe("");
    expect(tab.components.size).toBe(0);
    expect(tab.hasComponents()).toBeFalsy();
    expect(tab.taskGroupCollection.hasItems).toBeFalsy();
    expect(tab.search).toBeUndefined();
  });

  it("should create a Tab object with links an a label on a typical modular ui response", () => {
    const tab = new TabModel({
      data: mockTab.tab,
      contributions: mockTabContributions.tab,
    });

    expect(tab).toBeInstanceOf(TabModel);

    expect(tab.label).toBe("Books");

    expect(tab.components.size).toBe(4);
    expect(tab.hasComponents()).toBeTruthy();
  });
});
