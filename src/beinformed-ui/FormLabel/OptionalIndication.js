// @flow
import classNames from "classnames";
import styled from "styled-components";
import { themeProp, spacer } from "beinformed/theme/utils";

import { Message } from "beinformed/i18n";

const StyledOptional = styled.span`
  margin-left: ${spacer(0.3)};
  font-size: 0.7rem;
  font-weight: ${themeProp("FONT_WEIGHT_LIGHT")};
  color: ${themeProp("LABEL_ISOPTIONAL_COLOR")};

  &::before {
    margin-right: ${spacer(0.25)};
    content: "-";
  }
`;

export type Props = {
  +className?: string,
};

const OptionalIndication = ({ className }: Props) => (
  <StyledOptional className={classNames(className, "is-optional")}>
    <Message id="FormLabel.isOptional">optional</Message>
  </StyledOptional>
);

OptionalIndication.displayName = "BI.OptionalIndication";

export default OptionalIndication;
