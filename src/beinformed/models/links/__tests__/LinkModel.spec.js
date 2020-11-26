import LinkModel from "beinformed/models/links/LinkModel";
import { Href } from "beinformed/models";

describe("LinkModel", () => {
  it("should be able to create an empty LinkModel object", () => {
    const link = new LinkModel();

    expect(link).toBeInstanceOf(LinkModel);
  });

  it("can create a LinkModel from modular ui", () => {
    const link = new LinkModel(
      {
        href: "/books",
        name: "Books",
      },
      { name: "Books", label: "Books", resourcetype: "CaseTab" }
    );

    expect(link).toBeInstanceOf(LinkModel);
    expect(link.label).toBe("Books");
    expect(link.href.path).toEqual(new Href("/books").path);
    expect(link.links.isEmpty).toBeTruthy();
  });

  it("can create a LinkModel with children from modular ui", () => {
    const link = new LinkModel(
      {
        href: "/books",
        name: "Books",
        components: [
          {
            href: "/books/child1",
            name: "Child1",
          },
          {
            href: "/books/child2",
            name: "Child2",
          },
        ],
      },
      {
        name: "Books",
        label: "Books",
        resourcetype: "CaseTab",
        components: [
          {
            name: "Child1",
            label: "Child 1",
            resourcetype: "CaseList",
          },
          {
            name: "Child2",
            label: "Child 2",
            resourcetype: "DataStoreList",
          },
        ],
      }
    );

    expect(link.links.isEmpty).toBeFalsy();
    expect(link.links.size).toBe(2);
    expect(link.links.first.label).toBe("Child 1");
    expect(link.links.last.href.path).toBe(new Href("/books/child2").path);
  });
});
