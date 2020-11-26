// @flow
export { default as BreadcrumbItem } from "beinformed-ui/Breadcrumb/BreadcrumbItem";

import { default as _Breadcrumb } from "beinformed-ui/Breadcrumb/Breadcrumb";
import { connector as connectBreadcrumb } from "beinformed/connectors/Breadcrumb";
export const ConnectedBreadcrumb = connectBreadcrumb(_Breadcrumb);
