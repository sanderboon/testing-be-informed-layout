// @flow
import { Component } from "react";

import { withTheme } from "styled-components";

import { Link } from "_component-registry/link";

import type { SourceReferenceModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +sourceReference: SourceReferenceModel,
  +theme: any,
};

class ContentSubSectionLink extends Component<Props> {
  getSectionElement() {
    const { sourceReference } = this.props;
    return document.querySelector(
      `[data-ref="${sourceReference.referenceHash}"]`
    );
  }

  handleSectionClick = () => {
    const subSectionElement = this.getSectionElement();

    if (subSectionElement) {
      subSectionElement.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  };

  handleMouseHover = (colorPropertyName) => {
    const subSectionElement = this.getSectionElement();

    if (subSectionElement) {
      const color = this.props.theme[colorPropertyName] || "#ffc";

      subSectionElement.style.backgroundColor = color;
      subSectionElement.style.outlineColor = color;
    }
  };

  handleMouseEnter = () =>
    this.handleMouseHover("CONTENT_SUBSECTION_HIGHLIGHT_BG_HOVER");

  handleMouseLeave = () =>
    this.handleMouseHover("CONTENT_SUBSECTION_HIGHLIGHT_BG");

  render() {
    const { className, sourceReference } = this.props;

    return (
      <Link
        className={className}
        href={sourceReference.link.selfhref}
        onClick={this.handleSectionClick}
        onEnter={this.handleMouseEnter}
        onLeave={this.handleMouseLeave}
      >
        {sourceReference.label}
      </Link>
    );
  }
}

ContentSubSectionLink.displayName = "BI.ContentSubSectionLinks";

export default withTheme(ContentSubSectionLink);
