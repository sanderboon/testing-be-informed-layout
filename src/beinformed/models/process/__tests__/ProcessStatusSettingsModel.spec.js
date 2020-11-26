import ProcessStatusSettingsModel from "beinformed/models/process/ProcessStatusSettingsModel";

describe("ProcessStatusSettingsModel", () => {
  it("should be able to create an empty ProcessStatusSettingsModel object", () => {
    const processStatus = new ProcessStatusSettingsModel();

    expect(processStatus).toBeInstanceOf(ProcessStatusSettingsModel);
    expect(processStatus.concequenceType).toBe("");
    expect(processStatus.transition).toBe("");
    expect(processStatus.isApplicable).toBeFalsy();
    expect(processStatus.isCompleted).toBeFalsy();
    expect(processStatus.isNeeded).toBeNull();
  });

  it("creates a process status settings model", () => {
    const data = {
      applicable: true,
      needed: "true",
      completed: false,
    };

    const contributions = {
      _links: {
        concept: {
          href:
            "/concepts/Research grant/Business design/Constraints/Eligible for research grant.bixml/EligibleResearchGrant",
        },
      },
      consequenceType: "Decision",
      transition: "decides",
    };

    const processStatus = new ProcessStatusSettingsModel(data, contributions);

    expect(processStatus).toBeInstanceOf(ProcessStatusSettingsModel);
    expect(processStatus.concequenceType).toBe("decision");
    expect(processStatus.transition).toBe("decides");
    expect(processStatus.isApplicable).toBeTruthy();
    expect(processStatus.isCompleted).toBeFalsy();
    expect(processStatus.isNeeded).toBeTruthy();
  });
});
