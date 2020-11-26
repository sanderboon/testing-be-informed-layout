// @flow
import classNames from "classnames";
import styled from "styled-components";
import { themeProp } from "beinformed/theme/utils";

import { FormattedText } from "_component-registry/text";

import type { HelptextAttributeModel } from "beinformed/models";
export type Props = {
  +attribute: HelptextAttributeModel,
  +className?: string,
};

const StyledText = styled(FormattedText)`
  color: ${themeProp("GREY_600", "#6c757d")};
`;

/**
 * Render helptext attribute
 */
const HelptextAttribute = ({ className, attribute }: Props) => {
  if (attribute.text !== null) {
    return (
      <StyledText
        dataName={attribute.name}
        className={classNames("helptextwidget", className)}
        text={attribute.text}
      />
    );
  }

  return null;
};

HelptextAttribute.displayName = "BI.HelptextAttribute";

export default HelptextAttribute;
