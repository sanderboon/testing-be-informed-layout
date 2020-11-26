import PasswordAttributeModel from "beinformed/models/attributes/PasswordAttributeModel";

describe("PasswordAttributeModel", () => {
  it("should be able to create an empty PasswordAttribute object", () => {
    const attribute = new PasswordAttributeModel();

    expect(attribute).toBeInstanceOf(PasswordAttributeModel);
    expect(attribute.type).toBe("password");
  });

  it("can handle password constraints", () => {
    const attributeJSON = {
      key: "Password",
      value: "",
    };
    const attributeContribution = {
      type: "password",
      label: "Password",
      mandatory: false,
      constraints: {
        upperAndLowerCaseMandatory: true,
        minNumberOfNumericCharacters: 1,
        minNumberOfSpecialCharacters: 1,
        maxSequenceOfIdenticalCharacters: 2,
        maxSequenceOfUsernameCharacters: 4,
        regexConstraint: [
          {
            regex: "^((?!test).)*$",
            messageKey: "Password_regex_validation",
          },
        ],
      },
      displaysize: 50,
      maxLength: 50,
      minLength: 6,
    };

    const attribute = new PasswordAttributeModel(
      attributeJSON,
      attributeContribution
    );

    expect(attribute).toBeInstanceOf(PasswordAttributeModel);
    expect(attribute.type).toBe("password");
  });
});
