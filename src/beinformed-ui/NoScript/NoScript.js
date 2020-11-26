// @flow
import styled from "styled-components";
import { themeProp, roundedCorners } from "beinformed/theme/utils";

import { Heading, StyledButton } from "_component-registry/elements";

const StyledNoScript = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  z-index: 99999;

  background: ${themeProp("BODY_BG", "#fff")};
`;

const StyledWrapper = styled.div`
  padding: 4em 2em;
  margin-bottom: 2em;
  background-color: ${themeProp("BODY_BG", "#fff")};
  ${roundedCorners("border-radius", "BORDER_RADIUS_LARGE")}
`;

const StyledTitle = styled(Heading)`
  font-size: 4.5rem;
  font-weight: 300;
  line-height: 1.2;
`;

const StyledLead = styled.p`
  font-size: 1.25rem;
  font-weight: 300;
`;

const NoScript = () => (
  <noscript>
    <StyledNoScript id="no-script">
      <StyledWrapper>
        <StyledTitle>No JavaScript</StyledTitle>
        <StyledLead>
          This application does not work correctly without JavaScript.
        </StyledLead>
        <hr />
        <StyledButton
          as="a"
          buttonStyle="PRIMARY"
          href="https://www.enable-javascript.com/"
        >
          Please enable JavaScript in your browser.
        </StyledButton>
      </StyledWrapper>
    </StyledNoScript>
  </noscript>
);

NoScript.displayName = "BI.NoScript";

export default NoScript;
