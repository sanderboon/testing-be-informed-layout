// @flow
import classNames from "classnames";
import {
  mdiCheckboxBlankOutline,
  mdiCheckboxMarkedOutline,
  mdiRadioboxBlank,
  mdiRadioboxMarked,
} from "@mdi/js";

import { Icon } from "_component-registry/icon";

export type Props = {
  +className?: string,
  +selectType?: "single" | "multi",
  +isSelected: boolean,
};

const ListItemSelect = ({
  className,
  selectType,
  isSelected,
  ...otherProps
}: Props) => {
  const selectClass = classNames("listitem-option", className, {
    "is-selected": isSelected,
  });

  let iconPath = mdiCheckboxBlankOutline;

  if (selectType === "single" && isSelected) {
    iconPath = mdiRadioboxMarked;
  } else if (selectType === "single") {
    iconPath = mdiRadioboxBlank;
  } else if (isSelected) {
    iconPath = mdiCheckboxMarkedOutline;
  }

  return <Icon {...otherProps} className={selectClass} path={iconPath} />;
};

ListItemSelect.displayName = "BI.ListItemSelect";

export default ListItemSelect;
