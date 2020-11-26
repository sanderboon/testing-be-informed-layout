// @flow
import classNames from "classnames";
import styled, { css } from "styled-components";
import { themeProp, roundedCorners, spacers } from "beinformed/theme/utils";

import { ChoiceOption } from "_component-registry/input";

import type {
  ContentConfigurationElements,
  ChoiceAttributeOptionModel,
} from "beinformed/models";
export type Props = {
  +className?: string,
  +isMultiple: boolean,
  +optionContentConfiguration?: ContentConfigurationElements,
  +activeOptions: Array<ChoiceAttributeOptionModel>,
  +placeholder: string,
  +onClick: Function,
};

const StyledReadonlyOptions = styled.div`
  flex: 1;
  display: block;
  width: 100%;
  height: calc(2.25rem + 2px);
  padding: ${spacers(0.375, 0.75)};
  font-size: ${themeProp("FONT_SIZE_BASE", "1rem")};
  font-weight: 400;
  line-height: 1.5;
  color: ${themeProp("GREY_700", "#495057")};
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid ${themeProp("GREY_400", "ced4da")};
  ${roundedCorners()};
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  ${(props) =>
    props.isEmpty &&
    css`
      padding-left: 0;
      text-decoration: underline;
      border: 0;
      box-shadow: none;
    `}
`;

const LookupReadonlyOptions = ({
  className,
  activeOptions,
  optionContentConfiguration,
  isMultiple,
  placeholder,
  onClick,
}: Props) => (
  <StyledReadonlyOptions
    className={classNames("lookup-active-options form-control", className)}
    tabIndex="0"
    onClick={onClick}
    onKeyDown={onClick}
    role="button"
    isEmpty={activeOptions.length === 0}
  >
    {activeOptions.length === 0 && (
      <span className="placeholder">{placeholder}</span>
    )}
    {activeOptions.map((option) => (
      <ChoiceOption
        key={option.code}
        option={option}
        optionContentConfiguration={optionContentConfiguration}
        isMultiple={isMultiple}
        isRemovable={false}
      />
    ))}
  </StyledReadonlyOptions>
);

LookupReadonlyOptions.displayName = "BI.LookupReadonlyOptions";

export default LookupReadonlyOptions;
