// @flow
import classNames from "classnames";
import styled from "styled-components";
import { themeProp, spacer } from "beinformed/theme/utils";

import { Message } from "beinformed/i18n";

import { ConceptPropertyValue } from "_component-registry/concept";

import { Heading } from "_component-registry/elements";
import { Row, Column } from "_component-registry/grid";

export type Props = {
  +className?: string,
  +properties: Array<propertyJSON>,
};

const StyledWrapper = styled.div`
  margin-bottom: ${spacer(2)};
`;

const StyledHeading = styled(Heading)`
  font-size: ${themeProp("FONT_SIZE_H4")};
  font-weight: ${themeProp("HEADING_FONT_WEIGHT")};
  color: ${themeProp("HEADER_COLOR")};
`;

const ConceptProperties = ({ className, properties }: Props) => (
  <StyledWrapper className={classNames("concept-properties", className)}>
    <StyledHeading as="h3">
      <Message id="ConceptProperties.Header" defaultMessage="Properties" />
    </StyledHeading>

    {properties.map((property) => (
      <Row key={property._id}>
        <Column size={3} className={classNames("label", className)}>
          {property.label}
          {property.mandatory === "true" && " *"}
        </Column>
        <Column size={7} className={classNames("value", className)}>
          <ConceptPropertyValue property={property} />
        </Column>
      </Row>
    ))}
  </StyledWrapper>
);

ConceptProperties.displayName = "BI.ConceptProperties";

export default ConceptProperties;
