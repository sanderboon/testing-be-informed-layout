// @flow
type RegexObject = {
  messageKey: string,
  defaultMessage: string,
  regex: string | RegExp,
};

class RegexConstraint implements IConstraintModel {
  _regexConstraint: Object;

  constructor(regexConstraint: RegexObject) {
    this._regexConstraint = regexConstraint;
  }

  get id() {
    return this.regexConstraint.messageKey;
  }

  get regexConstraint() {
    return this._regexConstraint;
  }

  hasValidation() {
    return true;
  }

  get defaultMessage() {
    return (
      this.regexConstraint.defaultMessage || this.regexConstraint.messageKey
    );
  }

  get parameters() {
    return {
      regex: this.regexConstraint.regex,
    };
  }

  validate(value: string) {
    if (this.regexConstraint.regex instanceof RegExp) {
      return this.regexConstraint.regex.test(value);
    }

    return new RegExp(this.regexConstraint.regex).test(value);
  }

  get isMandatoryConstraint() {
    return false;
  }
}

export default RegexConstraint;
