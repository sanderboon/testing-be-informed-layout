// @flow
import filesize from "file-size";
import styled from "styled-components";

import { Message } from "beinformed/i18n";
import { themeProp } from "beinformed/theme/utils";

import { getFileExtension } from "./_util";

export type Props = {
  +file: Object,
  +maxFileSize?: ?number,
};

const StyledError = styled.small`
  color: ${themeProp("INPUT_ERROR_COLOR", "#dc3545")};
  font-size: 80%;
`;

const FilesUploadedErrorMessage = ({ file, maxFileSize }: Props) => {
  if (file.error === "errorExceedsMaxFileSize") {
    return (
      <StyledError className="constraint-message">
        <Message
          id="UploadInput.errorExceedsMaxFileSize"
          defaultMessage="Filesize of {ACTUAL_FILESIZE} exceeds the maximum filesize of {MAXIMUM_FILESIZE}"
          data={{
            ACTUAL_FILESIZE: filesize(file.size).human("jedec"),
            MAXIMUM_FILESIZE: filesize(maxFileSize).human("jedec"),
          }}
        />
      </StyledError>
    );
  }

  if (file.error === "") {
    const fileExtension = getFileExtension(file);
    return (
      <StyledError className="constraint-message">
        <Message
          id="UploadInput.errorExtensionNotAllowed"
          defaultMessage="File with extension {EXTENSION} is not allowed"
          data={{
            EXTENSION: fileExtension,
          }}
        />
      </StyledError>
    );
  }

  return null;
};

FilesUploadedErrorMessage.displayName = "BI.FilesUploadedErrorMessage";

export default FilesUploadedErrorMessage;
