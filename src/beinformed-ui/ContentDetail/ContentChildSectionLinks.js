// @flow
import classNames from "classnames";
import styled from "styled-components";
import { themeProp, spacer } from "beinformed/theme/utils";

import { ContentLink } from "_component-registry/content";

import type { ContentLinkModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +childSectionLinks: Array<ContentLinkModel>,
};

const StyledList = styled.ul`
  padding-left: 0;
  list-style: none;
  margin-bottom: ${spacer()};

  a {
    color: ${themeProp("PRIMARY_LINK_COLOR")};
  }
`;

/**
 * Content child section links
 */
const ContentChildSectionLinks = ({ className, childSectionLinks }: Props) => (
  <div className={classNames("content-childsection-links", className)}>
    <StyledList>
      {childSectionLinks.map((childSection: ContentLinkModel) => (
        <ContentLink key={childSection.key} link={childSection} />
      ))}
    </StyledList>
  </div>
);

ContentChildSectionLinks.displayName = "BI.ContentChildSectionLinks";

export default ContentChildSectionLinks;
