// @flow
import { ReadonlyAttribute } from "_component-registry/attributes-readonly";

import {
  ResultAttributeClassification,
  ResultAttributeDecision,
} from "_component-registry/results";

import { BooleanAttributeModel, ChoiceAttributeModel } from "beinformed/models";

import type {
  AttributeType,
  ContentConfigurationResults,
} from "beinformed/models";
export type Props = {
  +className?: string,
  +id: string,
  +attribute: AttributeType,
  +contentConfiguration?: ?ContentConfigurationResults,
};

const getDefaultAttributeConfiguration = (
  contentConfiguration: ?ContentConfigurationResults
) => {
  if (
    contentConfiguration &&
    contentConfiguration.calculatedResultElements &&
    contentConfiguration.calculatedResultElements.hasConfig()
  ) {
    return contentConfiguration.calculatedResultElements;
  }

  if (
    contentConfiguration &&
    contentConfiguration.resultElements &&
    contentConfiguration.resultElements.hasConfig()
  ) {
    return contentConfiguration.resultElements;
  }

  return null;
};

const ResultAttributeRenderer = ({
  className,
  attribute,
  id,
  contentConfiguration,
}: Props) => {
  const defaultContentConfiguration = getDefaultAttributeConfiguration(
    contentConfiguration
  );

  if (attribute instanceof BooleanAttributeModel) {
    return (
      <ResultAttributeDecision
        className={className}
        attribute={attribute}
        contentConfiguration={contentConfiguration}
        defaultContentConfiguration={defaultContentConfiguration}
      />
    );
  }

  if (attribute instanceof ChoiceAttributeModel) {
    return (
      <ResultAttributeClassification
        id={id}
        className={className}
        attribute={attribute}
        contentConfiguration={contentConfiguration}
        defaultContentConfiguration={defaultContentConfiguration}
      />
    );
  }

  return (
    <ReadonlyAttribute
      className={className}
      attribute={attribute}
      contentConfiguration={defaultContentConfiguration}
    />
  );
};

ResultAttributeRenderer.displayName = "BI.ResultAttributeRenderer";

export default ResultAttributeRenderer;
