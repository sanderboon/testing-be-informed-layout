// @flow
class XMLConstraint implements IConstraintModel {
  get id() {
    return "Constraint.XML.InvalidFormat";
  }

  hasValidation() {
    return true;
  }

  get defaultMessage() {
    return "Must be well-formed XML";
  }

  get parameters() {
    return {};
  }

  isValidXML(value: string) {
    const oParser = new DOMParser();

    try {
      const oDom = oParser.parseFromString(value, "text/xml");

      if (oDom.querySelectorAll("parsererror").length > 0) {
        return false;
      }
    } catch (error) {
      return false;
    }

    return true;
  }

  validate(value: string) {
    return this.isValidXML(value);
  }

  get isMandatoryConstraint() {
    return false;
  }
}

export default XMLConstraint;
