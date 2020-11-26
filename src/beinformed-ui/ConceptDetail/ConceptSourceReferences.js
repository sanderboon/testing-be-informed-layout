// @flow
import classNames from "classnames";

import styled from "styled-components";
import { spacer } from "beinformed/theme/utils";

import { Message } from "beinformed/i18n";

import { Heading } from "_component-registry/elements";
import { SourceReferences } from "_component-registry/concept";

import type { SourceReferenceCollection } from "beinformed/models";
export type Props = {
  +className?: string,
  +sourceReferences: SourceReferenceCollection,
};

const StyledWrapper = styled.div`
  margin-bottom: ${spacer()};
`;

const ConceptSourceReferences = ({ className, sourceReferences }: Props) => (
  <StyledWrapper className={classNames("concept-source-references", className)}>
    <Heading as="h3">
      <Message
        id="ConceptSourceReferences.Header"
        defaultMessage="Source References"
      />
    </Heading>

    <SourceReferences
      sourceReferences={sourceReferences}
      renderGotoSourceLink
    />
  </StyledWrapper>
);

ConceptSourceReferences.displayName = "BI.ConceptSourceReferences";

export default ConceptSourceReferences;
