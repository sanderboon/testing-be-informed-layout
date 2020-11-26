// @flow
import { isString } from "lodash";
import formatMessage from "format-message";

import languages from "beinformed/i18n/languages";
import { IS_DEVELOPMENT } from "beinformed/constants/Constants";

import type { MessageParameters } from "beinformed/i18n";

class Locale {
  _code: string;
  _messages: { [string]: string };
  _errors: { [string]: string };

  constructor(locale: {
    code: string,
    messages: { [string]: string },
    errors: { [string]: string },
  }) {
    this._code = locale.code;

    this._messages = this.fixPlaceHoldersInObject(locale.messages);
    this._errors = this.fixPlaceHoldersInObject(locale.errors);

    formatMessage.setup({
      missingTranslation: "ignore",
    });
  }

  get code(): string {
    return this._code;
  }

  get nativeName(): string {
    const aLocale = this.code.split("-");

    if (aLocale.length > 0) {
      const language = languages.lang[aLocale[0]];

      if (language) {
        return (
          language[1] + (aLocale[1] ? ` (${aLocale[1].toUpperCase()})` : "")
        );
      }
    }

    throw new Error(`Can not find language name based on locale: ${this.code}`);
  }

  /**
   * Exported messages from Be Informed have placeholders in the syntax ${placeholder_name}
   * where the ICU messageformat module uses {placeholder_name}.
   * This method converts the ${} to {}
   */
  fixPlaceHolders(message: ?string) {
    if (isString(message)) {
      return message
        .replace(/'\$\{(?<key>.*?)}'/g, "''{$<key>}''")
        .replace(/\$\{(?<key>.*?)}/g, "{$<key>}");
    }

    return null;
  }

  fixPlaceHoldersInObject(messages: Object = {}) {
    return JSON.parse(
      JSON.stringify(messages)
        .replace(/'\$\{(?<key>.*?)}'/g, "''{$<key>}''")
        .replace(/\$\{(?<key>.*?)}/g, "{$<key>}")
    );
  }

  getBaseMessage(id: string, defaultMessage?: string) {
    if (!id && !defaultMessage) {
      return "[message: id or defaultMessage missing]";
    }

    const messageFromLocale = this._messages[id] || this._errors[id];

    if (IS_DEVELOPMENT && !messageFromLocale && id) {
      console.warn(`Message with id ${id} not found for locale ${this.code}`);
    }

    return messageFromLocale || this.fixPlaceHolders(defaultMessage) || id;
  }

  formatMessage(message: string, parameters?: MessageParameters) {
    if (parameters) {
      return formatMessage(message, parameters);
    }

    return message;
  }

  /**
   * Retrieve a messages with replaced parameters
   */
  getMessage(
    id: string,
    defaultMessage?: string,
    parameters?: MessageParameters
  ) {
    const message = this.getBaseMessage(id, defaultMessage);
    return this.formatMessage(message, parameters);
  }

  /**
   * Add or change messages for this locale. It is not possible to remove messages.
   */
  update(messages: Object = {}, errors: Object = {}) {
    this._messages = {
      ...this._messages,
      ...messages,
    };

    this._errors = {
      ...this._errors,
      ...errors,
    };
  }
}

export default Locale;
