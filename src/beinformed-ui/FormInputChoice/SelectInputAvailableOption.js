// @flow
import { forwardRef } from "react";

import styled from "styled-components";
import { themeProp } from "beinformed/theme/utils";

import { ChoiceOptionLabel } from "_component-registry/input";
import { FormContentRenderer } from "_component-registry/formcontent";
import { DropdownItem } from "_component-registry/dropdown";

import type {
  ChoiceAttributeOptionModel,
  ContentConfigurationElements,
} from "beinformed/models";
export type Props = {
  +className?: string,
  +option: ChoiceAttributeOptionModel,
  +optionContentConfiguration?: ContentConfigurationElements | null,
  +disabled?: boolean,
  +onClick: (value: any) => void,
};

const StyledDropdownItem = styled(DropdownItem)`
  padding-left: ${({ level }) => `${level + 1}em`};

  > .option-label:first-child {
    font-weight: ${themeProp("FONT_WEIGHT_BOLD")};
  }

  > .option-label:first-child:nth-last-child(1) {
    font-weight: ${themeProp("FONT_WEIGHT_NORMAL")};
  }
`;

const SelectInputAvailableOption = forwardRef<Props, typeof StyledDropdownItem>(
  (
    { className, option, optionContentConfiguration, disabled, onClick }: Props,
    ref
  ) => {
    const hasContent =
      option.concept &&
      optionContentConfiguration &&
      optionContentConfiguration.hasConfig;

    return (
      <StyledDropdownItem
        ref={ref}
        className={className}
        value={option.code}
        selected={option.selected}
        disabled={disabled}
        level={option.level}
        onClick={() => onClick(option.code)}
      >
        <ChoiceOptionLabel
          option={option}
          optionContentConfiguration={optionContentConfiguration}
        />
        {hasContent && (
          <FormContentRenderer
            concept={option.concept}
            contentConfiguration={optionContentConfiguration}
          />
        )}
      </StyledDropdownItem>
    );
  }
);
SelectInputAvailableOption.displayName = "BI.SelectInputAvailableOption";

export default SelectInputAvailableOption;
