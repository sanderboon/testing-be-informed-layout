import Parameter from "beinformed/models/href/Parameter";

describe("Parameter", () => {
  it("should be able to create an empty Parameter object", () => {
    const parameter = new Parameter();

    expect(parameter).toBeInstanceOf(Parameter);
  });

  it("should be able to create a Parameter with various values", () => {
    const stringParam = new Parameter("prefix", "string", "string");
    expect(stringParam.value).toBe("string");
    expect(stringParam.toString()).toBe("prefix~string=string");

    const emptyStringParam = new Parameter("prefix", "string", "");
    expect(emptyStringParam.value).toBe("");
    expect(emptyStringParam.toString()).toBe("prefix~string=");

    const numberParam = new Parameter("prefix", "number", 1);
    expect(numberParam.value).toBe(1);
    expect(numberParam.toString()).toBe("prefix~number=1");

    const negativeNumberParam = new Parameter("prefix", "number", -1);
    expect(negativeNumberParam.value).toBe(-1);
    expect(negativeNumberParam.toString()).toBe("prefix~number=-1");

    const zeroNumberParam = new Parameter("prefix", "number", 0);
    expect(zeroNumberParam.value).toBe(0);
    expect(zeroNumberParam.toString()).toBe("prefix~number=0");

    const nullParam = new Parameter("prefix", "empty", null);
    expect(nullParam.value).toBeNull();
    expect(nullParam.toString()).toBe("prefix~empty=");

    const undefParam = new Parameter("prefix", "empty");
    expect(undefParam.value).toBe(void 0);
    expect(undefParam.toString()).toBe("prefix~empty=");
  });

  it("Should be able to create a parameter fromString", () => {
    const stringParamFromString = Parameter.fromString("prefix~string=string");
    expect(stringParamFromString.prefix).toBe("prefix");
    expect(stringParamFromString.name).toBe("string");
    expect(stringParamFromString.value).toBe("string");
    expect(stringParamFromString.toString()).toBe("prefix~string=string");

    const emptyStringParamFromString = Parameter.fromString("prefix~string=");
    expect(emptyStringParamFromString.value).toBe("");
    expect(emptyStringParamFromString.toString()).toBe("prefix~string=");

    const numberParamFromString = Parameter.fromString("prefix~number=1");
    expect(numberParamFromString.value).toBe("1");
    expect(numberParamFromString.toString()).toBe("prefix~number=1");

    const negativeNumberParamFromString = Parameter.fromString(
      "prefix~number=-1"
    );
    expect(negativeNumberParamFromString.value).toBe("-1");
    expect(negativeNumberParamFromString.toString()).toBe("prefix~number=-1");

    const zeroNumberParamFromString = Parameter.fromString("prefix~number=0");
    expect(zeroNumberParamFromString.value).toBe("0");
    expect(zeroNumberParamFromString.toString()).toBe("prefix~number=0");

    const nullParamFromString = Parameter.fromString("prefix~empty=null");
    expect(nullParamFromString.value).toBe("null");
    expect(nullParamFromString.toString()).toBe("prefix~empty=null");

    const undefParamFromString = Parameter.fromString("prefix~empty=void 0");
    expect(undefParamFromString.value).toBe("void 0");
    expect(undefParamFromString.toString()).toBe("prefix~empty=void 0");

    const noPrefixParamFromString = Parameter.fromString("string=string");
    expect(noPrefixParamFromString.name).toBe("string");
    expect(noPrefixParamFromString.prefix).toBeUndefined();
    expect(noPrefixParamFromString.value).toBe("string");
    expect(noPrefixParamFromString.toString()).toBe("string=string");

    const encodedValueParamFromString = Parameter.fromString(
      "redirectURI=%2FAccount%2FInloggenOfUitloggen%2FInloggenOpEenPortaal%3FPortaal%3DApp_Loonheffingportaal%26ReturnRedirectUri%3D%2Flh%2FPTLOnline"
    );
    expect(encodedValueParamFromString.name).toBe("redirectURI");
    expect(encodedValueParamFromString.prefix).toBeUndefined();
    expect(encodedValueParamFromString.value).toBe(
      "/Account/InloggenOfUitloggen/InloggenOpEenPortaal?Portaal=App_Loonheffingportaal&ReturnRedirectUri=/lh/PTLOnline"
    );
    expect(encodedValueParamFromString.toString()).toBe(
      "redirectURI=/Account/InloggenOfUitloggen/InloggenOpEenPortaal?Portaal=App_Loonheffingportaal&ReturnRedirectUri=/lh/PTLOnline"
    );

    const noParameterNameFromString = Parameter.fromString(
      "=No parameter name"
    );
    expect(noParameterNameFromString).toBeNull();

    const separatorAlsoInValue = Parameter.fromString(
      "prefix~string=prefix~string%3Dtest"
    );
    expect(separatorAlsoInValue.prefix).toBe("prefix");
    expect(separatorAlsoInValue.name).toBe("string");
    expect(separatorAlsoInValue.value).toBe("prefix~string=test");
    expect(separatorAlsoInValue.toString()).toBe(
      "prefix~string=prefix~string=test"
    );
  });
});
