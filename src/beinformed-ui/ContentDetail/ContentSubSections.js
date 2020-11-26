// @flow
import { ContentSubSection } from "_component-registry/content";

import type {
  ContentLinkModel,
  Href,
  SubSectionModel,
} from "beinformed/models";
export type Props = {
  +className?: string,
  +highlightSections: Array<ContentLinkModel>,
  +renderSectionLabel?: boolean,
  +sourceHref: Href,
  +subSections: Array<SubSectionModel>,
  +onContentClick?: Function,
};

/**
 * Content sub sections, recursevily
 */
const ContentSubSections = ({
  className,
  subSections,
  highlightSections,
  renderSectionLabel,
  sourceHref,
  onContentClick,
}: Props) => (
  <div className={className}>
    {subSections.map((subSection) => (
      <ContentSubSection
        key={subSection.key}
        subSection={subSection}
        highlightSections={highlightSections}
        renderSectionLabel={renderSectionLabel}
        sourceHref={sourceHref}
        onContentClick={onContentClick}
      />
    ))}
  </div>
);

ContentSubSections.displayName = "BI.ContentSubSections";

export default ContentSubSections;
