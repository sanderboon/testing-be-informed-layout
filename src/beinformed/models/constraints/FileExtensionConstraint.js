// @flow

import type { FiletypeConstraintsType } from "beinformed/models/attributes/UploadAttributeModel";

class FileExtensionConstraint implements IConstraintModel {
  _filetypeConstraints: FiletypeConstraintsType;

  constructor(filetypeConstraints: FiletypeConstraintsType) {
    this._filetypeConstraints = filetypeConstraints;
  }

  get id() {
    return "Constraint.File.InvalidExtension";
  }

  get extensions() {
    return this._filetypeConstraints
      .map((filetypeConstraint) => filetypeConstraint.extensions.join(", "))
      .join(", ");
  }

  hasValidation() {
    return false;
  }

  get defaultMessage() {
    return "Allowed extensions are: ${extensions}"; // NOSONAR
  }

  get parameters() {
    return { extensions: this.extensions };
  }

  validate() {
    return true;
  }

  get isMandatoryConstraint() {
    return false;
  }
}

export default FileExtensionConstraint;
