// @flow
import classNames from "classnames";

import {
  ContentBody,
  ContentSubSections,
  ContentChildSections,
  ContentChildSectionLinks,
} from "_component-registry/content";

import type { ContentModel, ContentLinkModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +contentDetail: ContentModel,
  +highlightSections?: Array<ContentLinkModel>,
  +renderChildSections?: boolean,
  +renderSectionLabel?: boolean,
  +onContentClick?: Function,
};

/**
 * Render content sections and bodies
 */
const ContentSections = ({
  className,
  contentDetail,
  highlightSections = [],
  renderChildSections = true,
  renderSectionLabel = true,
  onContentClick,
}: Props) => (
  <div
    className={classNames(className, "content-sections")}
    data-ref={contentDetail.referenceHash}
  >
    {(contentDetail.body || contentDetail.label || contentDetail.number) && (
      <ContentBody
        body={contentDetail.body}
        label={contentDetail.label}
        number={contentDetail.number}
        sourceHref={contentDetail.selfhref}
        renderSectionLabel={renderSectionLabel}
        onContentClick={onContentClick}
      />
    )}

    {contentDetail.subSections.length > 0 && (
      <ContentSubSections
        subSections={contentDetail.subSections}
        sourceHref={contentDetail.selfhref}
        highlightSections={highlightSections}
        renderSectionLabel={renderSectionLabel}
        onContentClick={onContentClick}
      />
    )}

    {renderChildSections && contentDetail.childSections.length > 0 && (
      <ContentChildSections
        childSections={contentDetail.childSections}
        renderSectionLabel={renderSectionLabel}
      />
    )}

    {renderChildSections && contentDetail.childSectionLinks.length > 0 && (
      <ContentChildSectionLinks
        childSectionLinks={contentDetail.childSectionLinks}
      />
    )}
  </div>
);
ContentSections.displayName = "BI.ContentSections";

export default ContentSections;
