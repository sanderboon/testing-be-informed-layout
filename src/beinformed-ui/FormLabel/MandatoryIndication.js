// @flow
import classNames from "classnames";
import styled from "styled-components";
import { themeProp, spacer } from "beinformed/theme/utils";

import { Message } from "beinformed/i18n";

const StyledMandatory = styled.span`
  margin-left: ${spacer(0.3)};
  font-weight: ${themeProp("FONT_WEIGHT_LIGHT")};
  color: ${themeProp("LABEL_ISOPTIONAL_COLOR")};
`;

export type Props = {
  +className?: string,
};

const MandatoryIndication = ({ className }: Props) => (
  <StyledMandatory className={classNames(className, "is-mandatory")}>
    <Message id="FormLabel.isMandatory">*</Message>
  </StyledMandatory>
);

MandatoryIndication.displayName = "BI.MandatoryIndication";

export default MandatoryIndication;
