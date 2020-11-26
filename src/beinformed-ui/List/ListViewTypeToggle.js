// @flow
import styled from "styled-components";
import { spacer } from "beinformed/theme/utils";

import { useMessage } from "beinformed/i18n";

import { ListViewTypeToggleItem } from "_component-registry/list";
import { Toggle } from "_component-registry/toggle";

export type Props = {
  +className?: string,
  +activeType: string,
  +availableViews: Array<{
    type: string,
    icon: any,
    label: string,
  }>,
  +listKey: string,
  +onChange: (value: string) => void,
};

const StyledToggle = styled(Toggle)`
  margin-left: ${spacer(0.25)};
`;

/**
 * Render type that is active, used to render the correct child element
 */
const ListViewTypeToggle = ({
  className,
  activeType,
  availableViews,
  listKey,
  onChange,
}: Props) => {
  const ariaLabel = useMessage(
    "ListViewTypeToggle.AriaLabel",
    "List type toggler"
  );
  if (Array.isArray(availableViews)) {
    return (
      <StyledToggle className={className} ariaLabel={ariaLabel}>
        {availableViews.map((view) => (
          <ListViewTypeToggleItem
            key={`toggle-${listKey}-${view.type}`}
            listKey={listKey}
            type={view.type}
            label={view.label}
            isActive={activeType === view.type}
            icon={view.icon}
            onChange={onChange}
          />
        ))}
      </StyledToggle>
    );
  }

  return null;
};

ListViewTypeToggle.displayName = "BI.ListViewTypeToggle";

export default ListViewTypeToggle;
