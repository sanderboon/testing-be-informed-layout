import CaptchaAttributeModel from "beinformed/models/attributes/CaptchaAttributeModel";

describe("CaptchaAttributeModel", () => {
  it("should be able to create an empty CaptchaAttributeModel object", () => {
    const attribute = new CaptchaAttributeModel();

    expect(attribute).toBeInstanceOf(CaptchaAttributeModel);
    expect(attribute.type).toBe("captcha");

    const newAttr = attribute.update("test");
    expect(newAttr.inputvalue).toBe("test");
  });
});
