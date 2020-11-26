// @flow
import classNames from "classnames";
import { Panel, PanelBody } from "_component-registry/panel";

import type { ErrorResponse } from "beinformed/models";
export type Props = {
  +className?: string,
  +error: ErrorResponse,
};

const ErrorPanel = ({ className, error }: Props) => (
  <div className={classNames("errorpanel", className)}>
    <Panel>
      <PanelBody>{error.properties.message}</PanelBody>
    </Panel>
  </div>
);

ErrorPanel.displayName = "BI.ErrorPanel";

export default ErrorPanel;
