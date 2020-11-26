// @flow
import { isString, isUndefined } from "lodash";

import ConstraintCollection from "beinformed/models/constraints/ConstraintCollection";
import StringAttributeModel from "beinformed/models/attributes/StringAttributeModel";
import FileExtensionConstraint from "beinformed/models/constraints/FileExtensionConstraint";
import FileSizeConstraint from "beinformed/models/constraints/FileSizeConstraint";
import type { AttributeType } from "beinformed/models";

export type FileEntryType = {
  name: string,
  size?: number,
  progress: number,
  error?: string,
  token?: string,
};

export type FilesType = {
  [filename: string]: FileEntryType,
};

export type FiletypeConstraintsType = Array<{|
  extensions: Array<string>,
  mimeTypes: Array<string>,
|}>;

export type FilesizeConstraintsType = {
  fileSize: ?number,
  maxTotalFileSize: ?number,
  isMaxTotal: boolean,
};

const UNCHANGED = "UNCHANGED";

/**
 * Upload attribute
 */
export default class UploadAttributeModel extends StringAttributeModel {
  _files: FilesType;
  _initialTotalFileSize: number;
  _maxTotalFileSize: number;

  static isApplicableModel(contributions: Object) {
    return contributions.type === "binary";
  }

  get type() {
    return "upload";
  }

  /**
   * Retrieve single or multi upload
   */
  get multiple() {
    return this.contributions.multiple || false;
  }

  get initialTotalFileSize() {
    return this._initialTotalFileSize || 0;
  }

  set initialTotalFileSize(initialTotalFileSize: number) {
    this._initialTotalFileSize = initialTotalFileSize;
  }

  get maxTotalFileSize() {
    return this._maxTotalFileSize;
  }

  set maxTotalFileSize(maxTotalFileSize: number) {
    this._maxTotalFileSize = maxTotalFileSize;
  }

  get currentFilesize() {
    return this.initialTotalFileSize + this.uploadedFileSize;
  }

  get maxFileSize() {
    if (this.maxTotalFileSize) {
      const uploadMaxFileSize = this.maxTotalFileSize - this.currentFilesize;
      if (uploadMaxFileSize < 0) {
        return 0;
      }

      return uploadMaxFileSize;
    }

    return this.contributions.uploadMaxFileSize;
  }

  get uploadedFileSize() {
    if (Object.keys(this.files).length === 0) {
      return 0;
    }

    let accumulatedFileSize = 0;
    Object.keys(this.files).forEach((fileName) => {
      const file = this.files[fileName];
      if (file.size) {
        accumulatedFileSize += file.size;
      }
    });
    return accumulatedFileSize;
  }

  /**
   * Upload constraints
   */
  get uploadConstraints() {
    const mimeTypes = this.contributions.allowedMimeTypes
      ? this.contributions.allowedMimeTypes.filter(
          (mimeType) => mimeType !== "[...]"
        )
      : [];
    const extensions = this.contributions.allowedExtensions
      ? this.contributions.allowedExtensions.filter(
          (extension) => extension !== "[...]"
        )
      : [];

    const fileTypes: FiletypeConstraintsType = extensions.map((extension) => ({
      extensions: [extension],
      mimeTypes,
    }));

    return {
      fileTypes,
      maxFileSize: {
        fileSize: this.maxFileSize,
        maxTotalFileSize: this.maxTotalFileSize,
        isMaxTotal: !isUndefined(this.maxTotalFileSize),
      },
    };
  }

  /**
   * Add upload constraints
   */
  addConstraints() {
    const constraints = new ConstraintCollection();

    if (this.uploadConstraints.fileTypes.length > 0) {
      constraints.add(
        new FileExtensionConstraint(this.uploadConstraints.fileTypes)
      );
    }

    const hasFilesizeConstraint =
      this.uploadConstraints.maxFileSize.isMaxTotal ||
      !isUndefined(this.uploadConstraints.maxFileSize.fileSize);

    if (hasFilesizeConstraint) {
      constraints.add(
        new FileSizeConstraint(this.uploadConstraints.maxFileSize)
      );
    }

    return constraints;
  }

  get files() {
    return this._files || {};
  }

  set files(files: FilesType) {
    this._files = files;
  }

  /**
   * Update the attribute
   */
  update(value: string) {
    if (!value) {
      return this;
    }

    // parse to json and handle uploaded file
    // when the input value is a string but not json,
    // we assume that it is just a list of uploaded tokens and copy it as input value
    try {
      const files = JSON.parse(value);
      this.files = files;

      this.inputvalue = Object.keys(files)
        .map((fileName) => files[fileName].token)
        .join(",");
    } catch (error) {
      if (isString(value)) {
        this.inputvalue = value;
      }
    }

    this.updateLastModification();

    return this;
  }

  get readonlyvalue() {
    if (this.initvalue) {
      return this.initvalue.toString();
    }

    return "";
  }

  /**
   * Getting the value of the attribute, return unchanged when the uploaded file has not changed
   */
  getValue() {
    if (!this.hasValue()) {
      return null;
    }

    if (this.initvalue === this.inputvalue) {
      return UNCHANGED;
    }

    return this._value;
  }

  mergeAttribute(withAttribute: AttributeType) {
    if (
      withAttribute instanceof UploadAttributeModel &&
      withAttribute.isValid &&
      withAttribute.inputvalue !== null
    ) {
      this.update(JSON.stringify(withAttribute.files));
    }
  }
}
