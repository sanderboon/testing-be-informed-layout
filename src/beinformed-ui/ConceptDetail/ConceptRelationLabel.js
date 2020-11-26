// @flow
import classNames from "classnames";
import styled from "styled-components";

import { themeProp } from "beinformed/theme/utils";

import { Heading } from "_component-registry/elements";

export type Props = {
  +className?: string,
  +label: string,
};

const StyledHeading = styled(Heading)`
  font-size: ${themeProp("FONT_SIZE_H4")};
  font-weight: ${themeProp("HEADING_FONT_WEIGHT")};
  color: ${themeProp("HEADER_COLOR")};
`;

const ConceptRelationLabel = ({ className, label }: Props) => (
  <StyledHeading as="h3" className={classNames(className, "relation-label")}>
    <span>{label}</span>
  </StyledHeading>
);
ConceptRelationLabel.displayName = "BI.ConceptRelationLabel";

export default ConceptRelationLabel;
