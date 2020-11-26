// @flow
import classNames from "classnames";
import styled from "styled-components";
import { spacers, spacer } from "beinformed/theme/utils";

import filesize from "file-size";

import { Message } from "beinformed/i18n";

import { Button } from "_component-registry/buttons";
import {
  ProgressBar,
  FilesUploadedErrorMessage,
  FilesUploadedIcon,
} from "_component-registry/input";

import type {
  FilesType,
  FileEntryType,
} from "beinformed/models/attributes/UploadAttributeModel";

export type Props = {
  +className?: string,
  +files: FilesType,
  +maxFileSize?: ?number,
  +onRemove: (file: FileEntryType) => void,
};

const StyledList = styled.ul`
  padding-left: 0;
  list-style: none;
  margin-bottom: 0;
`;

const StyledListItem = styled.li`
  margin-bottom: ${spacer(0.25)};
`;

const StyledFilename = styled.span`
  margin-right: ${spacer(0.25)};
`;

const StyledFilesize = styled.small`
  font-size: 80%;
`;

const StyledButton = styled(Button)`
  padding: 0;
  line-height: 1;
  margin: ${spacers(0, 0.5)};
`;

const MAX_PROGRESS = 100;
const MIN_PROGRESS = 0;

const FilesUploaded = ({ className, files, maxFileSize, onRemove }: Props) => {
  if (Object.keys(files).length === 0) {
    return null;
  }

  return (
    <StyledList className={classNames("files-uploaded", className)}>
      {Object.keys(files).map((key) => {
        const file = files[key];

        return (
          <StyledListItem
            key={file.name}
            className="file"
            data-id={file.name}
            data-progress={file.progress}
          >
            <StyledFilename className="filename">{file.name}</StyledFilename>
            {file.size && (
              <StyledFilesize className="filesize">
                ({filesize(file.size).human("jedec")})
              </StyledFilesize>
            )}

            <StyledButton
              name="removeFile"
              buttonStyle="LINK"
              isIconButton
              onClick={() => onRemove(file)}
            >
              <FilesUploadedIcon file={file} />
              <Message
                id="UploadInput.removeFile"
                defaultMessage="Remove file"
                screenreaderOnly
              />
            </StyledButton>
            {file.error && (
              <FilesUploadedErrorMessage
                file={file}
                maxFileSize={maxFileSize}
              />
            )}
            {file.progress > MIN_PROGRESS && file.progress < MAX_PROGRESS && (
              <ProgressBar progress={file.progress} />
            )}
          </StyledListItem>
        );
      })}
    </StyledList>
  );
};

FilesUploaded.displayName = "BI.FilesUploaded";

export default FilesUploaded;
