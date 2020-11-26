// @flow
import { memo } from "react";
import classNames from "classnames";

import { List } from "_component-registry/list";
import { Panel, PanelBody } from "_component-registry/panel";

import type { ListModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +list: ListModel,
  +isRoot?: boolean,
  +showFilters?: boolean,
};

/**
 * Render ListPanel
 */
const ListPanel = memo<Props>(
  ({ className, list, isRoot, showFilters }: Props) => (
    <Panel dataId={list.key} className={classNames("listpanel", className)}>
      <PanelBody>
        <List
          className={className}
          list={list}
          isRoot={isRoot}
          showFilters={showFilters}
        />
      </PanelBody>
    </Panel>
  )
);

ListPanel.displayName = "BI.ListPanel";

export default ListPanel;
