// @flow
import classNames from "classnames";
import styled from "styled-components";
import { themeProp, spacer } from "beinformed/theme/utils";

import { Message } from "beinformed/i18n";
import { Heading } from "_component-registry/elements";

export type Props = { +className?: string, +formula: string };

const StyledWrapper = styled.div`
  margin-bottom: ${spacer(2)};
`;

const StyledPre = styled.pre`
  display: block;
  font-size: ${themeProp("FONT_SIZE_LARGE")};
`;

const StyledHeading = styled(Heading)`
  font-size: ${themeProp("FONT_SIZE_H4")};
  font-weight: ${themeProp("HEADING_FONT_WEIGHT")};
  color: ${themeProp("HEADER_COLOR")};
`;

/**
 * Concept formula
 */
const ConceptFormula = ({ className, formula }: Props) => (
  <StyledWrapper className={classNames("concept-formula", className)}>
    <StyledHeading as="h3">
      <Message id="ConceptFormula.Header" defaultMessage="Formula" />
    </StyledHeading>
    <StyledPre>{formula || "-"}</StyledPre>
  </StyledWrapper>
);

ConceptFormula.displayName = "BI.ConceptFormula";

export default ConceptFormula;
