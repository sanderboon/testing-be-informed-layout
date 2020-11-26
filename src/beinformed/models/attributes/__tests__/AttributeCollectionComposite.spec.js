import AttributeCollection from "../AttributeCollection";

describe("AttributeCollectionComposite", () => {
  it("can handle multiple composite attributes with same child keys", () => {
    const data = [
      {
        elementid: "Daterange",
        elements: [
          {
            elementid: "Start",
          },
          {
            elementid: "End",
          },
        ],
      },
      {
        elementid: "Timerange",
        elements: [
          {
            elementid: "Start",
          },
          {
            elementid: "End",
          },
        ],
      },
      {
        elementid: "Timestamprange",
        elements: [
          {
            elementid: "Start",
          },
          {
            elementid: "End",
          },
        ],
      },
    ];

    const contributions = [
      {
        Daterange: {
          type: "range",
          label: "Daterange",
          mandatory: false,
          children: [
            {
              Start: {
                type: "date",
                label: "Start",
                mandatory: true,
                formatlabel: "dd-mm-yyyy",
                format: "dd-MM-yyyy",
              },
            },
            {
              End: {
                type: "date",
                label: "End",
                mandatory: true,
                formatlabel: "dd-mm-yyyy",
                format: "dd-MM-yyyy",
              },
            },
          ],
        },
      },
      {
        Timerange: {
          type: "range",
          label: "Timerange",
          mandatory: false,
          children: [
            {
              Start: {
                type: "time",
                label: "Start",
                mandatory: true,
                formatlabel: "uu:mm",
                format: "HH:mm",
              },
            },
            {
              End: {
                type: "time",
                label: "End",
                mandatory: true,
                formatlabel: "uu:mm",
                format: "HH:mm",
              },
            },
          ],
        },
      },
      {
        Timestamprange: {
          type: "range",
          label: "Timestamprange",
          mandatory: false,
          children: [
            {
              Start: {
                type: "datetime",
                label: "Start",
                mandatory: true,
                formatlabel: "dd-mm-yyyy hh:mm:ss.fff",
                format: "dd-MM-yyyy HH:mm:ss.SSS",
              },
            },
            {
              End: {
                type: "datetime",
                label: "End",
                mandatory: true,
                formatlabel: "dd-mm-yyyy hh:mm:ss.fff",
                format: "dd-MM-yyyy HH:mm:ss.SSS",
              },
            },
          ],
        },
      },
    ];

    const attributeCollection = new AttributeCollection(data, contributions);

    expect(attributeCollection).toBeInstanceOf(AttributeCollection);
    expect(attributeCollection.size).toBe(3);

    const firstComposite = attributeCollection.get(0);
    expect(firstComposite.key).toBe("Daterange");

    const secondComposite = attributeCollection.get(1);
    const secondCompositeFirstChild = secondComposite.children.get(0);
    expect(secondComposite.key).toBe("Timerange");
    expect(secondCompositeFirstChild.key).toBe("Start");
    expect(secondCompositeFirstChild.parentKey).toBe("Timerange");

    const thirdComposite = attributeCollection.get(2);
    expect(thirdComposite.key).toBe("Timestamprange");

    const findByAttr = attributeCollection.getAttributeByAttribute(
      thirdComposite
    );
    expect(findByAttr.key).toBe("Timestamprange");
  });
});
