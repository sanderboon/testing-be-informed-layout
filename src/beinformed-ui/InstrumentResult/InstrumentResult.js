// @flow
import classNames from "classnames";
import styled from "styled-components";
import { themeProp, spacer } from "beinformed/theme/utils";

import { ResultAttributeRenderer } from "_component-registry/results";
import { FormattedText } from "_component-registry/text";
import { Heading } from "_component-registry/elements";

import type {
  AttributeType,
  ContentConfigurationResults,
} from "beinformed/models";
export type Props = {
  +className?: string,
  +attributes: Array<AttributeType>,
  +id: string,
  +contentConfiguration?: ?ContentConfigurationResults,
};

const StyledWrapper = styled.div`
  padding: ${spacer()};
  margin-bottom: ${spacer(0.5)};
  background-color: ${themeProp("INSTRUMENT_RESULT_BG", "#f8f9fa")};
`;

const StyledHeader = styled(Heading)`
  color: ${themeProp("INSTRUMENT_RESULT_HEADER_COLOR", "#000")};
`;

/**
 * Render form result objects of a form
 */
const InstrumentResult = ({
  className,
  attributes,
  contentConfiguration,
  id,
}: Props) => (
  <StyledWrapper className={classNames("instrument-result", className)}>
    {contentConfiguration && (
      <StyledHeader as="h3" className="form-result-title">
        {contentConfiguration.label}
      </StyledHeader>
    )}
    {contentConfiguration && contentConfiguration.description && (
      <FormattedText
        className="form-result-description"
        text={contentConfiguration.description}
      />
    )}

    {attributes &&
      attributes.map((attribute) => (
        <ResultAttributeRenderer
          key={`${id}-${attribute.name}`}
          id={`${id}-${attribute.name}`}
          attribute={attribute}
          contentConfiguration={contentConfiguration}
        />
      ))}
  </StyledWrapper>
);

InstrumentResult.displayName = "BI.InstrumentResult";

export default InstrumentResult;
