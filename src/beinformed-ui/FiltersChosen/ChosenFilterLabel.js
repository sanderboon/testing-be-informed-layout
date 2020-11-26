// @flow
import styled from "styled-components";

import { spacer } from "beinformed/theme/utils";

import type { FilterAttributeType } from "beinformed/models";

import { HIDE_LABEL } from "beinformed/constants/LayoutHints";

export type Props = {
  +className?: string,
  +attribute: FilterAttributeType,
};

const StyledChosenFilterLabel = styled.span`
  margin-right: ${spacer(0.5)};
`;

const ChosenFilterLabel = ({ className, attribute }: Props) => {
  return attribute.layouthint.has(HIDE_LABEL) ? null : (
    <StyledChosenFilterLabel className={className}>
      {attribute.label}:
    </StyledChosenFilterLabel>
  );
};

ChosenFilterLabel.displayName = "BI.ChosenFilterLabel";

export default ChosenFilterLabel;
