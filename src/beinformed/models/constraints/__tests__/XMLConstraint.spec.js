import XMLConstraint from "beinformed/models/constraints/XMLConstraint";

describe("XMLConstraint", () => {
  it("XML checks", () => {
    const constraint = new XMLConstraint();

    expect(constraint).toBeInstanceOf(XMLConstraint);

    expect(constraint.isValidXML("<invalid>text<invalid>")).toBeFalsy();
    expect(constraint.isValidXML("<valid>text</valid>")).toBeTruthy();
    expect(constraint.isValidXML("{ isJson: true }")).toBeFalsy();
    expect(constraint.isValidXML()).toBeFalsy();
  });
});
