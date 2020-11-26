// @flow
import classNames from "classnames";
import styled from "styled-components";
import {
  themeProp,
  roundedCorners,
  spacers,
  spacer,
} from "beinformed/theme/utils";

import { BASE } from "beinformed/constants/Constants";

import { Heading } from "_component-registry/elements";

import type { ContentTOCModel } from "beinformed/models";
export type Props = { +className?: string, +contentTOC: ContentTOCModel };

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${themeProp("GREY_100")};

  padding: ${spacer(1.3)};
  margin: ${spacers(0.5, 0, 2)};

  ${roundedCorners()};
  box-shadow: ${themeProp("PANEL_SHADOW")};
`;

const StyledText = styled.div`
  margin-left: ${spacer(1.5)};
`;

const StyledLabel = styled(Heading)`
  font-size: ${themeProp("FONT_SIZE_H4")};
  font-weight: ${themeProp("HEADING_FONT_WEIGHT")};
  color: ${themeProp("HEADER_COLOR")};
`;

const StyledIcon = styled.img`
  width: auto;
  height: 36px;
  margin-top: ${spacer(0.5)};
`;

const StyledContentType = styled.small`
  font-size: ${themeProp("FONT_SIZE_BASE")};
`;

/**
 * Content header
 */
const ContentTOCHeader = ({ className, contentTOC }: Props) => (
  <StyledHeader className={classNames("content-header", className)}>
    {contentTOC.contentType && contentTOC.contentType.icon && (
      <StyledIcon
        className="content-icon"
        src={`${BASE}${contentTOC.contentType.icon}`}
        alt={`Icon of ${contentTOC.contentType.label}`}
      />
    )}
    <StyledText>
      <StyledLabel className="content-label">{contentTOC.label}</StyledLabel>
      {contentTOC.contentType && (
        <StyledContentType className="content-type">
          {contentTOC.contentType.label}
        </StyledContentType>
      )}
    </StyledText>
  </StyledHeader>
);

ContentTOCHeader.displayName = "BI.ContentTOCHeader";

export default ContentTOCHeader;
