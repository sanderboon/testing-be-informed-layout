import LayoutHintCollection from "beinformed/models/layouthint/LayoutHintCollection";

describe("LayoutHintCollection", () => {
  const lh = new LayoutHintCollection([
    "saml-auth",
    "int=42",
    "int-colon:42",
    "no-val=",
    "no-val-colon:",
    "string-val=value",
    "string-val-colon:value",
    "multi-val=val1;val2;val3",
    "multi-val-colon:val1;val2;val3",
    "number=42.13",
    "number-colon:42.13",
  ]);

  it("can check", () => {
    expect(lh.has("saml-auth")).toBeTruthy();
    expect(lh.has()).toBeFalsy();
  });

  it("correctly retrieves a layout hint", () => {
    expect(lh.getByLayoutHint("does-not-exist")).toBeNull();
    expect(lh.getByLayoutHint("saml-auth")).toBe("saml-auth");
    expect(lh.getByLayoutHint("no-val")).toBe("no-val=");
    expect(lh.getByLayoutHint("string-val")).toBe("string-val=value");
    expect(lh.getByLayoutHint("multi-val")).toBe("multi-val=val1;val2;val3");
    expect(lh.getByLayoutHint("int")).toBe("int=42");
    expect(lh.getByLayoutHint("number")).toBe("number=42.13");
  });

  it("correctly retrieves a layout hint value", () => {
    expect(lh.getLayoutHintValue("does-not-exist")).toBeNull();
    expect(lh.getLayoutHintValue("saml-auth")).toBeNull();
    expect(lh.getLayoutHintValue("no-val")).toBe("");
    expect(lh.getLayoutHintValue("string-val")).toBe("value");
    expect(lh.getLayoutHintValue("multi-val")).toBe("val1;val2;val3");
    expect(lh.getLayoutHintValue("int")).toBe("42");
    expect(lh.getLayoutHintValue("number")).toBe("42.13");

    expect(lh.getLayoutHintValue("no-val-colon")).toBe("");
    expect(lh.getLayoutHintValue("string-val-colon")).toBe("value");
    expect(lh.getLayoutHintValue("multi-val-colon")).toBe("val1;val2;val3");
    expect(lh.getLayoutHintValue("int-colon")).toBe("42");
    expect(lh.getLayoutHintValue("number-colon")).toBe("42.13");
    expect(lh.getLayoutHintValue("number-colon:")).toBe("42.13");
  });

  it("correctly retrieves multiple layout hint values", () => {
    expect(lh.getLayoutHintValues("does-not-exist")).toBeNull();
    expect(lh.getLayoutHintValue("saml-auth")).toBeNull();
    expect(lh.getLayoutHintValues("no-val")).toEqual([]);
    expect(lh.getLayoutHintValues("string-val")).toEqual(["value"]);
    expect(lh.getLayoutHintValues("multi-val")).toEqual([
      "val1",
      "val2",
      "val3",
    ]);
    expect(lh.getLayoutHintValues("int")).toEqual(["42"]);
    expect(lh.getLayoutHintValues("number")).toEqual(["42.13"]);

    expect(lh.getLayoutHintValues("no-val-colon")).toEqual([]);
    expect(lh.getLayoutHintValues("string-val-colon")).toEqual(["value"]);
    expect(lh.getLayoutHintValues("multi-val-colon")).toEqual([
      "val1",
      "val2",
      "val3",
    ]);
    expect(lh.getLayoutHintValues("int-colon")).toEqual(["42"]);
    expect(lh.getLayoutHintValues("number-colon")).toEqual(["42.13"]);
  });

  it("only handles arrays", () => {
    expect(() => {
      new LayoutHintCollection("test");
    }).toThrow();
  });
});
