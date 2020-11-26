// @flow
import classNames from "classnames";
import styled from "styled-components";
import {
  themeProp,
  roundedCorners,
  spacers,
  spacer,
} from "beinformed/theme/utils";

import { LinkButton } from "_component-registry/buttons";

import { Href } from "beinformed/models";

const StyledNotFound = styled.div`
  padding: ${spacers(2, 1)};
  margin-bottom: ${spacer(2)};
  background-color: ${themeProp("GREY_200", "#e9ecef")};
  ${roundedCorners()};
`;

const StyledLead = styled.p`
  font-size: 1.25rem;
  font-weight: 300;
`;

const StyledLink = styled(LinkButton)`
  margin-top: ${spacer()};
`;

export type Props = {
  +className?: string,
};

/**
 * Render a generic error page
 */
const NotFound = ({ className }: Props) => (
  <StyledNotFound className={classNames("errorpage", className)}>
    <StyledLead>
      Sorry, but the page you are looking for was either not found or does not
      exist.
      <br />
      Try refreshing the page or click on the button below to go back to the
      Homepage.
    </StyledLead>
    <StyledLink href={new Href("/")} buttonStyle="PRIMARY" size="large">
      Homepage
    </StyledLink>
  </StyledNotFound>
);

NotFound.displayName = "BI.NotFound";

export default NotFound;
