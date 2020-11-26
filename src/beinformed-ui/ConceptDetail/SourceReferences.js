// @flow
import { Fragment, Component } from "react";
import classNames from "classnames";

import styled from "styled-components";
import { themeProp, spacer } from "beinformed/theme/utils";

import { withModularUI } from "beinformed/modularui";
import { Href } from "beinformed/models";

import { Message } from "beinformed/i18n";

import {
  ContentSections,
  ContentSubSectionLinks,
} from "_component-registry/content";
import { Link } from "_component-registry/link";
import { SourceLabel } from "_component-registry/concept";

const StyledContentSections = styled(ContentSections)`
  h4.label {
    font-size: ${themeProp("FONT_SIZE_BASE")};
    font-weight: ${themeProp("FONT_WEIGHT_BASE")};
    color: ${themeProp("HEADER_COLOR")};
  }
`;

const StyledLink = styled.div`
  margin-bottom: ${spacer()};
  font-style: italic;
  font-size: ${themeProp("FONT_SIZE_SMALL")};
`;

import type {
  SourceReferenceCollection,
  ContentModel,
} from "beinformed/models";
export type Props = {
  +className?: string,
  +sourceReferences: SourceReferenceCollection,
  +renderSectionLabel?: boolean,
  +renderChildSections?: boolean,
  +renderGotoSourceLink?: boolean,
  +modularui: Function,
  +handleError: (err: Error) => void,
  +startProgress: () => void,
  +finishProgress: () => void,
};

type State = {
  isFetching: boolean,
  content: Array<ContentModel>,
};

class SourceReferences extends Component<Props, State> {
  state: State = {
    isFetching: false,
    content: [],
  };

  static defaultProps = {
    renderChildSections: false,
    renderSectionLabel: true,
    renderGotoSourceLink: false,
  };

  componentDidMount() {
    this.fetchContent();
  }

  fetchContent() {
    if (!this.state.isFetching) {
      const {
        sourceReferences,
        modularui,
        renderChildSections,
        startProgress,
        finishProgress,
        handleError,
      } = this.props;

      const requests = sourceReferences
        .map((sourceReference) => sourceReference.link.selfhref.absolutehref)
        .filter((href, index, self) => self.indexOf(href) === index)
        .map((href) => modularui(href).fetchContent(renderChildSections));

      startProgress();
      Promise.all(requests)
        .then((content) => {
          this.setState({
            isFetching: false,
            content,
          });

          return finishProgress();
        })
        .catch(handleError);
    }
  }

  render() {
    if (this.state.content.length > 0) {
      const {
        className,
        sourceReferences,
        renderSectionLabel,
        renderChildSections,
        renderGotoSourceLink,
      } = this.props;

      return (
        <div className={classNames("source-references", className)}>
          {sourceReferences
            .map((sourceReference) => sourceReference.sourceLabel)
            .filter(
              (sourceLabel, index, self) => self.indexOf(sourceLabel) === index
            )
            .map((sourceLabel) => {
              const sourceRefs = sourceReferences.filter(
                (sourceReference) => sourceReference.sourceLabel === sourceLabel
              );

              const highlightSections = sourceRefs.map(
                (sourceRef) => sourceRef.link
              );

              return (
                <div key={`sourcelabel-${sourceLabel}`} className="source">
                  {renderSectionLabel && [
                    <SourceLabel
                      key="source-label"
                      sourceLabel={sourceLabel}
                      contentTypeHref={sourceRefs[0].link.contentTypeHref}
                    />,
                    <ContentSubSectionLinks
                      key="source-refs"
                      sourceReferences={sourceRefs}
                    />,
                  ]}

                  {sourceRefs
                    .map((sourceRef) => sourceRef.selfhref.path)
                    .filter(
                      (sourceRef, index, self) =>
                        self.indexOf(sourceRef) === index
                    )
                    .map((sourceRef) => {
                      const contentModel = this.state.content.find((content) =>
                        content.selfhref.equals(sourceRef)
                      );

                      if (contentModel) {
                        const contentSections = (
                          <StyledContentSections
                            key={`contentModel-${contentModel.id}`}
                            contentDetail={contentModel}
                            renderChildSections={renderChildSections}
                            renderSectionLabel={renderSectionLabel}
                            highlightSections={highlightSections}
                          />
                        );

                        if (renderGotoSourceLink) {
                          return (
                            <Fragment key={`contentModel-${contentModel.id}`}>
                              {contentSections}
                              <StyledLink className="goto-source">
                                <Link
                                  href={
                                    new Href(
                                      `/modelcatalog${contentModel.selfContentLink.encodedHref.toString()}`
                                    )
                                  }
                                  dataId={contentModel.id}
                                >
                                  <Message id="SourceReferences.GotoSource">
                                    Go to source reference
                                  </Message>
                                </Link>
                              </StyledLink>
                            </Fragment>
                          );
                        }

                        return contentSections;
                      }

                      return null;
                    })}
                </div>
              );
            })}
        </div>
      );
    }

    return null;
  }
}

SourceReferences.displayName = "BI.SourceReferences";

export default withModularUI(SourceReferences);
