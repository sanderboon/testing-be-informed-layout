// @flow
import { ToggleItem } from "_component-registry/toggle";
import { Icon } from "_component-registry/icon";

import { useMessage } from "beinformed/i18n";

export type Props = {
  +className?: string,
  +listKey: string,
  +type: string,
  +label: string,
  +isActive: boolean,
  +icon: string,
  +onChange: Function,
};

const ListViewTypeToggleItem = ({
  className,
  listKey,
  type,
  label,
  isActive,
  icon,
  onChange,
}: Props) => (
  <ToggleItem
    className={className}
    name={`toggle-${listKey}-${label}`}
    value={type}
    isActive={isActive}
    ariaLabel={useMessage(
      `ListViewTypeToggle.AltText.${type}Toggle`,
      "Show as {VIEWTYPE}",
      { VIEWTYPE: label }
    )}
    onChange={onChange}
  >
    <Icon name={icon} />
  </ToggleItem>
);
ListViewTypeToggleItem.displayName = "BI.ListViewTypeToggleItem";

export default ListViewTypeToggleItem;
