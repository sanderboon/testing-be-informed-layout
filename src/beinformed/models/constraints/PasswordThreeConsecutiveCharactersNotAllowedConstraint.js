// @flow
class PasswordThreeConsecutiveCharactersNotAllowedConstraint
  implements IConstraintModel {
  _maxSequence: number;

  constructor(maxSequence: number = 2) {
    this._maxSequence = maxSequence;
  }

  get id() {
    return "Constraint.Password.ThreeConsecutiveCharactersNotAllowed";
  }

  get maxSequence() {
    return this._maxSequence;
  }

  hasValidation() {
    return true;
  }

  get defaultMessage() {
    return "Must not contain any character more than twice consecutively";
  }

  get parameters() {
    return {
      "max-sequence": this.maxSequence,
    };
  }

  hasNoSequenceOfIdenticalCharacters(value: string) {
    return !value
      .split("")
      .filter((char, i) => value.indexOf(char) === i)
      .some((char) => {
        const sequence = char.repeat(this.maxSequence + 1);
        return value.includes(sequence);
      });
  }

  validate(value: string) {
    return this.hasNoSequenceOfIdenticalCharacters(value);
  }

  get isMandatoryConstraint() {
    return false;
  }
}

export default PasswordThreeConsecutiveCharactersNotAllowedConstraint;
