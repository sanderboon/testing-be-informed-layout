// @flow
import { Component } from "react";

import styled, { css } from "styled-components";
import { themeProp, spacer } from "beinformed/theme/utils";

import { ContentBody, ContentSubSections } from "_component-registry/content";

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
  +subSection: SubSectionModel,
  +onContentClick?: Function,
};

const StyledSubSection = styled.div`
  ${({ isHighlighted }) =>
    isHighlighted &&
    css`
      color: ${themeProp("CONTENT_SUBSECTION_HIGHLIGHT_COLOR")};
      background-color: ${themeProp("CONTENT_SUBSECTION_HIGHLIGHT_BG")};
      outline: 8px solid ${themeProp("CONTENT_SUBSECTION_HIGHLIGHT_BG")};
    `};

  margin-top: ${spacer(0.5)};
`;

/**
 * Render single content sub section
 */
class ContentSubSection extends Component<Props> {
  get isHighlighted() {
    const { highlightSections, subSection } = this.props;

    if (highlightSections) {
      const subSectionHref = subSection.selfhref;

      return highlightSections.some(
        (sectionLink) =>
          subSectionHref !== null &&
          sectionLink.selfhref.equals(subSectionHref) &&
          sectionLink.selfhref.hash === subSectionHref.hash
      );
    }

    return false;
  }

  render() {
    const {
      className,
      highlightSections,
      sourceHref,
      subSection,
      renderSectionLabel,
      onContentClick,
    } = this.props;

    return (
      <StyledSubSection
        key={subSection.key}
        className={className}
        isHighlighted={this.isHighlighted}
        data-ref={subSection.referenceHash}
      >
        <ContentBody
          number={subSection.number}
          label={subSection.label}
          body={subSection.body}
          sourceHref={sourceHref}
          renderSectionLabel={renderSectionLabel}
          onContentClick={onContentClick}
        />
        {subSection.subSections.length > 0 && (
          <ContentSubSections
            subSections={subSection.subSections}
            sourceHref={sourceHref}
            highlightSections={highlightSections}
            onContentClick={onContentClick}
          />
        )}
      </StyledSubSection>
    );
  }
}

ContentSubSection.displayName = "BI.ContentSubSection";

export default ContentSubSection;
