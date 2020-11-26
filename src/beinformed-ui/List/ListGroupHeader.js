// @flow
import classNames from "classnames";
import styled, { css } from "styled-components";
import { themeProp, spacer, spacers } from "beinformed/theme/utils";

import {
  AttributeList,
  ReadonlyAttribute,
} from "_component-registry/attributes-readonly";

import type { GroupModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +group: GroupModel,
  +level?: number,
};

const StyledGroupHeader = styled.div`
  ${({ isTitle }) =>
    isTitle
      ? css`
          margin-bottom: ${spacer(0.75)};
          font-size: ${themeProp("FONT_SIZE_H2", "1.5rem")};
        `
      : css`
          background-color: ${themeProp("GREY_100", "#f8f9fa")};
          padding: ${spacers(0.75, 1.25)};
        `}
`;

const ListGroupHeader = ({ className, group, level }: Props) => (
  <StyledGroupHeader
    className={classNames("list-group-header", className)}
    isTitle={level === 1}
  >
    {group.attributeCollection.length === 1 &&
    group.attributeCollection.first ? (
      <ReadonlyAttribute
        direction="horizontal"
        attribute={group.attributeCollection.first}
        customLabel={group.label}
      />
    ) : (
      <AttributeList
        direction="horizontal"
        attributes={group.attributeCollection.all}
      />
    )}
  </StyledGroupHeader>
);

ListGroupHeader.displayName = "BI.ListGroupHeader";

export default ListGroupHeader;
