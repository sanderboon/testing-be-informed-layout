// @flow
import classNames from "classnames";
import styled from "styled-components";
import { themeProp } from "beinformed/theme/utils";

import { Heading } from "_component-registry/elements";
import { Message } from "beinformed/i18n";

import { Helmet } from "react-helmet-async";
import { Switch, Redirect, Route } from "react-router-dom";

import {
  ContentCategories,
  ContentTOC,
  ContentTOCHeader,
} from "_component-registry/content";
import { ConnectedContentDetailSection } from "_component-registry/modelcatalog";
import { Row, Column } from "_component-registry/grid";

import type { ContentTOCModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +contentTOC: ContentTOCModel,
  +entryDate: string,
};

const StyledHeading = styled(Heading)`
  font-size: ${themeProp("FONT_SIZE_H4")};
  font-weight: ${themeProp("HEADING_FONT_WEIGHT")};
  color: ${themeProp("HEADER_COLOR")};
`;

/**
 * Render Content details
 */
const ContentDetail = ({ className, contentTOC, entryDate }: Props) =>
  contentTOC ? (
    <div className={classNames("content-detail", className)}>
      <Helmet>
        <title>{contentTOC.label}</title>
      </Helmet>

      {contentTOC && <ContentTOCHeader contentTOC={contentTOC} />}

      <Row>
        {contentTOC && contentTOC.items.length > 0 && (
          <Column size={3}>
            <StyledHeading as="h3">
              <Message id="ContentTOC.Header" defaultMessage="Sections" />
            </StyledHeading>

            <ContentTOC contentTOC={contentTOC} />
          </Column>
        )}
        {contentTOC && contentTOC.categories.length > 0 && (
          <Column size={9}>
            <ContentCategories contentTOC={contentTOC} />
          </Column>
        )}
        <Switch>
          <Route
            path="/modelcatalog/content/:sectioncontent/:section"
            render={({ match }) => {
              if (match.params.sectioncontent) {
                return (
                  <ConnectedContentDetailSection
                    sectioncontent={match.params.sectioncontent}
                    section={match.params.section}
                    entryDate={entryDate}
                  />
                );
              }

              return null;
            }}
          />
          <Redirect
            to={`/modelcatalog${contentTOC.items[0].encodedHref.toString()}`}
          />
        </Switch>
      </Row>
    </div>
  ) : null;

ContentDetail.displayName = "BI.ContentDetail";

export default ContentDetail;
