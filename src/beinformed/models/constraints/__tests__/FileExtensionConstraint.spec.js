import FileExtensionConstraint from "beinformed/models/constraints/FileExtensionConstraint";

describe("FileExtensionConstraint", () => {
  it("FileExtensionConstraint checks", () => {
    const constraint = new FileExtensionConstraint([
      {
        extensions: ["pdf", "epub"],
        mimeTypes: ["application/pdf", "application/epub+zip"],
      },
    ]);

    expect(constraint).toBeInstanceOf(FileExtensionConstraint);
    expect(constraint.id).toBe("Constraint.File.InvalidExtension");
    expect(constraint.extensions).toBe("pdf, epub");
    expect(constraint.hasValidation()).toBeFalsy();
    expect(constraint.validate()).toBeTruthy();
    expect(typeof constraint.defaultMessage).toBe("string");
    expect(constraint.parameters).toEqual({ extensions: "pdf, epub" });
  });
});
