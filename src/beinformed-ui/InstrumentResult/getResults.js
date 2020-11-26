// @flow
import { BooleanAttributeModel } from "beinformed/models";

import type {
  AttributeType,
  ContentConfigurationResults,
  ContentConfiguration,
} from "beinformed/models";

const getAttributesWithContentConfiguration = (
  attributes: Array<AttributeType>,
  config: ContentConfigurationResults
): Array<AttributeType> =>
  attributes.filter((attribute) => {
    if (config.attributes.includes(attribute.key)) {
      if (attribute instanceof BooleanAttributeModel) {
        return attribute.options.selected.length > 0;
      }

      return true;
    }

    return false;
  });

const getAttributesNoContentConfiguration = (
  attributes: Array<AttributeType>,
  contentConfiguration: ContentConfiguration
): Array<AttributeType> =>
  attributes.filter(
    (attribute) =>
      !contentConfiguration.isConfiguredIntermediateResultAttribute(
        attribute.key
      ) && !contentConfiguration.isConfiguredEndResultAttribute(attribute.key)
  );

const getResults = (
  attributes: Array<AttributeType>,
  contentConfiguration: ContentConfiguration,
  configuredElementsOnly: boolean
): Array<{
  attributes: Array<AttributeType>,
  config: ContentConfigurationResults | null,
}> => {
  const results = [];

  if (contentConfiguration.endResults) {
    contentConfiguration.endResults.config.forEach((config) => {
      const attributesWithContent = getAttributesWithContentConfiguration(
        attributes,
        config
      );

      if (attributesWithContent.length > 0) {
        results.push({
          attributes: attributesWithContent,
          config,
        });
      }
    });
  }

  if (!configuredElementsOnly) {
    // Render result attributes that are not configured through content
    const attributesNoContent = getAttributesNoContentConfiguration(
      attributes,
      contentConfiguration
    );

    if (attributesNoContent.length > 0) {
      results.push({
        attributes: attributesNoContent,
        config: null,
      });
    }
  }

  return results;
};

export { getResults };
