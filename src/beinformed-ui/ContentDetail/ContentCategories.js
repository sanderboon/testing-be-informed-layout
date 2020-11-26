// @flow
import classNames from "classnames";
import styled from "styled-components";
import { spacer } from "beinformed/theme/utils";

import { ContentLink } from "_component-registry/content";

import type { ContentModel, ContentTOCModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +contentDetail?: ContentModel,
  +contentTOC: ContentTOCModel,
};

const StyledList = styled.ul`
  padding-left: 0;
  list-style: none;
  margin-bottom: ${spacer()};
`;

/**
 * Check if category is acteive
 */
const isActiveHref = (itemHref, detail) =>
  detail && detail.selfhref ? itemHref.equals(detail.selfhref) : false;

/**
 * Content categories
 */
const ContentCategories = ({ className, contentDetail, contentTOC }: Props) => (
  <StyledList className={classNames("content-categories", className)}>
    {contentTOC.categories.map((content) => (
      <ContentLink
        key={content.key}
        link={content}
        isActive={isActiveHref(content.selfhref, contentDetail)}
      />
    ))}
  </StyledList>
);

ContentCategories.displayName = "BI.ContentCategories";

export default ContentCategories;
