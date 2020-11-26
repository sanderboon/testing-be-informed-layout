// @flow
class BSNConstraint implements IConstraintModel {
  get id() {
    return "Constraint.BSN.InvalidFormat";
  }

  hasValidation() {
    return true;
  }

  get defaultMessage() {
    return "Must be a valid BSN";
  }

  get parameters() {
    return {};
  }

  isValidBSN(bsn: string) {
    // if remove invalid characters and check if this is still the same length to find out if unwanted characters are used
    // valid characters are: numbers
    if (bsn.replace(/[^\d]/gu, "").length !== bsn.length) {
      return false;
    }

    const bsnNumber = bsn.replace(/\D/gu, "");

    const bsnLength = bsnNumber.length;
    const MINBSNLENGTH = 8;
    const MAXBSNLENGTH = 9;

    if (
      bsnLength < MINBSNLENGTH ||
      bsnLength > MAXBSNLENGTH ||
      isNaN(bsnNumber)
    ) {
      return false;
    }

    let pos = 0;
    let result = 0;

    for (let i = bsnLength; i > 0; i--) {
      const digit = parseInt(bsnNumber.charAt(pos), 10);

      result += i === 1 ? digit * -1 : digit * i;
      pos += 1;
    }

    return result % 11 === 0;
  }

  validate(value: string) {
    return this.isValidBSN(value);
  }

  get isMandatoryConstraint() {
    return false;
  }
}

export default BSNConstraint;
