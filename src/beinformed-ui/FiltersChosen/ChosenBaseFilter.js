// @flow
import classNames from "classnames";
import styled from "styled-components";
import {
  themeProp,
  roundedCorners,
  spacer,
  spacers,
} from "beinformed/theme/utils";

import { Link } from "_component-registry/link";

import type { Node } from "react";
import type { Href } from "beinformed/models";
export type Props = {
  +className?: string,
  +deleteHref: Href,
  +children: Node,
};

const StyledChosenFilter = styled.span`
  padding: ${spacers(0.25, 0.4)};
  margin-left: ${spacer()};
  background: ${themeProp("GREY_200", "#e9ecef")};
  ${roundedCorners()};
`;

const StyledDeleteLink = styled(Link)`
  margin-left: ${spacers(0.5)};
`;

const ChosenBaseFilter = ({ className, deleteHref, children }: Props) => (
  <StyledChosenFilter className={classNames(className, "chosen-filter")}>
    {children}
    <StyledDeleteLink
      className="delete-chosen-filter-link"
      href={deleteHref}
      icon="trash-can-outline"
    />
  </StyledChosenFilter>
);

ChosenBaseFilter.displayName = "BI.ChosenBaseFilter";

export default ChosenBaseFilter;
