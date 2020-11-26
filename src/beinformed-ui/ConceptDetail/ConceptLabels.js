// @flow
import classNames from "classnames";
import styled from "styled-components";
import { spacer } from "beinformed/theme/utils";

import { Message } from "beinformed/i18n";

import { Heading } from "_component-registry/elements";
import { Row, Column } from "_component-registry/grid";

export type Props = {
  +className?: string,
  +labels: Array<labelsJSON>,
};

const StyledWrapper = styled.div`
  margin-bottom: ${spacer()};
`;

/**
 * Concept labels
 */
const ConceptLabels = ({ className, labels }: Props) => (
  <StyledWrapper className={classNames("concept-labels", className)}>
    <Heading as="h3">
      <Message id="ConceptLabels.Header" defaultMessage="Alternative labels" />
    </Heading>

    {labels.map((label) => (
      <Row key={label.label}>
        <Column size={3}>{label.label}</Column>
        <Column size={7}>{label.value}</Column>
      </Row>
    ))}
  </StyledWrapper>
);

ConceptLabels.displayName = "BI.ConceptLabels";

export default ConceptLabels;
