import ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";

describe("ContentConfigurationElements", () => {
  it("should be able to create an instance of ContentConfigurationElements", () => {
    const contentConfigElement = new ContentConfigurationElements();

    expect(contentConfigElement instanceof ContentConfigurationElements).toBe(
      true
    );
  });

  it("can exclude content by layouthint", () => {
    const contentConfigElement = new ContentConfigurationElements([
      { labelElement: { labelTypes: ["LongLabel"] } },
      {
        contentElement: {
          sectionReferenceTypes: ["crDescription"],
          layouthint: ["render-section-label", "POPUP"],
        },
      },
    ]);

    expect(contentConfigElement.config).toHaveLength(2);

    const excludedLayouthint = contentConfigElement.excludeLayoutHints([
      "POPUP",
    ]);

    expect(excludedLayouthint.config).toHaveLength(1);
  });
});
