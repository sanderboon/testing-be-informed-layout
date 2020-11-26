// @flow
import classNames from "classnames";

import {
  GroupingPanelPanels,
  GroupingPanelTaskGroups,
} from "_component-registry/groupingpanel";
import { Panel, PanelBody, PanelTitle } from "_component-registry/panel";
import { FormRoute } from "_component-registry/routes";
import { Row } from "_component-registry/grid";

import type { GroupingPanelModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +panel: GroupingPanelModel,
  +isTab?: boolean,
  +isRoot?: boolean,
};

/**
 * Rendering of a GroupingPanel
 */
const GroupingPanel = ({ className, panel, isTab, isRoot }: Props) => {
  // When more than one panel, and the caseview where this grouping panel belongs to is not a Stages View, then render tabs
  const renderAsOverview = panel.links.size === 1 || isTab || isRoot;

  return (
    <Panel
      dataId={panel.key}
      className={classNames("groupingpanel", className)}
    >
      {(isRoot || !renderAsOverview) && <PanelTitle>{panel.label}</PanelTitle>}
      <PanelBody>
        <Row>
          <GroupingPanelPanels
            hasTasks={panel.hasTasks()}
            panel={panel}
            renderAsOverview={renderAsOverview}
          />

          {panel.hasTasks() && <GroupingPanelTaskGroups panel={panel} />}
        </Row>

        <FormRoute model={panel} />
      </PanelBody>
    </Panel>
  );
};

GroupingPanel.displayName = "BI.GroupingPanel";

export default GroupingPanel;
