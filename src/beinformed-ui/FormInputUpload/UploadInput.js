// @flow
import { useState, useRef } from "react";
import { get, omit } from "lodash";

import {
  getAcceptedFiles,
  getExceededMaximum,
  isNotAllowedFileType,
  uploadFile,
} from "./_util";

import { UploadInputView } from "_component-registry/input";

import type {
  FilesType,
  FiletypeConstraintsType,
  FilesizeConstraintsType,
} from "beinformed/models/attributes/UploadAttributeModel";

export type Props = {
  +ariaLabel?: string,
  +ariaLabelledBy?: string,
  +className?: string,
  +disabled?: boolean,
  +id?: string,
  +isMultiple: boolean,
  +name: string,
  +placeholder?: string,
  +readOnly?: boolean,
  +inError?: boolean,
  +uploadConstraints: {
    fileTypes: FiletypeConstraintsType,
    maxFileSize: FilesizeConstraintsType,
  },
  +value: string,
  +initialFiles: FilesType,
  +onBlur?: () => void,
  +onValueChange: (value: any) => void,
  +onFocus?: (e: SyntheticInputEvent<HTMLTextAreaElement>) => void,
};

const REMOVE_UPLOAD_ERROR_TIMEOUT = 5000;

const getInitialFiles = (value, initialFiles) => {
  if (Object.keys(initialFiles).length > 0) {
    return initialFiles;
  }

  if (value) {
    return { [value]: { name: value, progress: 100 } };
  }

  return {};
};

const UploadInput = ({
  className,
  id,
  name,
  value,
  initialFiles,
  inError,
  placeholder,
  ariaLabel,
  ariaLabelledBy,
  isMultiple,
  readOnly,
  disabled,
  uploadConstraints,
  onValueChange,
  onBlur,
  onFocus,
}: Props) => {
  const [files, setFiles] = useState(getInitialFiles(value, initialFiles));

  const [filesExceedMaximum, setFilesExceedMaximum] = useState(-1);
  const filesRef = useRef(files);
  filesRef.current = files;

  const handleChange = () => {
    onValueChange(JSON.stringify(filesRef.current));

    if (onBlur) {
      onBlur();
    }
  };

  /**
   * Remove an upload in progress or a finished upload
   */
  const handleRemoveUpload = (file) => {
    if (filesRef.current[file.name]) {
      const newFiles = omit(filesRef.current, file.name);
      setFiles(newFiles);
      filesRef.current = newFiles;
      handleChange();
    }
  };

  const updateFileState = (file, uploadInfo = {}) => {
    const newFiles = {
      ...filesRef.current,
      [file.name]: {
        ...filesRef.current[file.name],
        name: file.name,
        size: file.size,
        ...uploadInfo,
      },
    };

    filesRef.current = newFiles;
    setFiles(newFiles);

    if (uploadInfo.error) {
      setTimeout(() => {
        handleRemoveUpload(file);
      }, REMOVE_UPLOAD_ERROR_TIMEOUT);
    }
  };

  const handleFile = (file: File, maxFileSize: number) => {
    if (maxFileSize > -1 && file.size > maxFileSize) {
      updateFileState(file, { error: "errorExceedsMaxFileSize" });
    } else if (isNotAllowedFileType(uploadConstraints.fileTypes, file)) {
      updateFileState(file, { error: "errorExtensionNotAllowed" });
    } else {
      uploadFile(file, updateFileState).then((response) => {
        updateFileState(file, {
          progress: 100,
          token: response.token,
        });

        handleChange();
      });
    }
  };

  const handleUpload = (uploadedFiles: FileList) => {
    const exceededMaximum = getExceededMaximum(
      uploadConstraints.maxFileSize,
      uploadedFiles
    );

    if (exceededMaximum > -1) {
      setFilesExceedMaximum(exceededMaximum);
    } else {
      const maxFileSize = get(uploadConstraints, "maxFileSize.fileSize", -1);

      Array.from(uploadedFiles).forEach((file) =>
        handleFile(file, maxFileSize)
      );
    }
  };

  const accept = getAcceptedFiles(uploadConstraints.fileTypes);

  return (
    <UploadInputView
      className={className}
      id={id}
      name={name}
      inError={inError}
      placeholder={placeholder}
      ariaLabel={ariaLabel}
      ariaLabelledBy={ariaLabelledBy}
      isMultiple={isMultiple}
      isReadonly={readOnly}
      isDisabled={disabled}
      accept={accept}
      files={files}
      filesExceedMaximum={filesExceedMaximum}
      maxFileSize={uploadConstraints.maxFileSize.fileSize}
      maxTotalFileSize={uploadConstraints.maxFileSize.maxTotalFileSize}
      onUpload={handleUpload}
      onRemove={handleRemoveUpload}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
};
UploadInput.displayName = "BI.UploadInput";

export default UploadInput;
