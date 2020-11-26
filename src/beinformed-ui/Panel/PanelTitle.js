// @flow
import classNames from "classnames";
import styled from "styled-components";
import { spacer } from "beinformed/theme/utils";

import { Heading } from "_component-registry/elements";

import type { Node } from "react";
export type Props = {
  +children?: Node,
  +className?: string,
  +priority?: "default" | "primary",
};

const StyledTitle = styled(Heading)`
  margin-bottom: ${spacer(0.75)};
`;

/**
 * Render panel body
 */
const PanelTitle = ({ children, className, priority }: Props) => {
  if (priority === "primary") {
    return (
      <StyledTitle className={classNames("panel-title", className)}>
        {children}
      </StyledTitle>
    );
  }

  return (
    <StyledTitle as="h2" className={classNames("panel-title", className)}>
      {children}
    </StyledTitle>
  );
};

PanelTitle.displayName = "BI.PanelTitle";

export default PanelTitle;
