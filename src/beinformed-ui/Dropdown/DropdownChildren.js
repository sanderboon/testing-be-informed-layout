// @flow
import { useRef, useState, useLayoutEffect, Children } from "react";

import classNames from "classnames";

import {
  DropdownChild,
  StyledDropdownChildren,
  typeof DropdownItem,
  typeof DropdownLink,
} from "_component-registry/dropdown";

import typeof { Action } from "_component-registry/actions";
import typeof { SelectInputAvailableOption } from "_component-registry/input";
import typeof { SortChooserOption } from "_component-registry/sorting";

import type { Element, ChildrenArray } from "react";
export type DropdownChildTypes =
  | Element<DropdownItem>
  | Element<DropdownLink>
  | Element<Action>
  | Element<SelectInputAvailableOption>
  | Element<SortChooserOption>;

export type Props = {
  +className?: string,
  +children: ChildrenArray<DropdownChildTypes>,
  +align?: "right" | "left",
  +verticalAlign?: "up" | "down",
  +size?: "small" | "default" | "large",
  +minWidth?: string,
  +maxHeight?: number,
  +wrapContent?: boolean,
  +scrollPosition?: "top" | "middle" | "bottom",
  +onFocus?: (e: SyntheticInputEvent<*>) => void,
  +onBlur?: (e: SyntheticInputEvent<*>) => void,
};

const isFocusable = (element) =>
  element.matches(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

const getMaxHeight = (ref, elementHeight) => {
  if (!ref.current) {
    return 0;
  }

  const domRect = ref.current.getBoundingClientRect();
  const spaceAvailable = window.innerHeight - domRect.top;

  if (elementHeight < spaceAvailable) {
    return elementHeight;
  } else if (spaceAvailable < 150) {
    return 150;
  }

  return spaceAvailable;
};

const scrollTo = (ref, scrollPosition, elementHeight) => {
  if (ref.current) {
    if (scrollPosition === "top") {
      ref.current.scrollTop = 0;
    } else if (scrollPosition === "middle") {
      ref.current.scrollTop = elementHeight / 2;
    } else if (scrollPosition === "bottom") {
      ref.current.scrollTop = elementHeight;
    }
  }
};

const DropdownChildren = ({
  className,
  children,
  align,
  verticalAlign,
  size,
  minWidth,
  maxHeight,
  wrapContent,
  scrollPosition,
  onBlur,
  onFocus,
}: Props) => {
  const _ref = useRef<HTMLDivElement | null>(null);

  const [active, setActive] = useState(0);
  const [calculatedMaxHeight, setCalculatedMaxHeight] = useState(null);

  const goUp = (nodes, currentPos) => {
    const lastPos = nodes.length - 1;
    const upPos = currentPos === 0 ? lastPos : currentPos - 1;

    return isFocusable(nodes[upPos]) ? upPos : goUp(nodes, upPos);
  };

  const goDown = (nodes, currentPos) => {
    const lastPos = nodes.length - 1;
    const downPos = currentPos === lastPos ? 0 : currentPos + 1;

    return isFocusable(nodes[downPos]) ? downPos : goDown(nodes, downPos);
  };

  const handleKeyDown = (e: SyntheticKeyboardEvent<*>) => {
    const nodes = [...e.currentTarget.children];
    const currentPosition = nodes.indexOf(e.target);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive(goDown(nodes, currentPosition));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive(goUp(nodes, currentPosition));
    }
  };

  useLayoutEffect(() => {
    if (_ref.current) {
      const domRect = _ref.current.getBoundingClientRect();
      const elementHeight = domRect.height;

      const calculatedHeight = getMaxHeight(_ref, elementHeight);
      if (maxHeight && calculatedHeight > maxHeight) {
        setCalculatedMaxHeight(maxHeight);
      } else {
        setCalculatedMaxHeight(calculatedHeight);
      }

      const _timer = setTimeout(() => {
        scrollTo(_ref, scrollPosition, elementHeight);
      }, 100);

      return () => {
        clearTimeout(_timer);
      };
    }
  }, [maxHeight, scrollPosition]);

  return (
    <StyledDropdownChildren
      ref={_ref}
      className={classNames("dropdown-menu", className)}
      align={align}
      verticalAlign={verticalAlign}
      size={size}
      role="listbox"
      minWidth={minWidth}
      maxHeight={calculatedMaxHeight}
      wrapContent={wrapContent}
      onKeyDown={handleKeyDown}
      onBlur={onBlur}
      onFocus={onFocus}
    >
      {Children.map(children, (child, idx) => (
        <DropdownChild
          key={`child-${child.key || idx}`}
          child={child}
          isActive={idx === active}
        />
      ))}
    </StyledDropdownChildren>
  );
};

DropdownChildren.displayName = "BI.DropdownChildren";

export default DropdownChildren;
