// @flow
import { get } from "lodash";

import type {
  ChoiceAttributeOptionModel,
  ContentConfigurationElements,
} from "beinformed/models";

const addCountPostfix = (label, count) =>
  count === null ? label : `${label} (${count})`;

const getChoiceOptionLabel = (
  option: ChoiceAttributeOptionModel,
  optionContentConfiguration?: ContentConfigurationElements
) => {
  const configuredLabelProperties = get(
    optionContentConfiguration,
    "labelConfig[0].types",
    []
  );

  if (option.concept && configuredLabelProperties.length > 0) {
    const configuredLabels = option.concept
      .getLabelElementByIds(configuredLabelProperties)
      .filter(
        (configuredLabel) =>
          configuredLabel.value && configuredLabel.value !== ""
      );

    if (configuredLabels.length > 0) {
      const configLabelProperty = configuredLabelProperties
        .filter((configuredLabelProperty) =>
          configuredLabels.some(
            (configuredLabel) => configuredLabel._id === configuredLabelProperty
          )
        )
        .map((configuredLabelProperty) =>
          configuredLabels.find(
            (configuredLabel) => configuredLabel._id === configuredLabelProperty
          )
        )[0].value;

      return addCountPostfix(configLabelProperty, option.count);
    }
  }

  if (option.attributeCollection.hasItems) {
    const concattedLabel = option.attributeCollection
      .map((attribute) => attribute.readonlyvalue)
      .join(" | ");

    return addCountPostfix(concattedLabel, option.count);
  }

  return addCountPostfix(option.label, option.count);
};

/**
 * Flaten option array to a single level array (in case there are children present)
 */
const flattenOptions = (
  options: Array<ChoiceAttributeOptionModel>,
  level: number = 0
) => {
  const opts = [];

  options.forEach((option) => {
    const newOption = option.clone();

    newOption.level = level;

    opts.push(newOption);
    if (newOption.children) {
      const flatten = flattenOptions(newOption.children.all, level + 1);

      opts.push(...flatten);
    }
  });

  return opts;
};

export { getChoiceOptionLabel, flattenOptions };
