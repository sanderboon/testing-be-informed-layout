import AttributeModel from "beinformed/models/attributes/AttributeModel";

import { Href } from "beinformed/models";
import ConceptDetailModel from "beinformed/models/concepts/ConceptDetailModel";

describe("AttributeModel", () => {
  it("should be able to create an empty AttributeModel object", () => {
    const attribute = new AttributeModel();

    expect(attribute).toBeInstanceOf(AttributeModel);
    expect(attribute.getInitialChildModelLinks()).toHaveLength(0);

    expect(attribute.key).toBeUndefined();
    expect(attribute.label).toBe("");
    expect(attribute.value).toBeNull();
    expect(attribute.readonlyvalue).toBe("");
    expect(attribute.type).toBeUndefined();
    expect(attribute.layouthint.all).toEqual([]);
    expect(attribute.format).toBeNull();
    expect(attribute.links.size).toBe(0);
    expect(attribute.downloadLink).toBeNull();
    expect(attribute.readonly).toBeFalsy();
    expect(attribute.readonly).toBeFalsy();
    expect(attribute.formatLabel).toBe("");
    expect(attribute.assistantMessage).toBeNull();

    attribute.setChildModels([]);
    expect(attribute.concept).toBeNull();
  });

  it("should create Attribute from typical modular UI response", () => {
    const attributeJSON = {
      key: "ISBN10",
      value: "1234567890",
    };
    const attributeContribution = {
      label: "ISBN10",
      type: "string",
    };

    const attribute = new AttributeModel(attributeJSON, attributeContribution);

    expect(attribute).toBeInstanceOf(AttributeModel);
    expect(attribute.key).toBe("ISBN10");
    expect(attribute.name).toBe("ISBN10");
    expect(attribute.label).toBe("ISBN10");
    expect(attribute.value).toBe("1234567890");
    expect(attribute.readonlyvalue).toBe("1234567890");
    expect(attribute.type).toBe("string");
    expect(attribute.layouthint.all).toEqual([]);
    expect(attribute.format).toBeNull();

    expect(attribute.conceptLink).toBeNull();

    // check abstract methods to throw
    expect(() => {
      attribute.reset();
    }).toThrow();
    expect(() => {
      attribute.update();
    }).toThrow();
  });

  it("Can set and get label", () => {
    const attribute = new AttributeModel();

    attribute.label = "Dummy label";

    expect(attribute.label).toBe("Dummy label");
  });

  it("can set and get inputvalues", () => {
    const attribute = new AttributeModel();

    attribute.inputvalue = "Test value";

    expect(attribute.inputvalue).toBe("Test value");
  });

  it("Attribute with server error message", () => {
    const attribute = new AttributeModel({
      message: {
        id: "Error.Mandatory",
        parameters: {},
      },
    });

    expect(attribute.errorCollection).toHaveLength(1);
  });

  it("can have a download link", () => {
    const attribute = new AttributeModel({
      key: "documentFile",
      _links: {
        download: [
          {
            href: "/download",
            name: "documentFile",
          },
        ],
      },
    });

    expect(attribute.downloadLink.key).toBe("documentFile");
    expect(attribute.downloadLink.href).toEqual(new Href("/download"));
  });

  it("Returns error information", () => {
    const attribute = new AttributeModel(
      {},
      {
        minLength: 5,
        maxLength: 7,
      }
    );

    expect(attribute.inError()).toBeFalsy();

    attribute.addMissingError();
    expect(attribute.inError()).toBeFalsy();

    attribute.resetErrors();
    attribute.addServerError({
      id: "Constraint.InvalidLengthTooLong",
      properties: {
        "min-value": 5,
      },
    });

    expect(attribute.inError()).toBeFalsy();

    attribute.updateLastModification();

    let isValid = attribute.validate("1234");
    expect(isValid).toBeFalsy();
    expect(attribute.inError()).toBeTruthy();

    attribute.updateLastModification();
    isValid = attribute.validate("12345");
    expect(isValid).toBeTruthy();
    expect(attribute.inError()).toBeFalsy();
  });

  it("Set changed since", () => {
    const attribute = new AttributeModel({});
    attribute.updateLastModification();
    expect(attribute.isChangedSince(0)).toBeTruthy();
  });

  it("Can set and get editable property", () => {
    const attribute = new AttributeModel({});

    expect(attribute.isEditable).toBeFalsy();

    attribute.isEditable = true;
    expect(attribute.isEditable).toBeTruthy();
  });

  it("Can indicate if it is a dependent question", () => {
    const attribute = new AttributeModel(
      {},
      {
        layouthint: [
          "dependent-attribute:show when dependent-control:BLA equals [AA|BB]",
        ],
      }
    );

    expect(attribute.isDependentAttribute).toBeTruthy();
  });

  it("Can handle concept and content links", () => {
    const attribute = new AttributeModel(
      {
        _links: {
          self: {
            href: "/concept",
          },
        },
        referenceDate: "2010-09-10",
      },
      {
        _links: {
          concept: {
            href:
              "/concepts/Incident/Business design/Process elementen/Eerste contact.bixml/UitslagBlaastestType",
          },
        },
      }
    );

    attribute.hasContentConfiguration = true;
    expect(attribute.getInitialChildModelLinks()).toHaveLength(1);

    expect(attribute.conceptLink.href.path).toEqual(
      "/concepts/Incident/Business design/Process elementen/Eerste contact.bixml/UitslagBlaastestType"
    );

    expect(attribute.referenceDate).toBe("2010-09-10");

    attribute.referenceDate = "2010-10-10";
    expect(attribute.referenceDate).toBe("2010-10-10");

    expect(attribute.conceptLink.href.getParameter("entryDate").value).toBe(
      "2010-10-10"
    );
  });

  it("Can handle concept (child)models", () => {
    const attribute = new AttributeModel(
      {
        _links: {
          self: {
            href: "/concept",
          },
        },
        referenceDate: "2016-01-01",
      },
      {
        _links: {
          concept: {
            href:
              "/concepts/Incident/Business design/Process elementen/Eerste contact.bixml/UitslagBlaastestType",
          },
        },
      }
    );

    const concept = new ConceptDetailModel({
      data: {
        _links: {
          self: {
            href:
              "/concepts/Incident/Business design/Process elementen/Eerste contact.bixml/UitslagBlaastestType",
          },
        },
        filter: {
          entryDate: {
            param: "entryDate",
            name: "entryDate",
            value: "2016-01-01",
          },
        },
      },
      contributions: {
        _links: {},
        filter: [
          {
            entryDate: {
              type: "datefilter",
              label: "Entry date",
              layouthint: [],
              format: "dd-MM-yyyy",
            },
          },
        ],
      },
    });

    attribute.setChildModels([concept]);

    expect(attribute.concept).toBeInstanceOf(ConceptDetailModel);
    expect(attribute.concept.type).toBe("ConceptDetail");
  });
});
