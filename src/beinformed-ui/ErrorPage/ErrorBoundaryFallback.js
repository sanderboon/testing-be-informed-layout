/** @flow */
import styled from "styled-components";
import classNames from "classnames";
import { spacers, spacer } from "beinformed/theme/utils";

import { Heading } from "_component-registry/elements";

export type Props = {
  +className?: string,
  +componentStack: string,
  +error: Error,
};

const StyledBoundary = styled.div`
  padding: ${spacers(2, 1)};
  margin-bottom: ${spacer(2)};
  background-color: #e9ecef;
  border-radius: 0.3em;
`;

const StyledStack = styled.pre`
  display: block;
  font-size: 87.5%;
  color: #212529;
  font-style: italic;
`;

const ErrorBoundaryFallback = ({ className, componentStack, error }: Props) => (
  <StyledBoundary className={classNames("error-boundary", className)}>
    <Heading>{error.toString()}</Heading>
    <StyledStack className="debug">{componentStack}</StyledStack>
  </StyledBoundary>
);

ErrorBoundaryFallback.displayName = "BI.ErrorBoundaryFallback";

export default ErrorBoundaryFallback;
