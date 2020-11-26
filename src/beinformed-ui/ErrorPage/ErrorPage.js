// @flow

import styled, { css } from "styled-components";
import {
  themeProp,
  getThemeProp,
  spacers,
  spacer,
  getContrastYIQ,
} from "beinformed/theme/utils";

import { darken } from "polished";
import { IS_DEVELOPMENT } from "beinformed/constants/Constants";

export type Props = {
  +errorMessage: string,
  +errorResource?: string,
  +errorLine?: number,
  +errorStack?: string,
};

const StyledPage = styled.div`
  padding: ${spacers(2, 1)};
  margin-bottom: ${spacer(2)};
  background-color: ${themeProp("GREY_200", "#e9ecef")};
`;

const StyledLead = styled.p`
  font-size: 1.25rem;
  font-weight: 300;
`;

const StyledStack = styled.pre`
  font-style: italic;
`;

const StyledLine = styled.div`
  font-weight: 700;
`;

const StyledLink = styled.a`
  margin-top: ${spacer()};
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;

  padding: ${spacers(0.375, 0.75)};
  font-size: 1rem;
  line-height: 1.5;

  &:focus,
  &:hover {
    ${({ theme }) => {
      const primaryColor: string = getThemeProp(
        theme,
        "PRIMARY_COLOR",
        "#007bff"
      );
      const darkenBg = darken(0.075, primaryColor);
      return css`
        background-color: ${darkenBg};
        border-color: ${darken(0.1, primaryColor)};
        background-color: ${getContrastYIQ(darkenBg)};
        text-decoration: none;
      `;
    }}
  }
`;

/**
 * Render a generic error page
 */
const ErrorPage = ({
  errorMessage,
  errorResource,
  errorLine,
  errorStack,
}: Props) => (
  <div className="application">
    <StyledPage className="errorpage">
      <StyledLead>
        Sorry, but the page you are looking for was either not found or does not
        exist.
        <br />
        Try refreshing the page or click on the button below to go back to the
        Homepage.
      </StyledLead>
      <p>
        <em>{errorMessage}</em>
      </p>
      {IS_DEVELOPMENT && errorStack && (
        <StyledStack className="debug">{errorStack}</StyledStack>
      )}
      {IS_DEVELOPMENT && errorResource && (
        <StyledLine>
          {errorResource}, {errorLine}
        </StyledLine>
      )}

      <StyledLink href="/">Homepage</StyledLink>
    </StyledPage>
  </div>
);

ErrorPage.displayName = "BI.ErrorPage";

export default ErrorPage;
