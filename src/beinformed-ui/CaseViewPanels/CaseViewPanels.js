// @flow
import { NavigationTabs } from "_component-registry/navigation";
import { PanelRoute } from "_component-registry/routes";

import classNames from "classnames";

import type { CaseViewModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +caseview: CaseViewModel,
};

/**
 * Render Case view panels
 */
const CaseViewPanels = ({ className, caseview }: Props) => (
  <div className={classNames("caseview-panels", className)}>
    <NavigationTabs items={caseview.panelLinks} />
    <PanelRoute model={caseview} />
  </div>
);

CaseViewPanels.displayName = "BI.CaseViewPanels";

export default CaseViewPanels;
