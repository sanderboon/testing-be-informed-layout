// @flow
import classNames from "classnames";
import styled, { css } from "styled-components";
import { themeProp, roundedCorners, spacers } from "beinformed/theme/utils";

import { useMessage } from "beinformed/i18n";

import { ChoiceOption } from "_component-registry/input";

import type {
  ContentConfigurationElements,
  ChoiceAttributeOptionModel,
} from "beinformed/models";
export type Props = {
  +className?: string,
  +activeOptions: Array<ChoiceAttributeOptionModel>,
  +isMultiple: boolean,
  +isReadOnly?: boolean,
  +isDisabled?: boolean,
  +optionContentConfiguration?: ContentConfigurationElements,
  +onRemove: Function,
  +onOpen: Function,
  +onFocus: Function,
  +onKeyDown: Function,
};

const StyledActiveOptions = styled.div`
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
    props.isEnabled &&
    css`
      display: inline-block;
      padding: ${spacers(0.375, 1.75, 0.375, 0.75)};
      vertical-align: middle;
      background: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e")
        no-repeat right 0.75rem center/8px 10px;
    `}
`;

const LookupOptionsActiveOptions = ({
  className,
  activeOptions,
  isMultiple,
  isReadOnly,
  isDisabled,
  optionContentConfiguration,
  onRemove,
  onOpen,
  onFocus,
  onKeyDown,
}: Props) => {
  const ariaActiveLabel = useMessage(
    "LookupInput.ActiveOptions",
    "Active options"
  );

  return (
    <StyledActiveOptions
      className={classNames("lookup-active-options form-control", className)}
      role="button"
      tabIndex="0"
      aria-haspopup="true"
      aria-label={ariaActiveLabel}
      isEnabled={!isDisabled && !isReadOnly}
      onClick={onOpen}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
    >
      {activeOptions.map((option) => (
        <ChoiceOption
          key={option.code}
          option={option}
          optionContentConfiguration={optionContentConfiguration}
          isMultiple={isMultiple}
          isRemovable={!isReadOnly && !isDisabled}
          onRemove={onRemove}
        />
      ))}
    </StyledActiveOptions>
  );
};
LookupOptionsActiveOptions.displayName = "BI.LookupOptionsActiveOptions";

export default LookupOptionsActiveOptions;
