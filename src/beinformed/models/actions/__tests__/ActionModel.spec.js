import ActionModel from "beinformed/models/actions/ActionModel";

import {
  AttributeCollection,
  ProcessStatusSettingsModel,
} from "beinformed/models";

describe("ActionModel", () => {
  it("should be able to create an empty ActionModel object", () => {
    const action = new ActionModel();

    expect(action).toBeInstanceOf(ActionModel);
    expect(action.isDisabled).toBeTruthy();
    expect(action.method).toBe("POST");
    expect(action.type).toBe("general");
    expect(action.name).toBe("unknown");
    expect(action.key).toBeUndefined();
    expect(action.label).toBeUndefined();
  });

  it("can create empty action using createFromHref method", () => {
    const action = ActionModel.createFromHref();

    expect(action).toBeInstanceOf(ActionModel);
    expect(action.isDisabled).toBeTruthy();
    expect(action.method).toBe("POST");
    expect(action.type).toBe("form");
    expect(action.name).toBe("unknown");
    expect(action.key).toBeUndefined();
    expect(action.label).toBeUndefined();
  });

  it("can create an action", () => {
    const data = {
      name: "decide-eligible-for-research-grant",
      method: "POST",
      href:
        "/research-grant-applications/research-grant-application/26/evaluate/tasks/decide-eligible-for-research-grant",
      processStatus: {
        applicable: true,
        needed: "true",
        completed: false,
      },
    };
    const contributions = {
      name: "decide-eligible-for-research-grant",
      label: "Decide eligible for research grant",
      type: "form",
      processTask: {
        _links: {
          concept: {
            href:
              "/concepts/Research grant/Business design/Constraints/Eligible for research grant.bixml/EligibleResearchGrant",
          },
        },
        consequenceType: "Decision",
        transition: "decides",
      },
    };

    const action = new ActionModel(data, contributions);

    expect(action.isDisabled).toBeFalsy();
    expect(action.selfhref.toString()).toBe(
      "/research-grant-applications/research-grant-application/26/evaluate/tasks/decide-eligible-for-research-grant"
    );
    expect(action.fields).toEqual([]);
    expect(action.fieldCollection).toBeInstanceOf(AttributeCollection);
    expect(action.querystring).toBe("");
    expect(action.hasFieldByKey("")).toBeFalsy();
    expect(action.key).toBe("decide-eligible-for-research-grant");
    expect(action.label).toBe("Decide eligible for research grant");
    expect(action.isProcessTask).toBeTruthy();
    expect(action.processStatus).toBeInstanceOf(ProcessStatusSettingsModel);
    expect(action.icon).toBeUndefined();

    action.icon = "new-icon";
    expect(action.icon).toBe("new-icon");
  });
});
