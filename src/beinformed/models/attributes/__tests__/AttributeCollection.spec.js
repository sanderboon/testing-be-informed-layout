import FormCollectionData from "../__mock__/_FormCollectionData.json";
import FormCollectionContribution from "../__mock__/_FormCollectionContribution.json";

import AttributeCollection from "beinformed/models/attributes/AttributeCollection";

import ListDetailData from "../__mock__/_ListDetailData.json";
import ListDetailContributions from "../__mock__/_ListDetailContributions.json";

import ListAttributeData from "../__mock__/_ListAttributeData.json";
import ListAttributeContributions from "../__mock__/_ListAttributeContributions.json";

import ActionFieldsData from "../__mock__/_ActionFieldsData.json";
import ActionFieldsContributions from "../__mock__/_ActionFieldsContributions.json";

describe("AttributeCollection", () => {
  it("should be able to create an empty AttributeCollection object", () => {
    const attributeCollection = new AttributeCollection();

    expect(attributeCollection).toBeInstanceOf(AttributeCollection);
    expect(attributeCollection).toHaveLength(0);
    expect(attributeCollection.visible).toHaveLength(0);
    expect(attributeCollection.getAttributeByKey("not_existing")).toBeNull();
    expect(attributeCollection.getAttributeByLayoutHint("not_existing")).toBe(
      null
    );
    expect(attributeCollection.getDependentChoiceAttribute("")).toBeNull();
  });

  it("can create collection from form data and contributions", () => {
    const attributeCollection = new AttributeCollection(
      FormCollectionData,
      FormCollectionContribution
    );

    expect(attributeCollection).toBeInstanceOf(AttributeCollection);
    expect(attributeCollection.size).toBe(31);
    expect(attributeCollection).toHaveLength(31);
    expect(attributeCollection.visible).toHaveLength(31);
    expect(attributeCollection.hasAttributeByKey("Address")).toBeTruthy();
    expect(
      attributeCollection.getAttributesByLayoutHint("zipcode").length
    ).toBe(2);

    expect(
      attributeCollection.getChoiceAttributeByLayoutHint("combobox").label
    ).toBe("Type");
    expect(attributeCollection.getChoiceAttributeByLayoutHint("bla")).toBe(
      null
    );

    attributeCollection.setReferenceDate("2010-01-01");
    expect(attributeCollection.all[0].referenceDate).toBe("2010-01-01");

    const [attr1] = attributeCollection.all;
    const key1 = attr1.key;
    const [attr2] = attributeCollection.all;
    const key2 = attr2.key;
    expect(attributeCollection.all[0].key).toBe(key1);
    attributeCollection.replace(attr1, attr2);
    expect(attributeCollection.all[0].key).toBe(key2);

    attributeCollection.attributes = [attributeCollection.all[0]];
    expect(attributeCollection).toHaveLength(1);
  });

  it("can handle list detail data and contributions", () => {
    const attributeCollection = new AttributeCollection(
      ListDetailData,
      ListDetailContributions
    );

    expect(attributeCollection).toBeInstanceOf(AttributeCollection);
    expect(attributeCollection.size).toBe(5);
    expect(attributeCollection).toHaveLength(5);
    expect(attributeCollection.visible).toHaveLength(5);
    // not metadata
    expect(attributeCollection.hasAttributeByKey("CaseName")).toBeFalsy();

    // attribute
    expect(attributeCollection.hasAttributeByKey("ISBN10")).toBeTruthy();

    expect(attributeCollection.getAttributeByKey("ISBN10").value).toBe(
      "1847087302"
    );
  });

  it("can create an attribute collection from list item data and contributions", () => {
    const attributeCollection = new AttributeCollection(
      ListAttributeData,
      ListAttributeContributions
    );

    expect(attributeCollection).toBeInstanceOf(AttributeCollection);
    expect(attributeCollection.size).toBe(6);
    expect(attributeCollection).toHaveLength(6);
    expect(attributeCollection.visible).toHaveLength(6);
    expect(attributeCollection.hasAttributeByKey("Title")).toBeTruthy();
    expect(
      attributeCollection.getAttributesByLayoutHint("combobox").length
    ).toBe(1);
  });

  it("can handle actions fields data and contributions", () => {
    const attributeCollection = new AttributeCollection(
      ActionFieldsData,
      ActionFieldsContributions
    );

    expect(attributeCollection).toBeInstanceOf(AttributeCollection);
    expect(attributeCollection.size).toBe(1);
    expect(attributeCollection).toHaveLength(1);
    expect(attributeCollection.getAttributeByKey("ID").value).toBe(26);
  });

  it("can replace the complete collection with an other collection", () => {
    const data = FormCollectionData;

    const contributions = FormCollectionContribution;

    const attributeCollection = new AttributeCollection(data, contributions);

    expect(attributeCollection).toHaveLength(31);

    const contributions2 = [
      {
        TimestampRange: {
          label: "Timestamp range",
          type: "range",
          mandatory: false,
          children: [
            {
              BeginTimestamp: {
                label: "Begin",
                type: "datetime",
                mandatory: true,
                format: "dd-MM-yyyy HH:mm:ss.SSS",
              },
            },
            {
              EndTimestamp: {
                label: "End",
                type: "datetime",
                mandatory: true,
                format: "dd-MM-yyyy HH:mm:ss.SSS",
              },
            },
          ],
        },
      },
    ];

    const attributeCollection2 = new AttributeCollection(
      FormCollectionData,
      contributions2
    );

    attributeCollection.collection = attributeCollection2.collection;

    expect(attributeCollection).toHaveLength(1);
  });
});
