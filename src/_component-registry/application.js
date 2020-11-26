// @flow
import { default as _Application } from "beinformed-ui/Application/Application";
import { connector as connectApplication } from "beinformed/connectors/Application";
export const ConnectedApplication = connectApplication(_Application);

export { default as ApplicationHeader } from "beinformed-ui/ApplicationHeader/ApplicationHeader";
