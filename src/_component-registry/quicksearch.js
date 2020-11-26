// @flow
import { default as _QuickSearch } from "beinformed-ui/QuickSearch/QuickSearch";
export { default as QuickSearchChooser } from "beinformed-ui/QuickSearch/QuickSearchChooser";
export { default as QuickSearchInput } from "beinformed-ui/QuickSearch/QuickSearchInput";
export { default as QuickSearchButton } from "beinformed-ui/QuickSearch/QuickSearchButton";
export { default as QuickSearchResults } from "beinformed-ui/QuickSearch/QuickSearchResults";
import { connector as connectQuickSearch } from "beinformed/connectors/QuickSearch";
export const ConnectedQuickSearch = connectQuickSearch(_QuickSearch);
