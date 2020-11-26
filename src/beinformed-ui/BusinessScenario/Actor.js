// @flow
import classNames from "classnames";
import styled from "styled-components";
import { themeProp } from "beinformed/theme/utils";

import { Icon } from "_component-registry/icon";
import { Link } from "_component-registry/link";

import type { Href } from "beinformed/models";
export type Props = {
  +className?: string,
  +Y: number,
  +label: string,
  +href: Href,
};

const VERTICAL_DISTANCE = 80;
const StyledActor = styled.div`
  position: absolute;
  left: 1em;
  max-height: 40px;
  font-size: ${themeProp("FONT_SIZE_SMALL", "0.875rem")};
  top: ${({ Y }) => Y * VERTICAL_DISTANCE + 2}px;
`;

const Actor = ({ className, Y, label, href }: Props) => (
  <StyledActor
    className={classNames("business-scenario-actor", className)}
    Y={Y}
  >
    <Icon name="account" size="1.5em" textAfter />
    <Link href={href}>{label}</Link>
  </StyledActor>
);

Actor.displayName = "BI.Actor";

export default Actor;
