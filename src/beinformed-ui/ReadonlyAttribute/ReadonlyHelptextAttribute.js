// @flow
import classNames from "classnames";
import styled from "styled-components";
import { themeProp } from "beinformed/theme/utils";

import { Row, Column } from "_component-registry/grid";
import { FormattedText } from "_component-registry/text";

import type { HelptextAttributeModel } from "beinformed/models";
export type Props = {
  +attribute: HelptextAttributeModel,
  +className?: string,
};

const StyledText = styled(Column)`
  color: ${themeProp("GREY_600", "#6c757d")};
`;

/**
 * Render helptext attribute
 */
const ReadonlyHelptextAttribute = ({ className, attribute }: Props) => {
  if (attribute.text !== null) {
    return (
      <Row>
        <StyledText
          as={FormattedText}
          dataName={attribute.name}
          className={classNames("helptextwidget", className)}
          text={attribute.text}
        />
      </Row>
    );
  }

  return null;
};

ReadonlyHelptextAttribute.displayName = "BI.ReadonlyHelptextAttribute";

export default ReadonlyHelptextAttribute;
