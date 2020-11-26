// @flow
import { Fragment } from "react";
import { Helmet } from "react-helmet-async";

import { ContentSections, RelatedConcepts } from "_component-registry/content";
import { Column } from "_component-registry/grid";

import type { ContentModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +content: ContentModel,
};

const ContentDetailSection = ({ className, content }: Props) =>
  content ? (
    <Fragment>
      <Column>
        <Helmet>
          <title>{content.label}</title>
        </Helmet>
        <ContentSections className={className} contentDetail={content} />
      </Column>

      {content.relatedConceptsHrefs.length > 0 && (
        <Column size={3}>
          {content.relatedConceptsHrefs.map((relatedConceptsHref) => (
            <RelatedConcepts
              key={relatedConceptsHref.toString()}
              relatedConceptsHref={relatedConceptsHref}
            />
          ))}
        </Column>
      )}
    </Fragment>
  ) : null;

ContentDetailSection.displayName = "BI.ContentDetailSection";

export default ContentDetailSection;
