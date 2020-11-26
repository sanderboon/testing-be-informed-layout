import Locale from "beinformed/i18n/Locale";

import englishMessages from "../translations/layout_en.nl.json";
import englishErrors from "../translations/beinformed_error_messages_en.nl.json";

jest.mock(
  "../translations/layout_en.nl.json",
  () => ({
    testMessage: "testMessage",
    messageWithParams: "Param 1: {param1}, Param 2: {param2}",
    messageWithJavaParams: "Param 1: ${param1}, Param 2: ${param2}", // NOSONAR
  }),
  { virtual: true }
);

describe("Locale", () => {
  it("should be able to give back the native name of a locale", () => {
    const locale = new Locale({
      code: "en-US",
      messages: englishMessages,
      errors: englishErrors,
    });

    expect(locale.code).toBe("en-US");
    expect(locale.nativeName).toBe("English (US)");

    expect(locale.getMessage()).toBe("[message: id or defaultMessage missing]");
    expect(locale.getMessage("testMessage")).toBe("testMessage");

    locale.update({
      testMessage: "Updated message",
    });

    expect(locale.getMessage("testMessage")).toBe("Updated message");
  });

  it("Throws on non exising locale", () => {
    const locale = new Locale({
      code: "NONEXISTING",
    });

    expect(() => {
      locale.nativeName;
    }).toThrow();
  });

  it("Updates be informed message export to format-message formatted messages", () => {
    const messages = {
      code: "Parameter '${parameter}' is niet toegestaan",
    };

    const locale = new Locale({
      code: "CUSTOM",
      messages,
    });

    expect(locale.fixPlaceHoldersInObject(messages)).toEqual({
      code: "Parameter ''{parameter}'' is niet toegestaan",
    });

    expect(
      locale.getMessage("code", "", {
        parameter: "parameterName",
      })
    ).toBe("Parameter 'parameterName' is niet toegestaan");
  });
});
