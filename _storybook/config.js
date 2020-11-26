import "@storybook/addon-console";
import { configure, addDecorator, addParameters } from "@storybook/react";
import { DocsPage, DocsContainer } from "@storybook/addon-docs/blocks";
import { withA11y } from "@storybook/addon-a11y";
import { withKnobs } from "@storybook/addon-knobs";

require("focus-visible/dist/focus-visible.min.js");

import React from "react";

import { ThemeProvider } from "_component-registry/main";

import { Provider } from "react-redux";
import createStore from "beinformed/redux/configureStore";
import { createMemoryHistory } from "history";

import { GlobalStyles, ResetBrowserStyles } from "_component-registry/main";

import StoryRouter from "storybook-react-router";

import theme from "./theme";

// add redux store
const { store } = createStore(
  createMemoryHistory({
    initialEntries: ["/"]
  })
);

// add styled-components and redux decorator
addDecorator(story => (
  <Provider store={store}>
    <ThemeProvider>
      <ResetBrowserStyles />
      <GlobalStyles />
      {story()}
    </ThemeProvider>
  </Provider>
));

// react-router
addDecorator(StoryRouter());

// move component from border
addDecorator(story => <div style={{ margin: "1em" }}>{story()}</div>);

addDecorator(withKnobs);
addDecorator(withA11y);

// set parameters
addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage
  },
  knobs: {
    escapeHTML: false
  },
  options: {
    theme
  }
});

// load stories
const load = stories => {
  return stories.keys().map(storyName => stories(storyName));
};
const loaderFn = () => [
  ...load(require.context("../src/_storybook", true, /\.stories\.js$/)),
  ...load(require.context("../src/beinformed-ui", true, /\.stories\.js$/))
];
configure(loaderFn, module);
