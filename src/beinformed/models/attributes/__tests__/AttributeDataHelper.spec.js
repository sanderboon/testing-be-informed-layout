import AttributeDataHelper from "beinformed/models/attributes/AttributeDataHelper";

describe("AttributeDataHelper", () => {
  it("Can handle string attribute on list", () => {
    const data = {
      key: "Title",
      value: null,
      static: false,
      _links: {},
      dynamicschemaId: "Title",
      isResult: false,
      children: [],
    };
    const key = "Title";
    const childrenKeys = [];

    const dataHelper = new AttributeDataHelper(data, key, childrenKeys);

    expect(dataHelper.getData()).toEqual({
      _links: {},
      children: [],
      dynamicschema: undefined,
      dynamicschemaId: "Title",
      isResult: false,
      key: "Title",
      message: undefined,
      options: undefined,
      referenceDate: undefined,
      static: false,
      value: null,
    });
  });

  it("Handle choice attribute with single choice table codemap on list", () => {
    const data = {
      _id: 72,
      _links: {
        self: { href: "/UT_books/UT_booksview/24/detailed-metadata/72" },
      },
      FruitMostMentioned: null,
      LatestRelatedBook: null,
      MarketingOrganization: null,
      MarketingProjectLeader: null,
      NativeCountryMarketingCampaign: null,
      MemorableBookPrints: [
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
      PrehistoricBookPrints: [
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
      MostPopularBookPrint: {
        _id: "62",
        Title: "Matilda",
        PrintingHouse: "Printers united",
        BooksPrinted: 5000,
        FirstPrint: "2013-01-01",
      },
      MostDramaticBookPrint: {
        _id: "62",
        Title: "Matilda",
        PrintingHouse: "Printers united",
        BooksPrinted: 5000,
        FirstPrint: "2013-01-01",
      },
    };
    const key = "MostPopularBookPrint";
    const childrenKeys = [
      { key: "Title", children: [] },
      { key: "PrintingHouse", children: [] },
      { key: "BooksPrinted", children: [] },
      { key: "FirstPrint", children: [] },
    ];

    const dataHelper = new AttributeDataHelper(data, key, childrenKeys);

    expect(dataHelper.getData()).toEqual({
      _links: {},
      children: [
        {
          _links: {},
          children: [],
          dynamicschema: undefined,
          dynamicschemaId: "Title",
          isResult: false,
          key: "Title",
          message: undefined,
          options: undefined,
          referenceDate: undefined,
          static: false,
          value: "Matilda",
        },
        {
          _links: {},
          children: [],
          dynamicschema: undefined,
          dynamicschemaId: "PrintingHouse",
          isResult: false,
          key: "PrintingHouse",
          message: undefined,
          options: undefined,
          referenceDate: undefined,
          static: false,
          value: "Printers united",
        },
        {
          _links: {},
          children: [],
          dynamicschema: undefined,
          dynamicschemaId: "BooksPrinted",
          isResult: false,
          key: "BooksPrinted",
          message: undefined,
          options: undefined,
          referenceDate: undefined,
          static: false,
          value: 5000,
        },
        {
          _links: {},
          children: [],
          dynamicschema: undefined,
          dynamicschemaId: "FirstPrint",
          isResult: false,
          key: "FirstPrint",
          message: undefined,
          options: undefined,
          referenceDate: undefined,
          static: false,
          value: "2013-01-01",
        },
      ],
      dynamicschema: undefined,
      dynamicschemaId: "MostPopularBookPrint",
      isResult: false,
      key: "MostPopularBookPrint",
      message: undefined,
      options: undefined,
      referenceDate: undefined,
      static: false,
      value: {
        BooksPrinted: 5000,
        FirstPrint: "2013-01-01",
        PrintingHouse: "Printers united",
        Title: "Matilda",
        _id: "62",
      },
    });
  });

  it("Handle choice attribute with multiple choice table codemap on list", () => {
    const data = {
      _id: 72,
      _links: {
        self: { href: "/UT_books/UT_booksview/24/detailed-metadata/72" },
      },
      FruitMostMentioned: null,
      LatestRelatedBook: null,
      MarketingOrganization: null,
      MarketingProjectLeader: null,
      NativeCountryMarketingCampaign: null,
      MemorableBookPrints: [
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
      PrehistoricBookPrints: [
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
      MostPopularBookPrint: {
        _id: "62",
        Title: "Matilda",
        PrintingHouse: "Printers united",
        BooksPrinted: 5000,
        FirstPrint: "2013-01-01",
      },
      MostDramaticBookPrint: {
        _id: "62",
        Title: "Matilda",
        PrintingHouse: "Printers united",
        BooksPrinted: 5000,
        FirstPrint: "2013-01-01",
      },
    };
    const key = "PrehistoricBookPrints";
    const childrenKeys = [
      { key: "Title", children: [] },
      { key: "PrintingHouse", children: [] },
      { key: "BooksPrinted", children: [] },
      { key: "FirstPrint", children: [] },
    ];

    const dataHelper = new AttributeDataHelper(data, key, childrenKeys);

    expect(dataHelper.getData()).toEqual({
      _links: {},
      children: [
        [
          {
            _links: {},
            children: [],
            dynamicschema: undefined,
            dynamicschemaId: "Title",
            isResult: false,
            key: "Title",
            message: undefined,
            options: undefined,
            referenceDate: undefined,
            static: false,
            value: "Matilda",
          },
          {
            _links: {},
            children: [],
            dynamicschema: undefined,
            dynamicschemaId: "PrintingHouse",
            isResult: false,
            key: "PrintingHouse",
            message: undefined,
            options: undefined,
            referenceDate: undefined,
            static: false,
            value: "Printers united",
          },
          {
            _links: {},
            children: [],
            dynamicschema: undefined,
            dynamicschemaId: "BooksPrinted",
            isResult: false,
            key: "BooksPrinted",
            message: undefined,
            options: undefined,
            referenceDate: undefined,
            static: false,
            value: null,
          },
          {
            _links: {},
            children: [],
            dynamicschema: undefined,
            dynamicschemaId: "FirstPrint",
            isResult: false,
            key: "FirstPrint",
            message: undefined,
            options: undefined,
            referenceDate: undefined,
            static: false,
            value: "2013-01-01",
          },
        ],
        [
          {
            _links: {},
            children: [],
            dynamicschema: undefined,
            dynamicschemaId: "Title",
            isResult: false,
            key: "Title",
            message: undefined,
            options: undefined,
            referenceDate: undefined,
            static: false,
            value: "The safety of objects",
          },
          {
            _links: {},
            children: [],
            dynamicschema: undefined,
            dynamicschemaId: "PrintingHouse",
            isResult: false,
            key: "PrintingHouse",
            message: undefined,
            options: undefined,
            referenceDate: undefined,
            static: false,
            value: "Printers united",
          },
          {
            _links: {},
            children: [],
            dynamicschema: undefined,
            dynamicschemaId: "BooksPrinted",
            isResult: false,
            key: "BooksPrinted",
            message: undefined,
            options: undefined,
            referenceDate: undefined,
            static: false,
            value: null,
          },
          {
            _links: {},
            children: [],
            dynamicschema: undefined,
            dynamicschemaId: "FirstPrint",
            isResult: false,
            key: "FirstPrint",
            message: undefined,
            options: undefined,
            referenceDate: undefined,
            static: false,
            value: "2014-01-01",
          },
        ],
      ],
      dynamicschema: undefined,
      dynamicschemaId: "PrehistoricBookPrints",
      isResult: false,
      key: "PrehistoricBookPrints",
      message: undefined,
      options: undefined,
      referenceDate: undefined,
      static: false,
      value: [
        {
          FirstPrint: "2013-01-01",
          PrintingHouse: "Printers united",
          Title: "Matilda",
          _id: "62",
        },
        {
          FirstPrint: "2014-01-01",
          PrintingHouse: "Printers united",
          Title: "The safety of objects",
          _id: "44",
        },
      ],
    });
  });
});
