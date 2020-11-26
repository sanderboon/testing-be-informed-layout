// @flow
import classNames from "classnames";
import styled, { css } from "styled-components";
import { spacer } from "beinformed/theme/utils";

import { BASE } from "beinformed/constants/Constants";

import type { ConceptLinkModel, ConceptDetailModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +concept: ConceptLinkModel | ConceptDetailModel,
  +size?: string,
};

const StyledWrapper = styled.span`
  position: relative;
  max-height: 100%;
`;
const StyledIcon = styled.img`
  max-width: 100%;
  max-height: 100%;

  margin-right: ${spacer(0.4)};

  ${({ size }) =>
    size &&
    css`
      width: ${size};
      height: ${size};
    `}
`;
const StyledTyped = styled.span`
  position: absolute;
  top: 0;
  left: -4px;
  display: block;
  padding: 0 2px 1px;
  font-size: 10px;
  font-weight: 600;
  line-height: 1em;
  text-transform: uppercase;
  background: #fff;
  border: 1px solid #000;
  border-radius: 2px;
`;

const ConceptIcon = ({ className, concept, size }: Props) => (
  <StyledWrapper className={classNames("concept-icon", className)}>
    {concept.conceptType && (
      <StyledIcon
        src={`${BASE}${concept.conceptType.icon}`}
        alt={`Icon of ${concept.conceptType.label}`}
        size={size}
      />
    )}
    {concept.taxonomyType !== "default" && (
      <StyledTyped>{concept.taxonomyType.substr(0, 1)}</StyledTyped>
    )}
  </StyledWrapper>
);

ConceptIcon.displayName = "BI.ConceptIcon";

export default ConceptIcon;
