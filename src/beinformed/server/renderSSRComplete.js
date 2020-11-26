// @flow
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { StaticRouter as Router } from "react-router";

import { HelmetProvider } from "react-helmet-async";

import { ServerStyleSheet, StyleSheetManager } from "styled-components";

import render from "beinformed/server/render";
import htmlpage from "beinformed/server/htmlpage";

import { BASE } from "beinformed/constants/Constants";

import { ThemeProvider } from "_component-registry/main";
import { ErrorBoundary, ErrorPage } from "_component-registry/errors";
import { ConnectedApplication } from "_component-registry/application";

import { createHead, handleErrors, dehydrate } from "./serverUtil";

import type { Href } from "beinformed/models";

const renderSSRComplete = (
  store: any,
  theme: Object = {},
  UUID: string = "",
  requestHref: Href
) => {
  const helmetContext = {};
  const routerContext = {};

  const sheet = new ServerStyleSheet();

  return render(store, () =>
    renderToString(
      <Provider store={store}>
        <StyleSheetManager sheet={sheet.instance}>
          <ThemeProvider theme={theme}>
            <HelmetProvider context={helmetContext}>
              <ErrorBoundary>
                <Router
                  basename={BASE}
                  location={requestHref.toLocation()}
                  context={routerContext}
                >
                  <ConnectedApplication />
                </Router>
              </ErrorBoundary>
            </HelmetProvider>
          </ThemeProvider>
        </StyleSheetManager>
      </Provider>
    )
  )
    .then((appHTML) => {
      handleErrors(store);
      const head = createHead(sheet, UUID, helmetContext);
      return htmlpage(BASE, appHTML, head, dehydrate(store), UUID);
    })
    .catch((error) =>
      htmlpage(
        BASE,
        renderToString(
          <StyleSheetManager sheet={sheet.instance}>
            <ThemeProvider theme={theme}>
              <ErrorPage
                errorMessage={error.message}
                errorResource={error.fileName}
                errorLine={error.lineNumber}
                errorStack={error.stack}
              />
            </ThemeProvider>
          </StyleSheetManager>
        ),
        helmetContext.helmet,
        "",
        UUID
      )
    );
};

export default renderSSRComplete;
