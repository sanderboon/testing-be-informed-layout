// @flow
import classNames from "classnames";

import { KEEP_SIDEBAR } from "beinformed/constants/LayoutHints";

import { FormattedText } from "_component-registry/text";
import { NavigationTabs } from "_component-registry/navigation";
import { PanelRoute } from "_component-registry/routes";
import { Column } from "_component-registry/grid";
import { GroupingPanelAsOverview } from "_component-registry/groupingpanel";

import type { GroupingPanelModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +hasTasks: boolean,
  +panel: GroupingPanelModel,
  +renderAsOverview?: boolean,
};

const GroupingPanelPanels = ({
  className,
  hasTasks,
  panel,
  renderAsOverview,
}: Props) => (
  <Column
    size={hasTasks || panel.layouthint.has(KEEP_SIDEBAR) ? 9 : null}
    className={classNames("grouping-panel-panels", className)}
  >
    {panel.introtext && (
      <FormattedText className="introtext" text={panel.introtext} />
    )}

    {renderAsOverview ? (
      <GroupingPanelAsOverview panel={panel} />
    ) : (
      [
        <NavigationTabs key="tabs" items={panel.panelLinks} />,
        <PanelRoute key={panel.key} model={panel} />,
      ]
    )}
  </Column>
);

GroupingPanelPanels.displayName = "BI.GroupingPanelPanels";

export default GroupingPanelPanels;
