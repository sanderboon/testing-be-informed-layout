import AttributeCollection from "beinformed/models/attributes/AttributeCollection";
import {
  isVisibleAttribute,
  parseDependentHint,
} from "beinformed/models/attributes/attributeVisibilityUtil";

describe("attributeVisibilityUtil", () => {
  it("Parses dependent layout hints", () => {
    expect(
      parseDependentHint(
        "dependent-attribute:show when dependent-control:controlA equals code1"
      )
    ).toEqual({
      action: "show",
      control: "controlA",
      operator: "equals",
      options: ["code1"],
    });

    expect(
      parseDependentHint(
        "dependent-attribute: show when dependent-control: control A equals code1"
      )
    ).toEqual({
      action: "show",
      control: "control A",
      operator: "equals",
      options: ["code1"],
    });

    expect(
      parseDependentHint(
        "dependent-attribute:hide when dependent-control:controlA includes code1|code2"
      )
    ).toEqual({
      action: "hide",
      control: "controlA",
      operator: "includes",
      options: ["code1", "code2"],
    });

    expect(
      parseDependentHint(
        "dependent-attribute:show when dependent-control:controlA includes code1 | code2"
      )
    ).toEqual({
      action: "show",
      control: "controlA",
      operator: "includes",
      options: ["code1", "code2"],
    });
  });

  class MockedCollectionFactory {
    constructor() {
      this._data = [];
      this._contributions = [];
    }

    addControlAttribute(elementid, options = [], suggestion = [], hint = []) {
      this._data.push({
        elementid,
        dynamicschema: options.map((option) => ({
          code: option,
          label: option,
        })),
        suggestion,
      });

      this._contributions.push({
        [elementid]: {
          type: "string",
          enumerated: true,
          multiplechoice: true,
          layouthint: [...hint, "combobox"],
        },
      });
    }

    addDependentAttribute(elementid, hint = []) {
      this._data.push({
        elementid,
      });
      this._contributions.push({
        [elementid]: {
          type: "string",
          layouthint: hint,
        },
      });
    }

    createCollection() {
      return new AttributeCollection(this._data, this._contributions);
    }
  }

  it("Returns visible when no visibility specific hint is set", () => {
    const mockedCollectionFactory = new MockedCollectionFactory();

    mockedCollectionFactory.addControlAttribute(
      "attributeControl",
      ["code1", "code2", "code3", "code4", "code5", "code6"],
      ["code2", "code4", "code6"],
      ["dependent-control: Control A"]
    );
    mockedCollectionFactory.addDependentAttribute("attributeUnknownHint", [
      "unknown-hint",
    ]);
    mockedCollectionFactory.addDependentAttribute(
      "attributeHasNonExistingControl",
      [
        "dependent-attribute: show when dependent-control: Control B equals code2",
      ]
    );

    const mockedCollection = mockedCollectionFactory.createCollection();

    const noSpecificHint = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("attributeUnknownHint")
    );

    expect(noSpecificHint).toBeTruthy();

    const nonExistingControl = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("attributeHasNonExistingControl")
    );

    expect(nonExistingControl).toBeTruthy();
  });

  it("Returns visible", () => {
    const mockedCollectionFactory = new MockedCollectionFactory();

    mockedCollectionFactory.addControlAttribute(
      "attributeControl",
      ["code1", "code2"],
      ["code2"],
      ["dependent-control: Control A"]
    );
    mockedCollectionFactory.addDependentAttribute("showEqualsSelected", [
      "dependent-attribute:show when dependent-control: Control A equals code2",
    ]);
    mockedCollectionFactory.addDependentAttribute("hideEqualsNotSelected", [
      "dependent-attribute:hide when dependent-control:Control A equals code1",
    ]);
    mockedCollectionFactory.addDependentAttribute("showIncludesSelected", [
      "dependent-attribute:show when dependent-control: Control A includes code2",
    ]);
    mockedCollectionFactory.addDependentAttribute("hideIncludesNotSelected", [
      "dependent-attribute:hide when dependent-control: Control A includes code1",
    ]);

    mockedCollectionFactory.addDependentAttribute("showNotEqualsSelected", [
      "dependent-attribute:show when dependent-control: Control A notEquals code1",
    ]);
    mockedCollectionFactory.addDependentAttribute("hideNotEqualsNotSelected", [
      "dependent-attribute:hide when dependent-control: Control A notEquals code2",
    ]);
    mockedCollectionFactory.addDependentAttribute("showNotIncludesSelected", [
      "dependent-attribute:show when dependent-control: Control A notIncludes code1",
    ]);
    mockedCollectionFactory.addDependentAttribute(
      "hideNotIncludesNotSelected",
      [
        "dependent-attribute: hide when dependent-control: Control A notIncludes code2",
      ]
    );

    const mockedCollection = mockedCollectionFactory.createCollection();

    const showEqualsSelected = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("showEqualsSelected")
    );

    expect(showEqualsSelected).toBeTruthy();

    const hideEqualsNotSelected = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("hideEqualsNotSelected")
    );

    expect(hideEqualsNotSelected).toBeTruthy();

    const showIncludesSelected = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("showIncludesSelected")
    );

    expect(showIncludesSelected).toBeTruthy();

    const hideIncludesNotSelected = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("hideIncludesNotSelected")
    );

    expect(hideIncludesNotSelected).toBeTruthy();

    const showNotEqualsSelected = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("showNotEqualsSelected")
    );

    expect(showNotEqualsSelected).toBeTruthy();

    const hideNotEqualsNotSelected = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("hideNotEqualsNotSelected")
    );

    expect(hideNotEqualsNotSelected).toBeTruthy();

    const showNotIncludesSelected = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("showNotIncludesSelected")
    );

    expect(showNotIncludesSelected).toBeTruthy();

    const hideNotIncludesNotSelected = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("hideNotIncludesNotSelected")
    );

    expect(hideNotIncludesNotSelected).toBeTruthy();
  });

  it("Returns hidden", () => {
    const mockedCollectionFactory = new MockedCollectionFactory();

    mockedCollectionFactory.addControlAttribute(
      "attributeControl",
      ["code1", "code2"],
      ["code2"],
      ["dependent-control: Control A"]
    );
    mockedCollectionFactory.addDependentAttribute("showEqualsNotSelected", [
      "dependent-attribute:show when dependent-control: Control A equals code1",
    ]);
    mockedCollectionFactory.addDependentAttribute("hideEqualsSelected", [
      "dependent-attribute:hide when dependent-control: Control A equals code2",
    ]);
    mockedCollectionFactory.addDependentAttribute("showIncludesNotSelected", [
      "dependent-attribute:show when dependent-control: Control A includes code1",
    ]);
    mockedCollectionFactory.addDependentAttribute("hideIncludesSelected", [
      "dependent-attribute:hide when dependent-control: Control A includes code2",
    ]);

    const mockedCollection = mockedCollectionFactory.createCollection();

    const showEqualsNotSelected = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("showEqualsNotSelected")
    );

    expect(showEqualsNotSelected).toBeFalsy();

    const hideEqualsSelected = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("hideEqualsSelected")
    );

    expect(hideEqualsSelected).toBeFalsy();

    const showIncludesNotSelected = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("showIncludesNotSelected")
    );

    expect(showIncludesNotSelected).toBeFalsy();

    const hideIncludesSelected = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("hideIncludesSelected")
    );

    expect(hideIncludesSelected).toBeFalsy();
  });

  it("can handle an attribute that is dependend on an other dependent attribute", () => {
    const mockedCollectionFactory = new MockedCollectionFactory();

    mockedCollectionFactory.addControlAttribute(
      "attributeControlA",
      ["code1", "code2"],
      ["code2"],
      ["dependent-control: Control A"]
    );
    mockedCollectionFactory.addControlAttribute(
      "attributeControlB",
      ["code1", "code2"],
      ["code2"],
      [
        "dependent-control: Control B",
        "dependent-attribute:show when dependent-control: Control A equals code2",
      ]
    );
    mockedCollectionFactory.addControlAttribute(
      "attributeControlC",
      ["code1", "code2"],
      ["code2"],
      [
        "dependent-control: Control C",
        "dependent-attribute:show when dependent-control: Control B equals code2",
      ]
    );
    mockedCollectionFactory.addControlAttribute(
      "attributeControlD",
      ["code1", "code2"],
      ["code2"],
      [
        "dependent-control: Control D",
        "dependent-attribute:show when dependent-control: Control C equals code1",
      ]
    );
    mockedCollectionFactory.addControlAttribute(
      "attributeControlE",
      ["code1", "code2"],
      ["code2"],
      [
        "dependent-control: Control E",
        "dependent-attribute:show when dependent-control: Control D equals code2",
      ]
    );

    mockedCollectionFactory.addDependentAttribute("show1", [
      "dependent-attribute:show when dependent-control: Control A equals code2",
    ]);
    mockedCollectionFactory.addDependentAttribute("show2", [
      "dependent-attribute:show when dependent-control: Control B equals code2",
    ]);
    mockedCollectionFactory.addDependentAttribute("show3", [
      "dependent-attribute:show when dependent-control: Control C equals code2",
    ]);
    mockedCollectionFactory.addDependentAttribute("show4", [
      "dependent-attribute:show when dependent-control: Control D equals code2",
    ]);
    mockedCollectionFactory.addDependentAttribute("show5", [
      "dependent-attribute:show when dependent-control: Control E equals code2",
    ]);

    const mockedCollection = mockedCollectionFactory.createCollection();

    const show1 = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("show1")
    );

    expect(show1).toBeTruthy();

    const show2 = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("show2")
    );

    expect(show2).toBeTruthy();

    const show3 = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("show3")
    );

    expect(show3).toBeTruthy();
    const attributeControlB = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("attributeControlB")
    );

    expect(attributeControlB).toBeTruthy();

    expect(
      mockedCollection.getAttributeByKey("attributeControlC")
        .isDependentAttribute
    ).toBeTruthy();
    const attributeControlC = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("attributeControlC")
    );

    expect(attributeControlC).toBeTruthy();

    const show4 = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("show4")
    );

    expect(show4).toBeFalsy();

    const show5 = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("show5")
    );

    expect(show5).toBeFalsy();
  });

  it("throws error when prefix dependent-attribute: is missing", () => {
    const mockedCollectionFactory = new MockedCollectionFactory();

    mockedCollectionFactory.addControlAttribute(
      "attributeControl",
      ["code1", "code2"],
      ["code2"],
      ["dependent-control: Control A"]
    );
    mockedCollectionFactory.addDependentAttribute("showEqualsSelected", [
      "show when dependent-control: Control A equals code2",
    ]);

    const mockedCollection = mockedCollectionFactory.createCollection();
    expect(() => {
      isVisibleAttribute(
        mockedCollection,
        mockedCollection.getAttributeByKey("showEqualsSelected")
      );
    }).toThrow();
  });

  it("can handle an attribute with multiple dependent attributes", () => {
    const mockedCollectionFactory = new MockedCollectionFactory();

    mockedCollectionFactory.addControlAttribute(
      "attributeControlA",
      ["code1", "code2"],
      [],
      ["dependent-control: Control A"]
    );

    mockedCollectionFactory.addControlAttribute(
      "attributeControlB",
      ["code1", "code2"],
      [],
      ["dependent-control: Control B"]
    );

    mockedCollectionFactory.addDependentAttribute("depending", [
      "dependent-attribute:show when dependent-control: Control A equals code1",
      "dependent-attribute:show when dependent-control: Control B equals code1",
    ]);

    const mockedCollection = mockedCollectionFactory.createCollection();
    let dependingVisible = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("depending")
    );

    expect(dependingVisible).toBe(false);

    mockedCollection.getAttributeByKey("attributeControlA").update("code1");

    dependingVisible = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("depending")
    );

    expect(dependingVisible).toBe(false);

    mockedCollection.getAttributeByKey("attributeControlB").update("code1");

    dependingVisible = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("depending")
    );

    expect(dependingVisible).toBe(true);
  });
});
