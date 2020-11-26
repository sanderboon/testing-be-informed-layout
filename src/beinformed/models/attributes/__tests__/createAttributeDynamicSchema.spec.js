import createAttribute from "beinformed/models/attributes/_createAttribute";

describe("createAttribute With Dynamicschema", () => {
  it("should be able to create a choice attribute with dynamicschema inside a composite", () => {
    const composite = createAttribute(
      "results",
      {
        dynamicschema: {
          "results.PeriodOfInterestRate": [
            {
              code: "n2YearsRepaymentMortgage",
              label: "2 years",
            },
            {
              code: "n3YearsRepaymentMortgage",
              label: "3 years",
            },
          ],
        },
        results: {
          PeriodOfInterestRate: "n5YearsRepaymentMortgage",
        },
      },
      {
        type: "composite",
        label: "results",
        children: [
          {
            PeriodOfInterestRate: {
              type: "string",
              label: "Period of interest rate",
              optionMode: "dynamic",
              falseAllowed: true,
              multiplechoice: false,
              layouthint: ["combobox"],
              dynamicschemaId: "results.PeriodOfInterestRate",
              enumerated: true,
            },
          },
        ],
      }
    );

    expect(composite.type).toBe("composite");
    expect(composite.children).toHaveLength(1);

    const periodOfInterest = composite.children.first;
    expect(periodOfInterest.type).toBe("choice");
    expect(periodOfInterest.key).toBe("PeriodOfInterestRate");
    expect(periodOfInterest.options).toHaveLength(2);
  });

  it("should be able to create a choice attribute where an other attribute has a dynamicschema", () => {
    const composite = createAttribute(
      "DocumentType",
      {
        Creator: "1",
        DocumentType: "eBook",
        dynamicschema: {
          Creator: [
            {
              code: "1",
              label: "Arnold",
            },
          ],
        },
      },
      {
        type: "string",
        label: "Document type",
        optionMode: "static",
        readonly: true,
        multiplechoice: false,
        layouthint: ["combobox"],
        enumerated: true,
        options: [
          {
            code: "eBook",
            label: "eBook",
          },
        ],
      }
    );

    expect(composite.type).toBe("choice");
    expect(composite.options).toHaveLength(1);
  });

  it("should create a choice attribute with dynamischema on a form", () => {
    const choice = createAttribute(
      "Person",
      [
        {
          elementid: "Person",
          dynamicschema: [
            {
              code: "1",
              label: "Stephen King",
            },
            {
              code: "2",
              label: "Douglas Coupland",
            },
          ],
        },
        {
          elementid: "BelowCodemapsAreAllWithLargeOn",
          static: true,
          value: "Below codemaps are all with large on",
        },
        {
          elementid: "FruitStaticSingle",
          _links: {
            lookupOptions: {
              href:
                "/lookupOptions?lookupToken=da9fe2ee-a0da-46b7-8e0e-1909fd2d0ce2",
            },
          },
        },
      ],
      {
        type: "string",
        label: "Person",
        mandatory: false,
        optionMode: "dynamicWithThreshold",
        multiplechoice: false,
        layouthint: ["combobox"],
        enumerated: true,
      }
    );

    expect(choice.type).toBe("choice");
    expect(choice.options).toHaveLength(2);
  });
});
