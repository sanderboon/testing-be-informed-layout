// @flow
import classNames from "classnames";

import { ActionChooser } from "_component-registry/actions";
import { PanelFooter } from "_component-registry/panel";

import type { DetailModel } from "beinformed/models";
export type Props = { +className?: string, +detail: DetailModel };

/**
 * Render detail footer with actions
 */
const DetailPanelFooter = ({ className, detail }: Props) => (
  <PanelFooter className={classNames("detail-panel-footer", className)}>
    {detail.actionCollection.hasItems && (
      <ActionChooser actions={detail.actionCollection.all} direction="up" />
    )}
  </PanelFooter>
);

DetailPanelFooter.displayName = "BI.DetailPanelFooter";

export default DetailPanelFooter;
