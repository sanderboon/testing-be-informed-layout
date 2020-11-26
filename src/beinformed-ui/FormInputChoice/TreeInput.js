// @flow
import { Component } from "react";

import classNames from "classnames";
import styled from "styled-components";
import { spacer } from "beinformed/theme/utils";

import {
  CheckboxInput,
  RadioInput,
  TreeInputToggle,
} from "_component-registry/input";

import { FormContentRenderer } from "_component-registry/formcontent";

import { KEYCODES } from "beinformed/constants/Constants";

import type {
  ChoiceAttributeOptionModel,
  ContentConfigurationElements,
} from "beinformed/models";
export type Props = {
  +ariaLabel?: string,
  +ariaLabelledBy?: string,
  +className?: string,
  +disabled?: boolean,
  +id?: string,
  +label?: string,
  +level: number,
  +name: string,
  +optionContentConfiguration?: ContentConfigurationElements | null,
  +options: Array<ChoiceAttributeOptionModel>,
  +readOnly?: boolean,
  +stacked?: boolean,
  +type: "checkbox" | "radiobutton",
  +inError?: boolean,
  +onBlur?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  +onChange: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  +onFocus?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
};

type State = {
  visible: Array<string>,
};

const StyledTree = styled.ul`
  list-style: none;
  padding-left: ${spacer(1.5)};
`;

const StyledFormContent = styled(FormContentRenderer)`
  padding-left: ${spacer(1.5)};
`;

/**
 * Render a {@see https://facebook.github.io/react/docs/forms.html#uncontrolled-components|controlled} checkbox input with label
 * behind the checkbox
 */
class TreeInput extends Component<Props, State> {
  static defaultProps = {
    level: 0,
  };

  state: State = {
    visible: [],
  };

  /**
   * Toggle child nodes when enter or space is pressed
   */
  handleToggleKeydown = (
    e: SyntheticKeyboardEvent<*>,
    option: ChoiceAttributeOptionModel
  ) => {
    if (e.keyCode === KEYCODES.ENTER || e.keyCode === KEYCODES.SPACE) {
      this.handleToggleClick(e, option);
    }
  };

  /**
   * Toggle child nodes
   */
  handleToggleClick = (
    e: SyntheticEvent<*>,
    option: ChoiceAttributeOptionModel
  ) => {
    e.preventDefault();

    const { visible } = this.state;
    const optionIndex = this.state.visible.indexOf(option.code);

    if (optionIndex === -1) {
      visible.push(option.code);
    } else {
      visible.splice(optionIndex);
    }

    this.setState({
      visible,
    });
  };

  render() {
    const {
      level,
      className,
      ariaLabel,
      id,
      name,
      type,
      options,
      disabled,
      readOnly,
      inError,
      stacked,
      optionContentConfiguration,
      onFocus,
      onChange,
      onBlur,
    } = this.props;

    const rootClass = level === 0 ? classNames("tree-input", className) : "";

    let ariaLabelledBy = void 0;
    if (!ariaLabel) {
      ariaLabelledBy = this.props.ariaLabelledBy || `${id || name}-label`;
    }

    const ChoiceInputType = type === "radiobutton" ? RadioInput : CheckboxInput;

    return (
      <StyledTree
        className={rootClass}
        role="tree"
        id={`${id || name}-${level}`}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
      >
        {options.map((option) => (
          <li key={option.code} role="treeitem">
            {option.children.hasItems && (
              <TreeInputToggle
                expanded={this.state.visible.includes(option.code)}
                id={id || name}
                option={option}
                onClick={this.handleToggleClick}
                onKeyDown={this.handleToggleKeydown}
              />
            )}

            <ChoiceInputType
              name={name}
              id={id || name}
              label={option.label}
              value={option.code}
              isChecked={option.selected}
              disabled={disabled || readOnly}
              inError={inError}
              count={option.count}
              stacked={stacked}
              onChange={onChange}
              onBlur={onBlur}
              onFocus={onFocus}
            />

            {option.concept && optionContentConfiguration && (
              <StyledFormContent
                concept={option.concept}
                contentConfiguration={optionContentConfiguration}
              />
            )}

            {option.children && this.state.visible.includes(option.code) && (
              <TreeInput
                {...this.props}
                options={option.children.all}
                level={level + 1}
              />
            )}
          </li>
        ))}
      </StyledTree>
    );
  }
}

TreeInput.displayName = "BI.TreeInput";

export default TreeInput;
