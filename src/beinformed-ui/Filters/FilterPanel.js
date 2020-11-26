// @flow
import { useState } from "react";

import classNames from "classnames";

import { FilterLabel } from "_component-registry/filters";

import { KEYCODES } from "beinformed/constants/Constants";

import type { Node } from "react";
export type Props = {
  +className?: string,
  +name: string,
  +label: string,
  +contextLabel?: string,
  +children: Node,
};

const FilterPanel = ({
  className,
  name,
  label,
  contextLabel,
  children,
}: Props) => {
  const [open, setOpen] = useState(true);

  const handleToggle = () => {
    setOpen(!open);
  };
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode === KEYCODES.SPACE) {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div
      id={`${name}-body`}
      className={classNames("filter", { isOpen: open }, className)}
      data-id={name}
    >
      <FilterLabel
        name={name}
        label={label}
        contextLabel={contextLabel}
        isOpen={open}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
      />
      {open && <div className="filter-body">{children}</div>}
    </div>
  );
};

FilterPanel.displayName = "BI.FilterPanel";

export default FilterPanel;
