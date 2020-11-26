// @flow
import filesize from "file-size";

import classNames from "classnames";
import styled from "styled-components";
import { themeProp } from "beinformed/theme/utils/themeProps";

import { Icon } from "_component-registry/icon";
import { Message } from "beinformed/i18n";

const StyledExceedErrorList = styled.ul`
  margin-bottom: 0;
  font-size: 80%;
  padding-left: 0;
  list-style: none;
`;
const StyledExceedError = styled.li`
  color: ${themeProp("INPUT_ERROR_COLOR", "#dc3545")};
`;

export type Props = {
  +className?: string,
  +filesExceedMaximum: ?number,
  +fileSize?: ?number,
  +maxTotalFileSize?: ?number,
};

const ExceededMaximumError = ({
  className,
  filesExceedMaximum,
  fileSize,
  maxTotalFileSize,
}: Props) => {
  const messageData = {
    "total-filesize": filesize(filesExceedMaximum).human("jedec"),
    "max-filesize-left": filesize(fileSize).human("jedec"),
    "max-total-filesize": filesize(maxTotalFileSize).human("jedec"),
  };

  return (
    <StyledExceedErrorList className={classNames(className, "input-assistant")}>
      <StyledExceedError className="constraint-message">
        <Icon name="alert-circle-outline" textAfter />
        <Message
          id="Constraint.File.MaxTotalFileSizeExceeded"
          defaultMessage={
            "Filesize of {total-filesize} exceeds the filesize of {max-filesize-left}"
          }
          data={messageData}
        />
      </StyledExceedError>
    </StyledExceedErrorList>
  );
};
ExceededMaximumError.displayName = "BI.ExceededMaximumError";

export default ExceededMaximumError;
