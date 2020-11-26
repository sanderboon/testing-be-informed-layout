// @flow
import { renderToString } from "react-dom/server";

import { Provider } from "react-redux";

import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import { ThemeProvider } from "_component-registry/main";

import htmlpage from "beinformed/server/htmlpage";

import { BASE } from "beinformed/constants/Constants";
import NoScript from "beinformed-ui/NoScript/NoScript";
import GlobalStyles from "beinformed-ui/Theme/GlobalStyles";
import ResetBrowserStyles from "beinformed-ui/Theme/ResetBrowserStyles";

import ServerLoader from "beinformed-ui/ProgressIndicator/ServerLoader";

import { createHead, dehydrate } from "./serverUtil";

const renderSSRMinimal = (
  store: any,
  theme: Object = {},
  UUID: string = ""
): string => {
  const sheet = new ServerStyleSheet();

  const appHTML = renderToString(
    <Provider store={store}>
      <StyleSheetManager sheet={sheet.instance}>
        <ThemeProvider theme={theme}>
          <ServerLoader />
          <ResetBrowserStyles />
          <GlobalStyles />
          <NoScript />
        </ThemeProvider>
      </StyleSheetManager>
    </Provider>
  );

  const head = createHead(sheet, UUID);
  return htmlpage(BASE, appHTML, head, dehydrate(store), UUID);
};

export default renderSSRMinimal;
