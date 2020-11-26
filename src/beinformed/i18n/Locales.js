// @flow
import { isNil } from "lodash";

import Locale from "beinformed/i18n/Locale";

import englishMessages from "beinformed/i18n/translations/layout_en.nl.json";
import dutchMessages from "beinformed/i18n/translations/layout_nl.nl.json";
import englishErrors from "beinformed/i18n/translations/beinformed_error_messages_en.nl.json";
import dutchErrors from "beinformed/i18n/translations/beinformed_error_messages_nl.nl.json";

import BaseCollection from "beinformed/models/base/BaseCollection";

import type { LocaleConfiguration } from "beinformed/i18n";
/**
 * Order of locales is the prefered order of locales.
 * When user has an accept language header that does not correspond to the locales array,
 * the first one is used as the prefered language
 */
export const availableLocales: Array<LocaleConfiguration> = [
  {
    code: "en",
    messages: englishMessages,
    errors: englishErrors,
  },
  {
    code: "nl",
    messages: dutchMessages,
    errors: dutchErrors,
  },
];

/**
 * Merge an object with custom error messages (exported and translated from be informed for example) and merge them with the existing translations.
 *
 * @param configuredErrors  an object where each property key is the locale code and the value is an object of error messages.
 */
type ErrorMessageObject = {
  [languageCode: string]: {
    [messageID: string]: string,
  },
};
export const createLocalesWithConfiguredErrors = (
  configuredErrors: ErrorMessageObject
): Array<Object> =>
  availableLocales.map((availableLocale) => {
    if (configuredErrors[availableLocale.code]) {
      return {
        ...availableLocale,
        errors: {
          ...availableLocale.errors,
          ...configuredErrors[availableLocale.code],
        },
      };
    }

    return availableLocale;
  });

class Locales extends BaseCollection<Locale> {
  constructor(locales: Array<LocaleConfiguration> = availableLocales) {
    super(locales.map((locale) => new Locale(locale)));
  }

  static rehydrate(hydatedLocales: {
    _collection: Array<{
      _code: string,
      _messages: {
        [string]: string,
      },
      _errors: {
        [string]: string,
      },
    }>,
  }) {
    if (hydatedLocales && hydatedLocales._collection) {
      return new Locales(
        hydatedLocales._collection.map((locale) => ({
          code: locale._code,
          messages: locale._messages,
          errors: locale._errors,
        }))
      );
    }

    return new Locales([]);
  }

  hasLocale(localeCode: string) {
    return this.some((item) => localeCode.startsWith(item.code));
  }

  getLocale(localeCode: string) {
    if (this.hasLocale(localeCode)) {
      const locale = this.find((item) => localeCode.startsWith(item.code));
      if (locale) {
        return locale;
      }
    }
    throw new Error(`Locale configuration for locale ${localeCode} not found`);
  }

  get availableLocaleCodes(): Array<string> {
    return this.map((locale) => locale.code);
  }

  getPreferredLocale(acceptLanguageHeader: string | null) {
    if (!isNil(acceptLanguageHeader)) {
      const acceptLanguages =
        acceptLanguageHeader.match(/[-A-Za-z]{2,10}/gu) || [];

      const preferredLocales = acceptLanguages
        .filter((locale) =>
          this.availableLocaleCodes.some((availableLocale) =>
            locale.startsWith(availableLocale)
          )
        )
        .map((locale) =>
          this.availableLocaleCodes.find((availableLocale) =>
            locale.startsWith(availableLocale)
          )
        );

      if (preferredLocales.length > 0) {
        return preferredLocales[0];
      }
    }

    return this.availableLocaleCodes[0];
  }

  /**
   * Add or change messages and errors for the given locale. It is not possible to remove messages.
   */
  update(locale: string, messages: Object = {}, errors: Object = {}) {
    if (this.hasLocale(locale)) {
      this.getLocale(locale).update(messages, errors);
    } else {
      this.add(
        new Locale({
          code: locale,
          messages,
          errors,
        })
      );
    }
  }
}

export default Locales;
