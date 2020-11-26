// @flow
import { get, isNil, escapeRegExp } from "lodash";

import classNames from "classnames";
import styled from "styled-components";
import { themeProp, spacer } from "beinformed/theme/utils";

import { Message } from "beinformed/i18n";

import { AttributeValueText } from "_component-registry/attributes-readonly";

import type {
  ChoiceAttributeOptionModel,
  ContentConfigurationElements,
} from "beinformed/models";
export type Props = {
  className?: string,
  option: ChoiceAttributeOptionModel,
  optionContentConfiguration?: ContentConfigurationElements | null,
  markText?: string,
  markAttribute?: string,
  titleOnly?: boolean,
  emptyValue?: any,
};

const StyledMark = styled.mark`
  padding: ${spacer(0.2)};
  background-color: ${themeProp("GREY_100", "#f8f9fa")};
`;

const markFoundText = (optionLabel: string, markText?: string) => {
  if (markText) {
    const re = new RegExp(`(${escapeRegExp(markText)})`, "gi");
    const aLabel = optionLabel
      .replace(re, "[mark]$1[mark]")
      .split("[mark]")
      .filter((mark) => mark !== "");

    return aLabel.map((labelPart, i) => {
      if (markText && labelPart.toLowerCase() === markText.toLowerCase()) {
        return <StyledMark key={`${labelPart}-${i}`}>{labelPart}</StyledMark>;
      }

      return labelPart;
    });
  }

  return optionLabel;
};

const StyledCount = styled.span`
  margin-left: ${spacer(0.25)};
`;

const ChoiceOptionLabel = ({
  className,
  option,
  optionContentConfiguration,
  markText,
  markAttribute,
  titleOnly,
  emptyValue = "-",
}: Props) => {
  const count = isNil(option.count) ? null : (
    <StyledCount className="option-count" key={`option-count-${option.code}`}>
      {`(${option.count})`}
    </StyledCount>
  );

  if (option.isBooleanType && !option.hasAlternativeLabel) {
    return [
      <span
        className={classNames("option-label", className)}
        key={`option-label-${option.code}`}
      >
        <Message
          id={
            option.code === "true"
              ? "Choice.Boolean.True"
              : "Choice.Boolean.False"
          }
        >
          {option.label}
        </Message>
      </span>,
      count,
    ];
  }

  const configuredLabelProperties = get(
    optionContentConfiguration,
    "labelConfig[0].types",
    []
  );

  if (!titleOnly && option.attributeCollection.hasItems) {
    return [
      ...option.attributeCollection.map((attribute) => (
        <AttributeValueText
          key={`option-attribute-${attribute.key}`}
          attribute={attribute}
          markText={
            markAttribute && attribute.name === markAttribute ? markText : null
          }
          emptyValue={emptyValue}
        />
      )),
      count,
    ];
  }

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

      return [
        <span
          className={classNames("option-label", className)}
          key={`option-label-${option.code}`}
        >
          {markFoundText(configLabelProperty, markText)}
        </span>,
        count,
      ];
    }
  }

  return [
    <span
      key={`option-label-${option.code}`}
      className={classNames("option-label", className)}
    >
      {markFoundText(option.label, markText)}
    </span>,
    count,
  ];
};

export default ChoiceOptionLabel;
