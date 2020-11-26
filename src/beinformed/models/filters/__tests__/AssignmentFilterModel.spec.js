import AssignmentFilterModel from "beinformed/models/filters/AssignmentFilterModel";

// import LookupAttributeModel from "beinformed/models/attributes/LookupAttributeModel";
import ChoiceAttributeModel from "beinformed/models/attributes/ChoiceAttributeModel";

describe("AssignmentFilterModel", () => {
  let filterData;
  let filterContributions;

  beforeEach(() => {
    filterData = {
      name: "Assignments",
      USERKEY: {
        param: "USERKEY",
        name: "USERKEY",
        _links: {
          lookupOptions: {
            href:
              "/lookupOptions?lookupToken=bd3a293d-ec55-4644-b5cd-7182a105bd94",
          },
        },
      },
      ASSIGNMENTTYPE: {
        param: "ASSIGNMENTTYPE",
        name: "ASSIGNMENTTYPE",
        options: [
          {
            key: "Practitioner",
          },
        ],
      },
    };
    filterContributions = {
      type: "assignmentfilter",
      label: "Assignments",
      layouthint: [],
      USERKEY: {
        type: "choicefilter",
        label: "User id",
        layouthint: ["checkbox"],
        multiplechoice: true,
        enumerated: true,
        options: [],
      },
      ASSIGNMENTTYPE: {
        type: "choicefilter",
        label: "Type",
        layouthint: ["checkbox"],
        multiplechoice: true,
        enumerated: true,
        options: [
          {
            key: "Practitioner",
            label: "Practitioner",
          },
        ],
      },
    };
  });

  it("creating an AssignmentFilterModel without data should throw", () => {
    expect(() => new AssignmentFilterModel()).toThrow();
  });

  it("should be able to create an AssignmentFilterModel", () => {
    const assignmentFilter = new AssignmentFilterModel(
      filterData,
      filterContributions
    );

    expect(assignmentFilter).toBeInstanceOf(AssignmentFilterModel);
    expect(assignmentFilter.user).toBeInstanceOf(ChoiceAttributeModel);
    expect(assignmentFilter.user.type === "lookup").toBeTruthy();
    expect(
      assignmentFilter.assignmenttype instanceof ChoiceAttributeModel
    ).toBeTruthy();

    expect(assignmentFilter.assignmenttype.options.size).toBe(1);
  });

  it("should be able to create an AssignmentFilterModel with context", () => {
    const assignmentFilter = new AssignmentFilterModel(
      {
        name: "AssignmentsOrders",
        C1_1_USERKEY: {
          param: "C1_1_USERKEY",
          name: "C1_1_USERKEY",
          options: [{ key: "1", selected: true }],
          _links: {
            lookupOptions: {
              href:
                "/lookupOptions?lookupToken=f3d6e3bb-99ce-494f-92fe-451b18a491b6",
              filter: { name: "labelFilter" },
            },
          },
        },
        C1_1_ASSIGNMENTTYPE: {
          param: "C1_1_ASSIGNMENTTYPE",
          name: "C1_1_ASSIGNMENTTYPE",
          options: [
            { key: "Controller" },
            { key: "Supervisor", selected: true },
          ],
        },
        dynamicschema: { C1_1_USERKEY: [{ code: "1", label: "Arnold Baker" }] },
      },
      {
        type: "assignmentfilter",
        label: "Assignments",
        C1_1_USERKEY: {
          type: "choicefilter",
          label: "User id",
          layouthint: ["checkbox"],
          multiplechoice: true,
          optionMode: "lookup",
        },
        C1_1_ASSIGNMENTTYPE: {
          type: "choicefilter",
          label: "Type",
          layouthint: ["checkbox"],
          multiplechoice: true,
          optionMode: "static",
          options: [
            { key: "Controller", label: "Controller" },
            { key: "Supervisor", label: "Supervisor" },
          ],
        },
        contextid: "C1_1_",
      }
    );

    expect(assignmentFilter).toBeInstanceOf(AssignmentFilterModel);
    expect(assignmentFilter.user).toBeInstanceOf(ChoiceAttributeModel);
    expect(assignmentFilter.user.type === "lookup").toBeTruthy();
    expect(assignmentFilter.user.options.size).toBe(1);
    expect(
      assignmentFilter.assignmenttype instanceof ChoiceAttributeModel
    ).toBeTruthy();

    expect(assignmentFilter.assignmenttype.options.size).toBe(2);
  });
});
