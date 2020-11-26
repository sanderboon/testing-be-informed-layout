// jest.mock("ChoiceAttributeOptionModel", jest.fn());

import ChoiceAttributeOptionCollection from "beinformed/models/attributes/ChoiceAttributeOptionCollection";

describe("ChoiceAttributeOptionCollection", () => {
  it("can handle simple options", () => {
    const data = {
      options: [
        {
          key: "Hardcover",
          selected: true,
          count: 11,
        },
        {
          key: "Paperback",
          selected: true,
          count: 18,
        },
        {
          key: "Ebook",
          count: 1,
        },
        {
          key: "Audio",
          count: 2,
        },
      ],
    };
    const contributions = {
      options: [
        {
          code: "Hardcover",
          label: "Hardcover",
        },
        {
          code: "Paperback",
          label: "Paperback",
        },
        {
          code: "Ebook",
          label: "E-book",
        },
        {
          code: "Audio",
          label: "Audio",
        },
      ],
    };

    const collection = ChoiceAttributeOptionCollection.create(
      data,
      contributions
    );

    expect(collection).toHaveLength(4);
    expect(collection.selected[0].code).toBe("Hardcover");
  });

  it("can handle boolean", () => {
    const data = { key: "StageCondition" };
    const contributions = {
      label: "Stage condition",
      type: "boolean",
      mandatory: false,
      multiplechoice: false,
      layouthint: ["radiobutton"],
    };

    const collection = ChoiceAttributeOptionCollection.create(
      data,
      contributions
    );

    expect(collection).toHaveLength(2);
  });

  it("can handle taxonomy options", () => {
    const data = { key: "TaxonomyNativeCountry", value: ["UnitedKingdom"] };
    const contributions = {
      label: "Taxonomy Native Country",
      type: "string",
      mandatory: false,
      multiplechoice: false,
      layouthint: ["radiobutton"],
      enumerated: true,
      options: [
        {
          code: "NativeCountry",
          label: "Native country",
          children: [
            { code: "Netherlands", label: "Netherlands" },
            {
              code: "UnitedKingdom",
              label: "United Kingdom",
              children: [
                { code: "England", label: "England" },
                { code: "Wales", label: "Wales" },
                { code: "Scotland", label: "Scotland" },
                { code: "NorthernIreland", label: "Northern Ireland" },
              ],
            },
            { code: "Germany", label: "Germany" },
            { code: "Belgium", label: "Belgium" },
          ],
        },
      ],
    };

    const collection = ChoiceAttributeOptionCollection.create(
      data,
      contributions
    );

    expect(collection).toHaveLength(1);
    expect(collection.all[0].children.all[1].code).toBe("UnitedKingdom");
  });

  it("can handle dynamicschema", () => {
    const data = {
      key: "Person",
      value: ["2"],
      dynamicschema: [
        {
          code: "1",
          label: "Stephen King",
        },
        {
          code: "2",
          label: "Douglas Coupland",
          selected: true,
        },
        {
          code: "3",
          label: "A.M. Homes",
        },
        {
          code: "4",
          label: "Nick Hornby",
        },
      ],
    };

    const contributions = {
      label: "Person",
      type: "string",
      mandatory: false,
      multiplechoice: false,
      layouthint: ["combobox"],
      enumerated: true,
      options: [],
    };

    const collection = ChoiceAttributeOptionCollection.create(
      data,
      contributions
    );

    expect(collection).toHaveLength(4);
    expect(collection.selected[0].code).toBe("2");
  });

  it("can handle table codemap single choice", () => {
    const data = {
      key: "MostPopularBookPrint",
      value: null,
      static: false,
      dynamicschema: [
        {
          code: "62",
          elements: {
            Title: "Matilda",
            PrintingHouse: "Printers united",
            BooksPrinted: 5000,
            Format: "Paperback",
            Language: "EN",
          },
        },
        {
          code: "44",
          elements: {
            Title: "The safety of objects",
            PrintingHouse: "Printers united",
            BooksPrinted: 3500,
            Format: "Paperback",
            Language: "EN",
          },
        },
        {
          code: "55",
          elements: {
            Title: "The BFG",
            PrintingHouse: "Bookprinters",
            BooksPrinted: 3500,
            Format: "Paperback",
            Language: "EN",
          },
        },
      ],
      dynamicschemaId: "MostPopularBookPrint",
      isResult: false,
      children: [],
    };

    const contributions = {
      type: "string",
      label: "Most popular print - table codemap single choice",
      mandatory: false,
      optionMode: "dynamic",
      multiplechoice: false,
      layouthint: ["table"],
      enumerated: true,
      children: [
        {
          ID: {
            type: "number",
            label: "ID",
            decimalSeparator: ",",
            format: "0",
            groupingSeparator: ".",
          },
        },
        {
          Title: {
            type: "string",
            label: "Title",
            displaysize: 50,
          },
        },
        {
          PrintingHouse: {
            type: "string",
            label: "Printing house",
            displaysize: 50,
          },
        },
        {
          BooksPrinted: {
            type: "number",
            label: "BooksPrinted",
            decimalSeparator: ",",
            format: "0",
            groupingSeparator: ".",
          },
        },
        {
          FirstPrint: {
            type: "date",
            label: "First Print",
            formatlabel: "dd-mm-jjjj",
            format: "dd-MM-yyyy",
          },
        },
        {
          Format: {
            type: "string",
            label: "Format",
            optionMode: "static",
            multiplechoice: false,
            layouthint: ["combobox"],
            enumerated: true,
            options: [
              {
                code: "Hardcover",
                label: "Hardcover",
              },
              {
                code: "Paperback",
                label: "Paperback",
              },
              {
                code: "Ebook",
                label: "Ebook",
              },
              {
                code: "Audio",
                label: "Audio book",
              },
            ],
          },
        },
        {
          Language: {
            type: "string",
            label: "Language",
            optionMode: "static",
            multiplechoice: false,
            layouthint: ["radiobutton"],
            enumerated: true,
            options: [
              {
                code: "EN",
                label: "English",
              },
              {
                code: "DU",
                label: "Dutch",
              },
            ],
          },
        },
      ],
    };

    const collection = ChoiceAttributeOptionCollection.create(
      data,
      contributions
    );

    expect(collection).toHaveLength(3);
    expect(collection.first.attributeCollection).toHaveLength(7);

    expect(collection.first.attributeCollection.first.key).toBe("ID");
    expect(collection.first.attributeCollection.first.label).toBe("ID");
    expect(collection.first.attributeCollection.first.type).toBe("number");
    expect(collection.first.attributeCollection.first.value).toBeNull();

    expect(collection.first.attributeCollection.get(1).key).toBe("Title");
    expect(collection.first.attributeCollection.get(1).label).toBe("Title");
    expect(collection.first.attributeCollection.get(1).type).toBe("string");
    expect(collection.first.attributeCollection.get(1).value).toBe("Matilda");

    expect(collection.first.attributeCollection.get(4).key).toBe("FirstPrint");
    expect(collection.first.attributeCollection.get(4).label).toBe(
      "First Print"
    );
    expect(collection.first.attributeCollection.get(4).type).toBe("date");
    expect(collection.first.attributeCollection.get(4).value).toBeNull();

    expect(collection.first.attributeCollection.get(5).key).toBe("Format");
    expect(collection.first.attributeCollection.get(5).label).toBe("Format");
    expect(collection.first.attributeCollection.get(5).type).toBe("choice");
    expect(collection.first.attributeCollection.get(5).value).toBe("Paperback");
  });

  it("can handle table codemap multi choice", () => {
    const data = {
      key: "BookPrints",
      value: null,
      static: false,
      dynamicschema: [
        {
          code: "62",
          elements: {
            Title: "Matilda",
            PrintingHouse: "Printers united",
            BooksPrinted: 5000,
            Format: "Paperback",
            Language: "EN",
          },
        },
        {
          code: "44",
          elements: {
            Title: "The safety of objects",
            PrintingHouse: "Printers united",
            BooksPrinted: 3500,
            Format: "Paperback",
            Language: "EN",
          },
        },
        {
          code: "55",
          elements: {
            Title: "The BFG",
            PrintingHouse: "Bookprinters",
            BooksPrinted: 3500,
            Format: "Paperback",
            Language: "EN",
          },
        },
      ],
      dynamicschemaId: "BookPrints",
      isResult: false,
      children: [],
    };

    const contributions = {
      type: "array",
      label: "Book prints - table codemap multiple choice",
      mandatory: false,
      optionMode: "dynamic",
      multiplechoice: true,
      layouthint: ["table"],
      enumerated: true,
      children: [
        {
          ID: {
            type: "number",
            label: "ID",
            decimalSeparator: ",",
            format: "0",
            groupingSeparator: ".",
          },
        },
        {
          Title: {
            type: "string",
            label: "Title",
            displaysize: 50,
          },
        },
        {
          PrintingHouse: {
            type: "string",
            label: "Printing house",
            displaysize: 50,
          },
        },
        {
          BooksPrinted: {
            type: "number",
            label: "BooksPrinted",
            decimalSeparator: ",",
            format: "0",
            groupingSeparator: ".",
          },
        },
        {
          FirstPrint: {
            type: "date",
            label: "First Print",
            formatlabel: "dd-mm-jjjj",
            format: "dd-MM-yyyy",
          },
        },
        {
          Format: {
            type: "string",
            label: "Format",
            optionMode: "static",
            multiplechoice: false,
            layouthint: ["combobox"],
            enumerated: true,
            options: [
              {
                code: "Hardcover",
                label: "Hardcover",
              },
              {
                code: "Paperback",
                label: "Paperback",
              },
              {
                code: "Ebook",
                label: "Ebook",
              },
              {
                code: "Audio",
                label: "Audio book",
              },
            ],
          },
        },
        {
          Language: {
            type: "string",
            label: "Language",
            optionMode: "static",
            multiplechoice: false,
            layouthint: ["radiobutton"],
            enumerated: true,
            options: [
              {
                code: "EN",
                label: "English",
              },
              {
                code: "DU",
                label: "Dutch",
              },
            ],
          },
        },
      ],
    };

    const collection = ChoiceAttributeOptionCollection.create(
      data,
      contributions
    );

    expect(collection).toHaveLength(3);
    expect(collection.first.attributeCollection).toHaveLength(7);

    expect(collection.first.attributeCollection.first.key).toBe("ID");
    expect(collection.first.attributeCollection.first.label).toBe("ID");
    expect(collection.first.attributeCollection.first.type).toBe("number");
    expect(collection.first.attributeCollection.first.value).toBeNull();

    expect(collection.first.attributeCollection.get(1).key).toBe("Title");
    expect(collection.first.attributeCollection.get(1).label).toBe("Title");
    expect(collection.first.attributeCollection.get(1).type).toBe("string");
    expect(collection.first.attributeCollection.get(1).value).toBe("Matilda");

    expect(collection.first.attributeCollection.get(4).key).toBe("FirstPrint");
    expect(collection.first.attributeCollection.get(4).label).toBe(
      "First Print"
    );
    expect(collection.first.attributeCollection.get(4).type).toBe("date");
    expect(collection.first.attributeCollection.get(4).value).toBeNull();

    expect(collection.first.attributeCollection.get(5).key).toBe("Format");
    expect(collection.first.attributeCollection.get(5).label).toBe("Format");
    expect(collection.first.attributeCollection.get(5).type).toBe("choice");
    expect(collection.first.attributeCollection.get(5).value).toBe("Paperback");
  });
});
