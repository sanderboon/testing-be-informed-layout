// @flow
import { isUndefined } from "lodash";
import filesize from "file-size";

import type { FilesizeConstraintsType } from "beinformed/models/attributes/UploadAttributeModel";

class FileSizeConstraint implements IConstraintModel {
  _filesizeConstraint: FilesizeConstraintsType;

  constructor(filesizeConstraint: FilesizeConstraintsType) {
    this._filesizeConstraint = filesizeConstraint;
  }

  get id() {
    if (this.filesizeConstraint.isMaxTotal) {
      return "Constraint.File.MaxTotalFileSize";
    } else if (!isUndefined(this.filesizeConstraint.fileSize)) {
      return "Constraint.File.MaxFileSize";
    }

    return "";
  }

  get filesizeConstraint() {
    return this._filesizeConstraint;
  }

  hasValidation() {
    return false;
  }

  get defaultMessage() {
    if (this.id === "Constraint.File.MaxTotalFileSize") {
      return "{filesize-left} van {max-total-filesize} over van totaal toegestaan upload bestandsgrootte"; // NOSONAR
    } else if (this.id === "Constraint.File.MaxFileSize") {
      return "Maximale bestandsgroote is ${max-filesize}"; // NOSONAR
    }

    return "";
  }

  get filesize() {
    return filesize(this.filesizeConstraint.fileSize).human("jedec");
  }

  get maxTotalFileSize() {
    return filesize(this.filesizeConstraint.maxTotalFileSize).human("jedec");
  }

  get parameters() {
    if (this.id === "Constraint.File.MaxTotalFileSize") {
      return {
        "filesize-left": this.filesize,
        "max-total-filesize": this.maxTotalFileSize,
      };
    } else if (this.id === "Constraint.File.MaxFileSize") {
      return {
        "max-filesize": this.filesize,
      };
    }

    return {};
  }

  validate() {
    return true;
  }

  get isMandatoryConstraint() {
    return false;
  }
}

export default FileSizeConstraint;
