// @flow
import { Component, createRef } from "react";

import styled from "styled-components";

import { ButtonErrorPopoverView } from "_component-registry/button-error-popover";

import { KEYCODES } from "beinformed/constants/Constants";

import type { Node } from "react";
import type { AttributeType, FormModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +buttonStyle?: "DEFAULT" | "PRIMARY" | "SECONDARY" | "DANGER" | "LINK",
  +children?: Node,
  +form: FormModel,
  +name: string,
  +type?: "button" | "submit" | "reset",
  +isDisabled?: boolean,
};

type State = {
  show: boolean,
};

const StyledWrapper = styled.span`
  z-index: 999;
`;

/**
 * Render disabled button with popover functionality to show errors on hover
 */
class ButtonErrorPopover extends Component<Props, State> {
  _button = createRef<typeof StyledWrapper>();
  _timeoutId: TimeoutID;

  state: State = {
    show: false,
  };

  watchForNativeMouseLeave() {
    if (this._button.current) {
      this._button.current.addEventListener("mouseleave", this.handleLeave);
    }
  }

  removeWatchForNativeMouseLeave() {
    if (this._button.current) {
      this._button.current.removeEventListener("mouseleave", this.handleLeave);
    }
  }

  /**
   * @override
   * onMouseLeave doesn't work on disabled elements.
   * https://github.com/facebook/react/issues/4251
   */
  componentDidMount() {
    this.watchForNativeMouseLeave();
  }

  componentWillUnmount() {
    this.removeWatchForNativeMouseLeave();

    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
    }
  }

  componentDidUpdate() {
    this.watchForNativeMouseLeave();
  }

  /**
   * Event that is triggert mouse leaves the error button
   */
  handleLeave = () => {
    const POPOVER_TIMEOUT = 200;

    this._timeoutId = setTimeout(() => {
      if (this._button.current) {
        this.setState({
          show: false,
        });
      }
    }, POPOVER_TIMEOUT);
  };

  /**
   * Handle click on disabled button
   */
  handleDisabledButton = (
    e:
      | SyntheticMouseEvent<HTMLButtonElement>
      | SyntheticKeyboardEvent<HTMLButtonElement>
  ) => {
    if (
      this.props.form.isValid ||
      (e.type === "keydown" && e.keyCode === KEYCODES.TAB)
    ) {
      return;
    }

    e.preventDefault();
  };

  /**
   * Event that is triggert mouse enters the error button
   */
  handleEnter = () => {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
    }

    this.setState({
      show: true,
    });
  };

  /**
   * Retrieve element to focus
   */
  getFocusElementByID(id: string) {
    const gotoElement = document.querySelector(id);

    if (gotoElement) {
      if (gotoElement.tagName === "INPUT" || gotoElement.tagName === "SELECT") {
        return gotoElement;
      }

      const gotoElementInputs = gotoElement.querySelectorAll("input, select");

      if (gotoElementInputs.length > 0) {
        return gotoElementInputs[0];
      }
    }

    const modal = document.querySelector(".modal");
    const allInputs = modal
      ? modal.querySelectorAll("input, select")
      : document.querySelectorAll("input, select");

    if (allInputs.length > 0) {
      return allInputs[0];
    }

    return null;
  }

  /**
   * Handles click on the link of an attribute that is in error
   */
  handleErrorAttributeClick = (attribute: AttributeType) => {
    const focusElement = this.getFocusElementByID(
      `${this.props.form.key}-${attribute.name}`
    );

    if (focusElement) {
      focusElement.focus();
    }
  };

  render() {
    const {
      className,
      form,
      type,
      name,
      buttonStyle,
      children,
      isDisabled,
    } = this.props;

    return (
      <ButtonErrorPopoverView
        ref={this._button}
        className={className}
        form={form}
        type={type}
        name={name}
        buttonStyle={buttonStyle}
        isDisabled={isDisabled}
        show={this.state.show}
        onMouseEnter={this.handleEnter}
        onMouseLeave={this.handleLeave}
        onFocus={this.handleEnter}
        onBlur={this.handleLeave}
        onClick={this.handleDisabledButton}
        onKeyDown={this.handleDisabledButton}
      >
        {children}
      </ButtonErrorPopoverView>
    );
  }
}

ButtonErrorPopover.displayName = "BI.ButtonErrorPopover";

export default ButtonErrorPopover;
