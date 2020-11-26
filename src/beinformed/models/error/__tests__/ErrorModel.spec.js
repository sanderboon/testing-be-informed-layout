import ErrorModel from "beinformed/models/error/ErrorModel";

describe("ErrorModel", () => {
  it("Should be able to creat an error", () => {
    const err = new ErrorModel("error1");

    expect(err.id).toBe("error1");
    expect(err.parameters).toBeUndefined();
    expect(err.isClientConstraint).toBeFalsy();

    const err2 = new ErrorModel(
      "error2",
      "defaultMessage",
      {
        param1: "parameter 1",
      },
      true
    );

    expect(err2.defaultMessage).toBe("defaultMessage");
    expect(err2.parameters.param1).toBe("parameter 1");
    expect(err2.isClientConstraint).toBeTruthy();
  });
});
