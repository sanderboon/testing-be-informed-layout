// @flow
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import { Router } from "react-router";

import { ThemeProvider } from "_component-registry/main";
import { ConnectedApplication } from "_component-registry/application";

import { ErrorBoundary } from "_component-registry/errors";

// if (process.env.NODE_ENV !== "production") {
//   const whyDidYouRender = require("@welldone-software/why-did-you-render");
//   whyDidYouRender(React, {
//     include: [/(Language)/],
//     exclude: [/(StyledComponent)/]
//   });
// }

export type Props = {
  +store: any,
  +history: any,
  +contextPath: any,
  +theme: ?Object,
};

const Init = ({ store, history, contextPath, theme }: Props) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <HelmetProvider>
        <ErrorBoundary>
          <Router history={history} basename={contextPath}>
            <ConnectedApplication />
          </Router>
        </ErrorBoundary>
      </HelmetProvider>
    </ThemeProvider>
  </Provider>
);

Init.displayName = "BI.Init";

export default Init;
