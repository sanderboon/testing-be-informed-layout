// @flow
import classNames from "classnames";
import styled from "styled-components";
import { themeProp, spacer } from "beinformed/theme/utils";

import { ConceptLink } from "_component-registry/concept";
import { Heading } from "_component-registry/elements";

import { Message } from "beinformed/i18n";
import { modularui } from "beinformed/modularui";

import type { ConceptIndexModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +relatedConcepts: ConceptIndexModel,
};

const StyledList = styled.ul`
  padding-left: 0;
  list-style: none;
  margin-bottom: ${spacer()};
`;

const StyledHeading = styled(Heading)`
  font-size: ${themeProp("FONT_SIZE_H4")};
  font-weight: ${themeProp("HEADING_FONT_WEIGHT")};
  color: ${themeProp("HEADER_COLOR")};
`;

/**
 * Related concepts
 */
const RelatedConcepts = ({ className, relatedConcepts }: Props) =>
  relatedConcepts && relatedConcepts.items ? (
    <div className={classNames("related-concepts", className)}>
      <StyledHeading as="h3">
        <Message
          id="RelatedConcepts.Header"
          defaultMessage="Related concepts"
        />
      </StyledHeading>
      <StyledList className="concept-relations">
        {relatedConcepts.items.map((relatedConcept) => (
          <li key={relatedConcept.key} className="concept-relation">
            <ConceptLink concept={relatedConcept} />
          </li>
        ))}
      </StyledList>
    </div>
  ) : null;

RelatedConcepts.displayName = "BI.RelatedConcepts";

export const connector = modularui(
  "RelatedConcepts",
  ({ relatedConceptsHref }) => relatedConceptsHref,
  { propName: "relatedConcepts" }
);

export default connector(RelatedConcepts);
