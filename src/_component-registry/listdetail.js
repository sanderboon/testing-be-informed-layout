// @flow
/* List detail */
export { default as ListDetailEventData } from "beinformed-ui/ListDetail/ListDetailEventData";
export { default as ListDetailFooter } from "beinformed-ui/ListDetail/ListDetailFooter";
export { default as ListDetailInstrumentResult } from "beinformed-ui/ListDetail/ListDetailInstrumentResult";

import { default as _ListDetail } from "beinformed-ui/ListDetail/ListDetail";
import { connector as connectListDetail } from "beinformed/connectors/ListDetail";
export const ConnectedListDetail = connectListDetail(_ListDetail);
