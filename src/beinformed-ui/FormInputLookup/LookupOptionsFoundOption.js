// @flow
import classNames from "classnames";
import styled, { css } from "styled-components";
import { themeProp, spacers } from "beinformed/theme/utils";

import { KEYCODES } from "beinformed/constants/Constants";

import { ChoiceOptionLabel } from "_component-registry/input";
import { FormContentRenderer } from "_component-registry/formcontent";

import type {
  ContentConfigurationElements,
  ChoiceAttributeOptionModel,
} from "beinformed/models";
export type Props = {
  +className?: string,
  +highlightedOption: ChoiceAttributeOptionModel | null,
  +filterName: string,
  +filterInput: string,
  +option: ChoiceAttributeOptionModel,
  +optionContentConfiguration?: ContentConfigurationElements,
  +onClick: (option: ChoiceAttributeOptionModel) => void,
};

const StyledItem = styled.li`
  position: relative;
  display: block;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-left: 0;
  border-right: 0;

  &:hover,
  &:focus {
    z-index: 1;
    text-decoration: none;
  }
`;

const StyledAction = styled.div`
  width: 100%;
  color: ${themeProp("GREY_700", "#495057")};
  padding: ${spacers(0.75, 1.25)};

  &:hover,
  &:focus {
    color: ${themeProp("GREY_700", "#495057")};
    text-decoration: none;
    background-color: ${themeProp("GREY_100", "#f8f9fa")};
  }

  ${({ isActive }) =>
    isActive &&
    css`
      color: ${themeProp("GREY_900", "#212529")};
      background-color: ${themeProp("GREY_200", "#e9ecef")};
    `}
`;

/**
 * Render lookup options
 */
const LookupOptionsFoundOption = ({
  className,
  highlightedOption,
  filterName,
  filterInput,
  option,
  optionContentConfiguration,
  onClick,
}: Props) => {
  const isActive =
    highlightedOption !== null && option.code === highlightedOption.code;

  const hasContent = option.concept && optionContentConfiguration;

  return (
    <StyledItem
      key={option.code}
      className={classNames("lookup-option", className)}
      data-value={option.code}
    >
      <StyledAction
        tabIndex="0"
        role="option"
        aria-selected={isActive}
        isActive={isActive}
        onClick={(e) => {
          e.preventDefault();
          onClick(option);
        }}
        onKeyDown={(e) => {
          if (e.keyCode === KEYCODES.ENTER || e.keyCode === KEYCODES.SPACE) {
            e.preventDefault();
            onClick(option);
          }
        }}
      >
        <ChoiceOptionLabel
          option={option}
          markAttribute={filterName}
          markText={filterInput}
          emptyValue="-"
        />
      </StyledAction>

      {hasContent && (
        <FormContentRenderer
          concept={option.concept}
          contentConfiguration={optionContentConfiguration}
        />
      )}

      {option.children.hasItems && (
        <ul>
          {option.children.map((opt) => (
            <LookupOptionsFoundOption
              key={opt.code}
              highlightedOption={highlightedOption}
              filterName={filterName}
              filterInput={filterInput}
              option={opt}
              onClick={onClick}
            />
          ))}
        </ul>
      )}
    </StyledItem>
  );
};

LookupOptionsFoundOption.displayName = "BI.LookupOptionsFoundOption";

export default LookupOptionsFoundOption;
