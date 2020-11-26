// @flow
import classNames from "classnames";
import styled, { css } from "styled-components";
import {
  roundedCorners,
  themeProp,
  spacers,
  spacer,
  getContrastYIQ,
} from "beinformed/theme/utils";

import { Heading } from "_component-registry/elements";
import { ConceptIcon } from "_component-registry/concept";

import type { ConceptDetailModel } from "beinformed/models";
export type Props = { +className?: string, +concept: ConceptDetailModel };

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;

  padding: ${spacer(1.3)};
  margin: ${spacers(0.5, 0, 2)};

  ${roundedCorners()};
  box-shadow: ${themeProp("PANEL_SHADOW")};

  ${(props) => css`
    background-color: ${props.backgroundColor};

    .attribute-value {
      color: ${getContrastYIQ(props.backgroundColor)};
    }
  `};
`;

const StyledText = styled.div`
  margin-left: ${spacer(1.2)};
`;

const StyledLabel = styled(Heading)`
  font-size: ${themeProp("FONT_SIZE_H4")};
  font-weight: ${themeProp("HEADING_FONT_WEIGHT")};
`;

const StyledConceptType = styled.small`
  font-size: ${themeProp("FONT_SIZE_BASE")};
`;

/**
 * Concept header
 */
const ConceptHeader = ({ className, concept }: Props) => {
  if (!concept.conceptType) {
    return null;
  }

  const {
    backgroundColor,
    textColor,
    borderColor,
    icon,
    label,
  } = concept.conceptType;

  return (
    <StyledHeader
      className={classNames("concept-header", className)}
      backgroundColor={backgroundColor}
      textColor={textColor}
      borderColor={borderColor}
    >
      {icon && <ConceptIcon concept={concept} size="32px" />}
      <StyledText>
        <StyledLabel className={classNames("concept-label", className)}>
          {concept.label}
        </StyledLabel>
        <StyledConceptType className={classNames("concept-type", className)}>
          {label}
        </StyledConceptType>
      </StyledText>
    </StyledHeader>
  );
};

ConceptHeader.displayName = "BI.ConceptHeader";

export default ConceptHeader;
