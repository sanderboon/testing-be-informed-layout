// @flow
import classNames from "classnames";
import styled from "styled-components";
import { themeProp, spacer } from "beinformed/theme/utils";

import { Href } from "beinformed/models";

import { Link } from "_component-registry/link";
import { ConceptIcon } from "_component-registry/concept";

import type { ConceptLinkModel, ConceptDetailModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +concept: ConceptLinkModel | ConceptDetailModel,
};

const StyledLabel = styled.span`
  margin-left: ${spacer(0.25)};
`;

const StyledLink = styled(Link)`
  color: ${themeProp("PRIMARY_LINK_COLOR")};
`;

/**
 * Concept link
 */
const ConceptLink = ({ className, concept }: Props) => (
  <StyledLink
    className={classNames("concept-link", className)}
    dataId={concept.key}
    href={new Href(`/modelcatalog${concept.selfhref.toString()}`)}
  >
    {concept.conceptType && concept.conceptType.icon && (
      <ConceptIcon concept={concept} size="16px" />
    )}
    <StyledLabel>{concept.label}</StyledLabel>
  </StyledLink>
);

ConceptLink.displayName = "BI.ConceptLink";

export default ConceptLink;
