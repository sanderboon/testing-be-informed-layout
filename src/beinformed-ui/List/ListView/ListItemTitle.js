// @flow
import classNames from "classnames";
import styled from "styled-components";
import { spacer, themeProp } from "beinformed/theme/utils";

import { AttributeValueText } from "_component-registry/attributes-readonly";

import type { AttributeType } from "beinformed/models";
export type Props = {
  +className?: string,
  +attribute: AttributeType,
};

const StyledTitle = styled.div`
  margin-bottom: ${spacer(0.5)};
  font-weight: 500;
  line-height: 1.2;
  font-size: ${themeProp("FONT_SIZE_H3", "1.25rem")};
`;

const ListItemTitle = ({ className, attribute }: Props) => (
  <StyledTitle className={classNames("attribute-value", className)}>
    <AttributeValueText attribute={attribute} />
  </StyledTitle>
);

ListItemTitle.displayName = "BI.ListItemTitle";

export default ListItemTitle;
