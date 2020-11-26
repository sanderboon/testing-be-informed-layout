// @flow
import classNames from "classnames";
import styled from "styled-components";
import { spacer } from "beinformed/theme/utils";

import { ContentLink } from "_component-registry/content";

import type { ContentTOCModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +contentTOC: ContentTOCModel,
};

const StyledList = styled.ul`
  padding-left: 0;
  list-style: none;
  margin-bottom: ${spacer()};
`;

const ContentTOC = ({ className, contentTOC }: Props) => (
  <StyledList className={classNames("content-toc", className)}>
    {contentTOC.items.map((link) => (
      <ContentLink key={link.key} link={link} isTOC>
        {link.items && <ContentTOC contentTOC={link} />}
      </ContentLink>
    ))}
  </StyledList>
);

ContentTOC.displayName = "BI.ContentTOC";

export default ContentTOC;
