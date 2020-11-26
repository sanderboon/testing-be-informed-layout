// @flow
import classNames from "classnames";
import styled, { css } from "styled-components";
import { themeProp, roundedCorners, spacer } from "beinformed/theme/utils";

import { KEYCODES } from "beinformed/constants/Constants";
import { useMessage } from "beinformed/i18n";

import { Icon } from "_component-registry/icon";
import { ChoiceOptionLabel } from "_component-registry/input";

import type {
  ChoiceAttributeOptionModel,
  ContentConfigurationElements,
} from "beinformed/models";
export type Props = {
  +className?: string,
  +option: ChoiceAttributeOptionModel,
  +optionContentConfiguration?: ContentConfigurationElements | null,
  +emptyValue?: string,
  +isMultiple?: boolean,
  +isRemovable?: boolean,
  +onRemove?: (option: ChoiceAttributeOptionModel) => void,
};

const StyledOption = styled.span`
  ${(props) =>
    props.isMultiple &&
    css`
      padding: 1px 4px;
      font-size: ${themeProp("FONT_SIZE_SMALL", "0.875rem")};
      background-color: ${themeProp("GREY_100", "#f8f9fa")};
      border: 1px solid ${themeProp("GREY_400", "ced4da")};
      ${roundedCorners()};
    `}

  & + & {
    margin-left: ${spacer(0.25)};
  }
`;

const StyledButton = styled.span`
  padding: 0;
  margin-left: ${spacer(0.5)};
  cursor: pointer;
  background: none;
  border: none;

  ${(props) =>
    props.isMultiple &&
    css`
      font-size: ${themeProp("FONT_SIZE_SMALL", "0.875rem")};
    `}
`;

const ChoiceOption = ({
  className,
  option,
  optionContentConfiguration,
  emptyValue = "-",
  isMultiple = false,
  isRemovable,
  onRemove,
}: Props) => {
  const ariaRemoveLabel = useMessage(
    "ChoiceOption.AltText.RemoveOption",
    "Remove option"
  );
  return (
    <StyledOption
      key={option.code}
      className={classNames("choice-option", className)}
      data-value={option.code}
      isMultiple={isMultiple}
    >
      <ChoiceOptionLabel
        option={option}
        optionContentConfiguration={optionContentConfiguration}
        titleOnly={isMultiple}
        emptyValue={emptyValue}
      />
      {isRemovable && (
        <StyledButton
          className="choice-option-remove"
          isMultiple={isMultiple}
          tabIndex="0"
          role="button"
          aria-label={ariaRemoveLabel}
          onClick={(e) => {
            e.preventDefault();

            if (onRemove) {
              onRemove(option);
            }
          }}
          onKeyDown={(e) => {
            if (e.keyCode === KEYCODES.ENTER || e.keyCode === KEYCODES.SPACE) {
              e.preventDefault();

              if (onRemove) {
                onRemove(option);
              }
            }
          }}
        >
          <Icon name={isMultiple ? "close" : "close-circle"} />
        </StyledButton>
      )}
    </StyledOption>
  );
};
ChoiceOption.displayName = "BI.ChoiceOption";

export default ChoiceOption;
