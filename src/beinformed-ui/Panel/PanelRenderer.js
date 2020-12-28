// @flow
import { Redirect } from "react-router-dom";

import {
  GroupingPanelModel,
  ListModel,
  DetailModel,
  ErrorResponse,
} from "beinformed/models";

import { ErrorPanel } from "_component-registry/panel";
import { ListPanel } from "_component-registry/listpanel";
import { GroupingPanel } from "_component-registry/groupingpanel";

import { DetailPanel } from "_component-registry/detailpanel";

import { GOTO_CASEVIEW } from "beinformed/constants/LayoutHints";

export type Props = {
  +className?: string,
  +isTab?: boolean,
  +panel: ListModel | GroupingPanelModel | DetailModel,
  +isRoot?: boolean,
  +panelOptions: { showListFilters?: boolean },
};

/**
 * Render correct panel based on instance of model
 */
const PanelRenderer = ({
  className,
  panel,
  isTab,
  isRoot,
  panelOptions = {},
}: Props) => {
  if (panel instanceof GroupingPanelModel) {
    return (
      <GroupingPanel
        className={className}
        panel={panel}
        isTab={isTab}
        isRoot={isRoot}
      />
     
    );
  }

  if (panel instanceof ListModel) {
    // hide panel when empty and no actions available
    if (panel.shouldHide) {
      return null;
    }

    if (panel.layouthint.has(GOTO_CASEVIEW)) {
      const firstListItem = panel.listItemCollection.first;
      if (firstListItem) {
        return 
          <Redirect to={firstListItem.selfhref.toString()} /> 
          ;
      }
    }

    return (
      <ListPanel
        className={className}
        list={panel}
        isRoot={isRoot}
        showFilters={panelOptions.showListFilters}
      />
    );
  }

  if (panel instanceof DetailModel) {
    return <DetailPanel className={className} detail={panel} />;
  }

  if (panel instanceof ErrorResponse) {
    return <ErrorPanel className={className} error={panel} />;
  }

  return null;
};

PanelRenderer.displayName = "BI.PanelRenderer";

export default PanelRenderer;
