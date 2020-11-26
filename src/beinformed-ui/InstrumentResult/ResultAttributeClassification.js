// @flow
import { mdiClose } from "@mdi/js";
import { check } from "../Icon/CustomIcons";

import classNames from "classnames";
import styled from "styled-components";
import { themeProp, spacer } from "beinformed/theme/utils";

import { FormContentRenderer } from "_component-registry/formcontent";
import { Icon } from "_component-registry/icon";

import type {
  ChoiceAttributeModel,
  ContentConfigurationResults,
  ContentConfigurationElements,
} from "beinformed/models";
export type Props = {
  +className?: string,
  +id: string,
  +attribute: ChoiceAttributeModel,
  +contentConfiguration?: ?ContentConfigurationResults,
  +defaultContentConfiguration?: ?ContentConfigurationElements,
};

const StyledResult = styled.div`
  margin-bottom: ${spacer()};
`;

const StyledOption = styled.div`
  margin-top: ${spacer(0.5)};
`;

const StyledLabel = styled.div`
  position: relative;
  margin-bottom: ${spacer(0.5)};
  font-weight: 700;
`;

const StyledIcon = styled(Icon)`
  color: ${({ isSelected }) =>
    isSelected
      ? themeProp("RESULT_POSITIVE_ICON_COLOR")
      : themeProp("RESULT_NEGATIVE_ICON_COLOR")};
`;

const ResultAttributeClassification = ({
  className,
  contentConfiguration,
  defaultContentConfiguration,
  attribute,
  id,
}: Props) => (
  <StyledResult
    className={classNames("form-group form-result-taxonomy", className)}
    data-id={attribute.name}
  >
    {attribute.options
      .filter((option) => {
        if (!contentConfiguration) {
          return true;
        }

        const hasPositiveResultConfiguration = contentConfiguration.positiveResultElements.hasConfig();
        const hasNegativeResultConfiguration = contentConfiguration.negativeResultElements.hasConfig();

        return (
          (hasPositiveResultConfiguration && option.selected) ||
          (hasNegativeResultConfiguration && !option.selected)
        );
      })
      .map((option) => (
        <StyledOption
          key={`${option.code}--${id}`}
          className="form-result-option"
          data-result={option.selected ? "positive" : "negative"}
        >
          <StyledLabel className="form-result-option-label">
            <StyledIcon
              path={option.selected ? check : mdiClose}
              textAfter
              isSelected={option.selected}
            />
            {contentConfiguration &&
              option.getContentConfiguredLabel(
                option.selected
                  ? contentConfiguration.positiveResultElements
                  : contentConfiguration.negativeResultElements
              )}
          </StyledLabel>
          {option.concept && contentConfiguration && (
            <FormContentRenderer
              concept={option.concept}
              contentConfiguration={
                option.selected
                  ? contentConfiguration.positiveResultElements
                  : contentConfiguration.negativeResultElements
              }
            />
          )}
          {attribute.concept && defaultContentConfiguration && (
            <FormContentRenderer
              concept={attribute.concept}
              contentConfiguration={defaultContentConfiguration}
            />
          )}
        </StyledOption>
      ))}
  </StyledResult>
);

ResultAttributeClassification.displayName = "BI.ResultAttributeClassification";

export default ResultAttributeClassification;
