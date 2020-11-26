// @flow
import { default as _CaseView } from "beinformed-ui/CaseView/CaseView";
import { connector as connectCaseview } from "beinformed/connectors/CaseView";
export const ConnectedCaseView = connectCaseview(_CaseView);

export { default as CaseHeader } from "beinformed-ui/CaseHeader/CaseHeader";
export { default as CaseViewPanels } from "beinformed-ui/CaseViewPanels/CaseViewPanels";
