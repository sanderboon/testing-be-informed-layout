// @flow
import classNames from "classnames";
import styled, { css } from "styled-components";
import { themeProp, spacer } from "beinformed/theme/utils";

import {
  FormContent,
  FormContentPopover,
} from "_component-registry/formcontent";
import {
  CheckboxInput,
  RadioInput,
  ChoiceOptionLabel,
} from "_component-registry/input";

import type {
  ChoiceAttributeOptionModel,
  ContentConfigurationElements,
} from "beinformed/models";
export type Props = {
  +className?: string,
  +disabled?: boolean,
  +id?: string,
  +label?: string,
  +name: string,
  +optionContentConfiguration?: ContentConfigurationElements | null,
  +options: Array<ChoiceAttributeOptionModel>,
  +readOnly?: boolean,
  +formLayout?: ?string,
  +stacked?: boolean,
  +stackedItemCount?: number,
  +type: "checkbox" | "radiobutton",
  +inError?: boolean,
  +onBlur?: (
    e: SyntheticInputEvent<HTMLSelectElement | HTMLInputElement>
  ) => void,
  +onChange: (
    e: SyntheticInputEvent<HTMLSelectElement | HTMLInputElement>
  ) => void,
  +onFocus?: (
    e: SyntheticInputEvent<HTMLSelectElement | HTMLInputElement>
  ) => void,
};

const StyledWrapper = styled.div`
  ${({ formLayout }) =>
    formLayout === "compact" &&
    css`
      display: flex;
      flex-direction: row;
    `}
`;

const StyledGroup = styled.div`
  margin-right: ${spacer(0.5)};
`;

const StyledFormContent = styled(FormContent)`
  margin-left: ${spacer(1.5)};
  padding-left: ${spacer(0.5)};
  color: ${themeProp("INPUT_ASSISTANT_COLOR")};
`;

/**
 * Render a group of toggle items, radio or checkbox without children
 */
const ChoiceInputGroup = ({
  className,
  optionContentConfiguration,
  disabled,
  id,
  label,
  name,
  options,
  readOnly,
  formLayout,
  stacked = false,
  stackedItemCount,
  type,
  inError,
  onBlur,
  onChange,
  onFocus,
}: Props) => {
  const ChoiceInputType = type === "radiobutton" ? RadioInput : CheckboxInput;

  const stackedGroups = [];

  if (stackedItemCount) {
    for (let i = 0; i < options.length; i += stackedItemCount) {
      stackedGroups.push(options.slice(i, i + stackedItemCount));
    }
  } else {
    stackedGroups.push(options);
  }

  return (
    <StyledWrapper
      className={className}
      role="group"
      aria-label={label}
      formLayout={formLayout}
      data-stacked={stacked}
    >
      {stackedGroups.map((stackGroup, s) => (
        <StyledGroup key={`stack-${s}`}>
          {stackGroup.map((option) => (
            <span
              key={option.code}
              className={classNames("option", { active: option.selected })}
            >
              <ChoiceInputType
                name={name}
                id={id}
                label={() => (
                  <ChoiceOptionLabel
                    option={option}
                    optionContentConfiguration={optionContentConfiguration}
                    emptyValue={null}
                  />
                )}
                value={option.code}
                isChecked={option.selected}
                disabled={disabled || readOnly}
                stacked={stacked}
                inError={inError}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                count={option.count}
              >
                <FormContentPopover
                  concept={option.concept}
                  contentConfiguration={optionContentConfiguration}
                />
              </ChoiceInputType>

              <StyledFormContent
                concept={option.concept}
                contentConfiguration={optionContentConfiguration}
              />
            </span>
          ))}
        </StyledGroup>
      ))}
    </StyledWrapper>
  );
};

ChoiceInputGroup.displayName = "BI.ChoiceInputGroup";

export default ChoiceInputGroup;
