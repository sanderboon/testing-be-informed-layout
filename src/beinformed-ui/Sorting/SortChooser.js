// @flow
import classNames from "classnames";

import { Dropdown, DropdownChildren } from "_component-registry/dropdown";
import {
  SortChooserButton,
  SortChooserOption,
} from "_component-registry/sorting";

import type { ListModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +list: ListModel,
  +size: "small" | "default" | "large",
  +align: "left" | "right",
  +direction?: "down" | "up",
  +onChange?: Function,
};

const SortChooser = ({
  className,
  list,
  size = "small",
  direction,
  align,
  onChange,
}: Props) => {
  const sortedOptions = list.sorting.all.sort((option, nextOption) =>
    option.label.localeCompare(nextOption.label)
  );

  return (
    <Dropdown
      className={classNames("sortchooser", className)}
      activeValue={list.sorting.param}
      direction={direction}
    >
      <SortChooserButton sorting={list.sorting} size={size} />
      <DropdownChildren align={align} size={size}>
        {sortedOptions.map((sortOption) => (
          <SortChooserOption
            key={sortOption.key}
            href={list.sorting.createListHref(list.selfhref, sortOption)}
            option={sortOption}
            onClick={onChange}
          />
        ))}
      </DropdownChildren>
    </Dropdown>
  );
};

SortChooser.displayName = "BI.SortChooser";

export default SortChooser;
