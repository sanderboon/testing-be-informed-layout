import LookupAttributeModel from "beinformed/models/attributes/ChoiceAttributeModel";

describe("LookupAttributeModel", () => {
  it("should be able to create an instance of LookupAttributeModel", () => {
    const lookupAttribute = new LookupAttributeModel();

    expect(lookupAttribute).toBeInstanceOf(LookupAttributeModel);

    expect(lookupAttribute.type).toBe("choice");
  });

  it("has a lookupLink", () => {
    const lookupAttribute = new LookupAttributeModel({
      _links: {
        lookupOptions: {
          href:
            "/lookupOptions?lookupToken=41e23fd5-9a4c-41de-9c19-0ec0d9b3c643",
        },
      },
      optionMode: "lookup",
    });

    expect(lookupAttribute.type).toBe("choice");
    expect(lookupAttribute.lookupLink.href.path).toBe("/lookupOptions");

    lookupAttribute.addOption({
      code: "optionA",
      label: "Option A",
      selected: true,
    });

    expect(lookupAttribute.options).toHaveLength(1);
    expect(lookupAttribute.options.all[0].selected).toBeTruthy();

    lookupAttribute.addOption({
      code: "optionA",
    });
    expect(lookupAttribute.options).toHaveLength(1);

    lookupAttribute.update("optionB");

    expect(lookupAttribute.options).toHaveLength(1);
    expect(lookupAttribute.options.all[0].selected).toBeTruthy();

    lookupAttribute.update("optionA");
    expect(lookupAttribute.options.all[0].selected).toBeFalsy();
  });
});
