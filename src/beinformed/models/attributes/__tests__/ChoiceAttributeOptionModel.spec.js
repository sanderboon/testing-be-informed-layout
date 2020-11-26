import ChoiceAttributeOptionModel from "beinformed/models/attributes/ChoiceAttributeOptionModel";
import ConceptDetailModel from "beinformed/models/concepts/ConceptDetailModel";
import ContentModel from "beinformed/models/content/ContentModel";

import listData from "../../lookup/__tests__/_LookupOptionsListData.json";
import listContributions from "../../lookup/__tests__/_LookupOptionsListContributions.json";

describe("ChoiceAttributeOptionModel", () => {
  it("should be able to create an empty ChoiceAttributeOptionModel", () => {
    const option = new ChoiceAttributeOptionModel();

    expect(option).toBeInstanceOf(ChoiceAttributeOptionModel);
    expect(option.getInitialChildModelLinks()).toHaveLength(0);
    expect(option.label).toBe("");
    expect(option.code).toBe("");
    expect(option.count).toBeNull();
    expect(option.concept).toBeNull();
    expect(option.isBooleanType).toBeFalsy();
    expect(option.level).toBe(0);

    option.level = 1;
    expect(option.level).toBe(1);
  });

  it("Can create a ChoiceAttributeOptionModel with standard json", () => {
    const option = new ChoiceAttributeOptionModel(
      [],
      {
        label: "Hardcover2",
        code: "Hardcover2",
        selected: false,
        _links: {
          concept: {
            href:
              "/concepts/Incident/Business design/Process elementen/Eerste contact.bixml/UitslagBlaastestType",
          },
        },
        children: [
          {
            label: "Child1",
            code: "Child1",
            selected: false,
            children: [
              {
                label: "grandchild1",
                code: "grandchild1",
                selected: false,
              },
            ],
          },
        ],
      },
      "2016-01-01"
    );

    expect(option.getInitialChildModelLinks()).toHaveLength(1);

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

    option.setChildModels([concept]);

    expect(option.concept).toBeInstanceOf(ConceptDetailModel);
    expect(option.concept.type).toBe("ConceptDetail");
    expect(option.children).toHaveLength(1);
    expect(option.children.first.children).toHaveLength(1);
  });

  it("Can handle content models", () => {
    const attribute = new ChoiceAttributeOptionModel([], {});

    expect(attribute.content).toEqual(new Map());

    expect(() => {
      attribute.addContent("contentType", "bla");
    }).toThrow();

    const contentModel = new ContentModel({});
    attribute.addContent("contentType", contentModel);
    expect(attribute.content.get("contentType")).toEqual(contentModel);
  });

  it("Can handle elements", () => {
    const option = new ChoiceAttributeOptionModel([], {
      ...listData.lookup.options[0],
      elementsContributions: listContributions.lookup.options[0].elements,
    });

    expect(option.attributeCollection).toHaveLength(9);
  });
});
