// @flow
import { useRef, useEffect, cloneElement } from "react";
import { isFunction } from "lodash";

import type { DropdownChildTypes } from "./DropdownChildren";
export type Props = {
  +child: DropdownChildTypes,
  +isActive: boolean,
};

const DropdownChild = ({ child, isActive }: Props) => {
  const _ref = useRef(null);

  useEffect(() => {
    // $FlowFixMe
    if (_ref.current && isActive && isFunction(_ref.current.focus)) {
      _ref.current.focus();
    }
  }, [isActive]);

  return cloneElement(child, {
    ref: (node) => {
      _ref.current = node;
      if (isFunction(child.ref)) {
        child.ref(node);
      } else if (child.ref) {
        child.ref.current = node;
      }
    },
  });
};

export default DropdownChild;
