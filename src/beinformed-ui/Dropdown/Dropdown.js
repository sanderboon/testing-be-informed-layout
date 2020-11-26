// @flow
import { useEffect, useState, cloneElement, Children } from "react";
import { isFunction } from "lodash";

import classNames from "classnames";
import styled from "styled-components";

import { DropdownChildren } from "_component-registry/dropdown";

/**
 * Dropdown component is a generic component that expects the following structure:
 *
 * <Dropdown>
 *   <Button>
 *   <DropdownChildren />
 * </Dropdown>
 *
 * Button part will receive props to open the dropdown, dropdown children will have all dropdown items
 * Put all logic visible inside the button into a separate component, like TimePickerButtton
 */

const StyledDropdown = styled.div`
  position: relative;
  vertical-align: middle;
  flex-grow: 1;
`;

import type { Node } from "react";
export type Props = {
  +activeValue?: string,
  +children?: Node,
  +className?: string,
  +direction?: "down" | "up",
};

const useEffectHideOptions = (showOptions, setShowOptions) => {
  useEffect(() => {
    const handler = (e: SyntheticKeyboardEvent<*>) => {
      if (e.key && e.key !== "Escape") {
        return;
      }

      e.stopPropagation();
      e.preventDefault();

      setShowOptions(false);
    };

    if (showOptions) {
      window.addEventListener("click", handler);
      window.addEventListener("keydown", handler);
    }

    return () => {
      window.removeEventListener("click", handler);
      window.removeEventListener("keydown", handler);
    };
  }, [showOptions, setShowOptions]);
};

const Dropdown = ({ className, children, activeValue, direction }: Props) => {
  const [showOptions, setShowOptions] = useState(false);
  const [childrenMinWidth, setChildrenMinWidth] = useState(1);

  useEffectHideOptions(showOptions, setShowOptions);

  /**
   * Show children of dropdown, sets document wide click event observer
   */
  const showDropdownChildren = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setShowOptions(!showOptions);
  };

  const renderChildrenComponent = (child: any, key: number) => {
    if (showOptions) {
      return cloneElement(child, {
        key,
        show: true,
        verticalAlign: direction,
        minWidth: child.props.minWidth || `${childrenMinWidth}px`,
      });
    }

    return null;
  };

  const handleToggleRef = (node: any) => {
    const offsetWidth = node && node.offsetWidth ? node.offsetWidth : 1;
    if (childrenMinWidth < offsetWidth) {
      setChildrenMinWidth(offsetWidth);
    }
  };

  const addToggleProps = (child: any, key: number) =>
    cloneElement(child, {
      key,
      onClick: (e) => {
        if (child.props.onClick) {
          child.props.onClick(e);
        }
        return showDropdownChildren(e);
      },
      isExpanded: showOptions,
      ref: (node) => {
        handleToggleRef(node);

        const { ref } = child;
        if (isFunction(ref)) {
          ref(node);
        }
      },
    });

  if (!children) {
    return <div>Missing children in dropdown configuration</div>;
  }

  return (
    <StyledDropdown
      className={classNames("dropdown", className)}
      data-value={activeValue}
    >
      {Children.map(children, (child, i) =>
        child.type.displayName === DropdownChildren.displayName
          ? renderChildrenComponent(child, i)
          : addToggleProps(child, i)
      )}
    </StyledDropdown>
  );
};

Dropdown.displayName = "BI.Dropdown";

export default Dropdown;
