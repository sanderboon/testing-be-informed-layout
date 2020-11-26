// @flow
export { default as Main } from "beinformed-ui/Main/Main";

export { default as ThemeProvider } from "beinformed-ui/Theme/ThemeProvider";
export { default as ResetBrowserStyles } from "beinformed-ui/Theme/ResetBrowserStyles";
export { default as GlobalStyles } from "beinformed-ui/Theme/GlobalStyles";

/* Main */
export { default as HTMLHead } from "beinformed-ui/HTMLHead/HTMLHead";
export { default as Favicon } from "beinformed-ui/Favicon/Favicon";
export { default as NoScript } from "beinformed-ui/NoScript/NoScript";
export { default as NotFound } from "beinformed-ui/NotFound/NotFound";

import { default as _ProgressIndicator } from "beinformed-ui/ProgressIndicator/ProgressIndicator";
import { connector as connectProgressIndicator } from "beinformed/connectors/ProgressIndicator";
export const ConnectedProgressIndicator = connectProgressIndicator(
  _ProgressIndicator
);
