import ActionCollection from "beinformed/models/actions/ActionCollection";

describe("ActionCollection", () => {
  const collectionData = [
    {
      name: "sample",
      method: "GET",
      href: "/list/action",
      fields: [
        {
          name: "id",
          type: "number",
          value: 1,
        },
        {
          name: "idNoValue",
          type: "number",
        },
      ],
    },
    {
      name: "sample2",
      method: "POST",
      href: "/list/action2",
    },
  ];
  const collectionContributions = [
    {
      name: "sample",
      label: "Example of an action",
      type: "form",
      fields: [
        {
          id: {
            type: "number",
            label: "ID",
          },
        },
        {
          idNoValue: {
            type: "number",
            label: "IDNOVALUE",
          },
        },
      ],
    },
    {
      name: "sample2",
      label: "Example of an action by layouthint",
      type: "generic",
      layouthint: ["testaction"],
    },
  ];

  it("should be able to create an empty ActionCollection object", () => {
    const actionCollection = new ActionCollection();

    expect(actionCollection).toBeInstanceOf(ActionCollection);
    expect(actionCollection).toHaveLength(0);
  });

  it("should throw an error when action data is available but no contributions", () => {
    expect(() => {
      new ActionCollection(collectionData);
    }).toThrow();
  });

  it("should be able to create an ActionCollection with standard modular ui json", () => {
    const actionCollection = new ActionCollection(
      collectionData,
      collectionContributions
    );

    expect(actionCollection).toHaveLength(2);
    expect(actionCollection.getActionsByType("form")).toHaveLength(1);
    expect(actionCollection.hasActionsByLayoutHint("testaction")).toBeTruthy();
    expect(actionCollection.getActionsByLayoutHint("testaction")).toHaveLength(
      1
    );
  });
});
