// @flow
import styled from "styled-components";
import { roundedCorners, spacer, themeProp } from "beinformed/theme/utils";

import { ContentLink } from "_component-registry/content";

import type { ContentIndexModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +contentIndex: ContentIndexModel,
};

const StyledResults = styled.div`
  margin: ${spacer()} 367px ${spacer()} 0;
  padding: ${spacer()};
  background: ${themeProp("WHITE")};
  ${roundedCorners()};
  border: ${themeProp("INPUT_BORDER_WIDTH", "1px")} solid
    ${themeProp("INPUT_BORDER_COLOR", "#ced4da")};
`;

const StyledList = styled.ul`
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
  max-height: 350px;
  overflow: auto;
`;

const StyledResultPlaceholder = styled.div`
  max-height: 350px;
`;

const ContentIndexFilterResults = ({ className, contentIndex }: Props) => {
  if (contentIndex.items.hasItems) {
    return (
      <StyledResults className={className}>
        <StyledList className="catalog-index">
          {contentIndex.items.map((content) => (
            <ContentLink key={content.key} link={content} />
          ))}
        </StyledList>
      </StyledResults>
    );
  }

  return (
    <StyledResultPlaceholder className={className}>
      &nbsp;
    </StyledResultPlaceholder>
  );
};

ContentIndexFilterResults.displayName = "BI.ContentIndexFilterResults";

export default ContentIndexFilterResults;
