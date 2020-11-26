import FileSizeConstraint from "beinformed/models/constraints/FileSizeConstraint";

describe("FileSizeConstraint", () => {
  it("FileSizeConstraint standard", () => {
    const constraint = new FileSizeConstraint({
      fileSize: 10485760,
      isMaxTotal: false,
    });

    expect(constraint).toBeInstanceOf(FileSizeConstraint);
    expect(constraint.id).toBe("Constraint.File.MaxFileSize");
    expect(constraint.filesizeConstraint).toEqual({
      fileSize: 10485760,
      isMaxTotal: false,
    });

    expect(constraint.hasValidation()).toBeFalsy();
    expect(constraint.validate()).toBeTruthy();
    expect(typeof constraint.defaultMessage).toBe("string");
    expect(constraint.parameters).toEqual({ "max-filesize": "10.00 MB" });

    expect(constraint.filesize).toBe("10.00 MB");
    expect(constraint.maxTotalFileSize).toBe("0.00 Bytes");
  });

  it("FileSizeConstraint maxTotalFileSize", () => {
    const constraint = new FileSizeConstraint({
      fileSize: 485760,
      maxTotalFileSize: 10485760,
      isMaxTotal: true,
    });

    expect(constraint).toBeInstanceOf(FileSizeConstraint);
    expect(constraint.id).toBe("Constraint.File.MaxTotalFileSize");
    expect(constraint.filesizeConstraint).toEqual({
      fileSize: 485760,
      maxTotalFileSize: 10485760,
      isMaxTotal: true,
    });

    expect(constraint.hasValidation()).toBeFalsy();
    expect(constraint.validate()).toBeTruthy();
    expect(typeof constraint.defaultMessage).toBe("string");
    expect(constraint.parameters).toEqual({
      "filesize-left": "474.38 KB",
      "max-total-filesize": "10.00 MB",
    });

    expect(constraint.filesize).toBe("474.38 KB");
    expect(constraint.maxTotalFileSize).toBe("10.00 MB");
  });
});
