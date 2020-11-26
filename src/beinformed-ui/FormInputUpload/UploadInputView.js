// @flow
import classNames from "classnames";

import {
  ExceededMaximumError,
  FilesUploaded,
  UploadField,
} from "_component-registry/input";

import type { FilesType } from "beinformed/models/attributes/UploadAttributeModel";
export type Props = {
  +className?: string,
  +id?: string,
  +name: string,
  +placeholder?: string,
  +ariaLabel?: string,
  +ariaLabelledBy?: string,
  +isMultiple: boolean,
  +isReadonly?: boolean,
  +isDisabled?: boolean,
  +inError?: boolean,
  +accept: Array<string>,
  +files: FilesType,
  +filesExceedMaximum: number,
  +maxFileSize?: ?number,
  +maxTotalFileSize?: ?number,
  +onUpload: Function,
  +onRemove: Function,
  +onBlur: Function,
  +onFocus: Function,
};

const UploadInputView = ({
  className,
  id,
  name,
  inError,
  placeholder,
  ariaLabel,
  ariaLabelledBy,
  isMultiple,
  isReadonly,
  isDisabled,
  accept,
  files,
  filesExceedMaximum = -1,
  maxFileSize,
  maxTotalFileSize,
  onUpload,
  onRemove,
  onBlur,
  onFocus,
}: Props) => {
  const shouldRenderInput = isMultiple || Object.keys(files).length === 0;
  return (
    <div className={classNames("upload-input", className)}>
      <FilesUploaded
        files={files}
        maxFileSize={maxFileSize}
        onRemove={onRemove}
      />
      {shouldRenderInput && (
        <UploadField
          id={id}
          name={name}
          placeholder={placeholder}
          ariaLabel={ariaLabel}
          ariaLabelledBy={ariaLabelledBy}
          isMultiple={isMultiple}
          isReadonly={isReadonly}
          isDisabled={isDisabled}
          inError={inError || filesExceedMaximum > -1}
          accept={accept}
          onUpload={onUpload}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      )}

      {filesExceedMaximum > -1 && (
        <ExceededMaximumError
          filesExceedMaximum={filesExceedMaximum}
          fileSize={maxFileSize}
          maxTotalFileSize={maxTotalFileSize}
        />
      )}
    </div>
  );
};
UploadInputView.displayName = "BI.UploadInputView";

export default UploadInputView;
