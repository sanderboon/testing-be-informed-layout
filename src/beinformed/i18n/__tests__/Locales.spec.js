import Locales, {
  createLocalesWithConfiguredErrors,
} from "beinformed/i18n/Locales";

jest.mock(
  "../translations/layout_en.nl.json",
  () => ({
    testMessage: "testMessage",
    messageWithParams: "Param 1: {param1}, Param 2: {param2}",
    messageWithJavaParams: "Param 1: ${param1}, Param 2: ${param2}", // NOSONAR
  }),
  { virtual: true }
);

describe("Locales", () => {
  it("should be able to retrieve information about a locale", () => {
    const locales = new Locales();

    expect(locales).toHaveLength(2);
    expect(locales.getLocale("en").code).toBe("en");
    expect(locales.getLocale("en").nativeName).toBe("English");
    expect(locales.getLocale("en-NL").nativeName).toBe("English");
    expect(() => {
      locales.getLocale("bla").nativeName;
    }).toThrow();

    expect(locales.availableLocaleCodes).toHaveLength(2);
  });

  it("retrieves locale based on accept language header", () => {
    const locales = new Locales();
    expect(locales.getPreferredLocale()).toBe("en");
    expect(
      locales.getPreferredLocale("fr-CH, fr;q=0.9, en;q=0.8, de;q=0.7, *;q=0.5")
    ).toBe("en");
  });

  it("should be able to retrieve locale", () => {
    const englishLocale = new Locales().getLocale("en");

    expect(englishLocale.getMessage("testMessage", "exists")).toBe(
      "testMessage"
    );
    expect(englishLocale.getMessage("notPresent", "not exists")).toBe(
      "not exists"
    );
    expect(englishLocale.getMessage("notPresent")).toBe("notPresent");

    expect(
      englishLocale.getMessage("messageWithParams", "default message", {
        param1: "first parameter",
        param2: "second parameter",
      })
    ).toBe("Param 1: first parameter, Param 2: second parameter");

    expect(
      englishLocale.getMessage("messageWithJavaParams", "default message", {
        param1: "first parameter",
        param2: "second parameter",
      })
    ).toBe("Param 1: first parameter, Param 2: second parameter");

    expect(
      englishLocale.getMessage(
        "notPresent",
        "Param 1: ${param1}, Param 2: ${param2}",
        {
          param1: "first parameter",
          param2: "second parameter",
        }
      )
    ).toBe("Param 1: first parameter, Param 2: second parameter");

    expect(englishLocale.getMessage()).toBe(
      "[message: id or defaultMessage missing]"
    );
  });

  it("should be able to create a custom errors i18n object", () => {
    const customMessages = createLocalesWithConfiguredErrors({
      en: {
        customError: "Custom error message",
      },
    });

    expect(
      customMessages.find((msg) => msg.code === "en").errors.customError
    ).toBe("Custom error message");
  });

  it("is able to rehydrate the locales", () => {
    expect(Locales.rehydrate()).toHaveLength(0);

    const data = {
      _collection: [
        {
          _code: "fr",
          _messages: {
            "Login.Username": "Nom d'utilisateur",
          },
          _errors: {},
        },
      ],
    };

    const locales = Locales.rehydrate(data);

    expect(locales.getLocale("fr").getMessage("Login.Username")).toBe(
      "Nom d'utilisateur"
    );

    expect(locales.size).toBe(1);
  });

  it("Can update locales", () => {
    const locales = new Locales();

    locales.update("en", { newMessage: "New message" });

    expect(locales.getLocale("en").getMessage("newMessage")).toBe(
      "New message"
    );

    locales.update("fr", { newMessage: "Nouveau message" });
    expect(locales.getLocale("fr").getMessage("newMessage")).toBe(
      "Nouveau message"
    );
  });
});
