// @flow
import { mdiClose } from "@mdi/js";
import { check } from "../Icon/CustomIcons";

import classNames from "classnames";
import styled from "styled-components";
import { themeProp, spacer } from "beinformed/theme/utils";

import { FormContentRenderer } from "_component-registry/formcontent";
import { Icon } from "_component-registry/icon";

import type {
  BooleanAttributeModel,
  ContentConfigurationResults,
  ContentConfigurationElements,
} from "beinformed/models";
export type Props = {
  +className?: string,
  +attribute: BooleanAttributeModel,
  +contentConfiguration?: ?ContentConfigurationResults,
  +defaultContentConfiguration?: ?ContentConfigurationElements,
};

const StyledDecision = styled.div`
  margin-bottom: ${spacer()};
`;

const StyledLabel = styled.div`
  position: relative;
  margin-bottom: ${spacer(0.5)};
`;

const StyledIcon = styled(Icon)`
  color: ${({ isSelected }) =>
    isSelected
      ? themeProp("RESULT_POSITIVE_ICON_COLOR")
      : themeProp("RESULT_NEGATIVE_ICON_COLOR")};
`;

const ResultAttributeDecision = ({
  className,
  contentConfiguration,
  defaultContentConfiguration,
  attribute,
}: Props) => {
  const isSelected =
    attribute.options.selected.length > 0 &&
    attribute.options.selected[0].code === "true";

  return (
    <StyledDecision
      className={classNames("form-result-decision form-group", className)}
      data-id={attribute.name}
    >
      <StyledLabel className="form-label">
        <StyledIcon
          path={isSelected ? check : mdiClose}
          textAfter
          isSelected={isSelected}
        />
        {contentConfiguration &&
          attribute.getContentConfiguredLabel(
            isSelected
              ? contentConfiguration.positiveResultElements
              : contentConfiguration.negativeResultElements
          )}
      </StyledLabel>

      {attribute.concept && contentConfiguration && (
        <FormContentRenderer
          concept={attribute.concept}
          contentConfiguration={
            isSelected
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
    </StyledDecision>
  );
};

ResultAttributeDecision.displayName = "BI.ResultAttributeDecision";

export default ResultAttributeDecision;
