// @flow
import classNames from "classnames";
import styled from "styled-components";
import { themeProp, spacer } from "beinformed/theme/utils";

import { Message } from "beinformed/i18n";

import { Heading } from "_component-registry/elements";
import { Row, Column } from "_component-registry/grid";

export type Props = {
  +className?: string,
  +textfragments: Array<textfragmentJSON>,
};

const StyledWrapper = styled.div`
  margin-bottom: ${spacer(2)};
`;

const StyledHeading = styled(Heading)`
  font-size: ${themeProp("FONT_SIZE_H4")};
  font-weight: ${themeProp("HEADING_FONT_WEIGHT")};
  color: ${themeProp("HEADER_COLOR")};
`;

/**
 * Concept text fragments
 */
const ConceptTextFragments = ({ className, textfragments }: Props) => (
  <StyledWrapper className={classNames("concept-textfragments", className)}>
    <StyledHeading as="h3">
      <Message
        id="ConceptTextFragments.Header"
        defaultMessage="Text fragments"
      />
    </StyledHeading>
    {textfragments.map((textfragment) => (
      <Row key={textfragment.label}>
        <Column size={3} className={classNames("label", className)}>
          {textfragment.label}
        </Column>
        <Column size={7} className={classNames("text", className)}>
          {textfragment.text
            ? textfragment.text.split("\n").map((textLine, i) => (
                <span key={`line-${i}`}>
                  {textLine}
                  <br />
                </span>
              ))
            : "-"}
        </Column>
      </Row>
    ))}
  </StyledWrapper>
);

ConceptTextFragments.displayName = "BI.ConceptTextFragments";

export default ConceptTextFragments;
