// @flow
import classNames from "classnames";
import styled from "styled-components";
import { themeProp, spacer } from "beinformed/theme/utils";

import { AttributeList } from "_component-registry/attributes-readonly";
import { Heading } from "_component-registry/elements";

import type { AttributeType } from "beinformed/models";
export type Props = {
  +className?: string,
  +name?: AttributeType | null,
  +properties?: Array<AttributeType>,
};

const StyledHeader = styled.div`
  padding: ${spacer()};
  margin-bottom: ${spacer()};
  background-color: ${themeProp("GREY_100", "#f8f9fa")};
`;

/**
 * Renders the case header
 */
const CaseHeader = ({ className, name, properties }: Props) => {
  const caseName = name ? name.value : "";

  return (
    <StyledHeader className={classNames("caseview-header", className)}>
      <Heading as="h1">
        <span className="casename">{caseName}</span>
      </Heading>
      {properties && (
        <AttributeList direction="horizontal" attributes={properties} />
      )}
    </StyledHeader>
  );
};

CaseHeader.displayName = "BI.CaseHeader";

export default CaseHeader;
