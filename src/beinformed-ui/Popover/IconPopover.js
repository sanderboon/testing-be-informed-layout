// @flow
import { Component } from "react";

import classNames from "classnames";
import styled from "styled-components";

import { Manager, Popper, Reference } from "react-popper";

import { Popover } from "_component-registry/popover";
import { Icon } from "_component-registry/icon";

export type Props = {
  +className?: string,
  +children?: Node,
  +placement?:
    | "auto"
    | "auto-start"
    | "auto-end"
    | "top"
    | "top-start"
    | "top-end"
    | "right"
    | "right-start"
    | "right-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end",
  +icon?: string,
  +ariaLabel?: string,
};

type State = {
  show: boolean,
  pinned: boolean,
};

const IconButton = styled.button`
  padding: 0;
  background: none;
  border: 0;
`;

class IconPopover extends Component<Props, State> {
  state: State = {
    show: false,
    pinned: false,
  };

  static defaultProps = {
    icon: "help-circle-outline",
    placement: "auto",
  };

  /**
   * componentWillUnmount, removes document wide click event observer
   */
  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick);
  }

  handleMouseEnter = () => {
    this.setState({
      show: true,
    });
  };

  handleMouseLeave = () => {
    if (!this.state.pinned) {
      this.setState({
        show: false,
      });
    }
  };

  handleClick = () => {
    if (this.state.pinned) {
      document.removeEventListener("click", this.handleClick);

      this.setState({
        show: false,
        pinned: false,
      });
    } else {
      document.addEventListener("click", this.handleClick);

      this.setState({
        show: true,
        pinned: true,
      });
    }
  };

  render() {
    const { className, children, placement, icon, ariaLabel } = this.props;

    return (
      <span className={classNames("icon-popover", className)}>
        <Manager>
          <Reference>
            {({ ref }) => (
              <IconButton
                type="button"
                ref={ref}
                className="toggle-popover"
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onClick={this.handleClick}
                aria-label={ariaLabel}
              >
                <Icon name={icon} />
              </IconButton>
            )}
          </Reference>
          {this.state.show && (
            <Popper
              placement={placement}
              modifiers={[{ name: "offset", options: { offset: [0, 10] } }]}
            >
              {(props) => (
                <Popover
                  ref={props.ref}
                  arrowProps={props.arrowProps}
                  placement={props.placement || "auto"}
                  style={props.style}
                >
                  {children}
                </Popover>
              )}
            </Popper>
          )}
        </Manager>
      </span>
    );
  }
}

IconPopover.displayName = "BI.IconPopover";

export default IconPopover;
