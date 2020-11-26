import CompositeAttributeModel from "beinformed/models/attributes/CompositeAttributeModel";

describe("CompositeAttributeModel", () => {
  it("creates a composite attribute for old date range attribute", () => {
    const data = {
      key: "DateRange",
      children: [
        {
          key: "BeginDate",
        },
        {
          key: "EndDate",
        },
      ],
    };

    const contributions = {
      label: "Date range",
      type: "range",
      mandatory: false,
      children: [
        {
          BeginDate: {
            label: "Begin",
            type: "date",
            mandatory: true,
            format: "dd-MM-yyyy",
          },
        },
        {
          EndDate: {
            label: "End",
            type: "date",
            mandatory: true,
            format: "dd-MM-yyyy",
          },
        },
      ],
    };

    const attribute = new CompositeAttributeModel(data, contributions);

    expect(attribute.children).toHaveLength(2);
    expect(attribute.children.first.name).toBe("BeginDate");
    expect(attribute.children.last.name).toBe("EndDate");
  });

  it("create a composite attribute for a new date range attribute", () => {
    const data = {
      key: "daterange",
      children: [{ key: "start1", value: "2010-01-01" }, { key: "end1" }],
    };
    const contributions = {
      label: "DateRange",
      type: "range",
      mandatory: false,
      children: [
        {
          start1: {
            label: "start1",
            type: "date",
            mandatory: false,
            format: "dd-MM-yyyy",
          },
        },
        {
          end1: {
            label: "end1",
            type: "date",
            mandatory: false,
            format: "dd-MM-yyyy",
          },
        },
      ],
    };

    const attribute = new CompositeAttributeModel(data, contributions);

    expect(attribute.children).toHaveLength(2);
    expect(attribute.children.first.name).toBe("start1");
    expect(attribute.children.first.value).toBe("2010-01-01");
    expect(attribute.children.last.name).toBe("end1");
  });

  it("creates a composite attribute for a choice attribute with a table codemap on a list, single choice", () => {
    const data = {
      key: "MostPopularBookPrint",
      value: {
        _id: "62",
        Title: "Matilda",
        PrintingHouse: "Printers united",
        BooksPrinted: 5000,
        FirstPrint: "2013-01-01",
      },
      static: false,
      _links: {},
      dynamicschemaId: "MostPopularBookPrint",
      isResult: false,
      children: [
        {
          key: "Title",
          value: "Matilda",
          static: false,
          _links: {},
          dynamicschemaId: "Title",
          isResult: false,
          children: [],
        },
        {
          key: "PrintingHouse",
          value: "Printers united",
          static: false,
          _links: {},
          dynamicschemaId: "PrintingHouse",
          isResult: false,
          children: [],
        },
        {
          key: "BooksPrinted",
          value: 5000,
          static: false,
          _links: {},
          dynamicschemaId: "BooksPrinted",
          isResult: false,
          children: [],
        },
        {
          key: "FirstPrint",
          value: "2013-01-01",
          static: false,
          _links: {},
          dynamicschemaId: "FirstPrint",
          isResult: false,
          children: [],
        },
      ],
    };
    const contributions = {
      type: "composite",
      label: "Most popular book print",
      optionMode: "dynamic",
      multiplechoice: false,
      layouthint: ["table"],
      enumerated: true,
      children: [
        { Title: { type: "string", label: "Title", displaysize: 50 } },
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
            label: "Books printed",
            decimalSeparator: ",",
            format: "0",
            groupingSeparator: ".",
          },
        },
        {
          FirstPrint: {
            type: "date",
            label: "First print",
            formatlabel: "dd-mm-jjjj",
            format: "dd-MM-yyyy",
          },
        },
      ],
    };

    const attribute = new CompositeAttributeModel(data, contributions);

    expect(attribute.children).toHaveLength(4);
    expect(attribute.children.first.name).toBe("Title");
    expect(attribute.children.first.value).toBe("Matilda");
    expect(attribute.children.last.name).toBe("FirstPrint");
    expect(attribute.value).toEqual({
      BooksPrinted: 5000,
      FirstPrint: "2013-01-01",
      PrintingHouse: "Printers united",
      Title: "Matilda",
    });
  });

  it("creates a composite attribute for a choice attribute with a table codemap on a list, multiple choice", () => {
    const data = {
      key: "MemorableBookPrints",
      value: [
        {
          _id: "62",
          Title: "Matilda",
          PrintingHouse: "Printers united",
          FirstPrint: "2013-01-01",
        },
        {
          _id: "44",
          Title: "The safety of objects",
          PrintingHouse: "Printers united",
          FirstPrint: "2014-01-01",
        },
      ],
      static: false,
      _links: {},
      dynamicschemaId: "MemorableBookPrints",
      isResult: false,
      children: [
        [
          {
            key: "Title",
            value: "Matilda",
            static: false,
            _links: {},
            dynamicschemaId: "Title",
            isResult: false,
            children: [],
          },
          {
            key: "PrintingHouse",
            value: "Printers united",
            static: false,
            _links: {},
            dynamicschemaId: "PrintingHouse",
            isResult: false,
            children: [],
          },
          {
            key: "FirstPrint",
            value: "2013-01-01",
            static: false,
            _links: {},
            dynamicschemaId: "FirstPrint",
            isResult: false,
            children: [],
          },
        ],
        [
          {
            key: "Title",
            value: "The safety of objects",
            static: false,
            _links: {},
            dynamicschemaId: "Title",
            isResult: false,
            children: [],
          },
          {
            key: "PrintingHouse",
            value: "Printers united",
            static: false,
            _links: {},
            dynamicschemaId: "PrintingHouse",
            isResult: false,
            children: [],
          },
          {
            key: "FirstPrint",
            value: "2014-01-01",
            static: false,
            _links: {},
            dynamicschemaId: "FirstPrint",
            isResult: false,
            children: [],
          },
        ],
      ],
    };
    const contributions = {
      type: "composite",
      label: "Memorable book prints",
      optionMode: "dynamic",
      multiplechoice: true,
      layouthint: ["table"],
      enumerated: true,
      children: [
        { Title: { type: "string", label: "Title", displaysize: 50 } },
        {
          PrintingHouse: {
            type: "string",
            label: "Printing house",
            displaysize: 50,
          },
        },
        {
          FirstPrint: {
            type: "date",
            label: "First print",
            formatlabel: "dd-mm-jjjj",
            format: "dd-MM-yyyy",
          },
        },
      ],
    };

    const attribute = new CompositeAttributeModel(data, contributions);

    expect(attribute.children).toHaveLength(2);
    expect(attribute.children.first.first.name).toBe("Title");
    expect(attribute.children.first.first.value).toBe("Matilda");
    expect(attribute.children.last.last.name).toBe("FirstPrint");
    expect(attribute.value).toEqual([
      {
        Title: "Matilda",
        PrintingHouse: "Printers united",
        FirstPrint: "2013-01-01",
      },
      {
        Title: "The safety of objects",
        PrintingHouse: "Printers united",
        FirstPrint: "2014-01-01",
      },
    ]);
  });
});
