// @flow
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";
import createStore from "beinformed/redux/configureStore";

import type { Node } from "react";
export type Props = {
  +children?: Node,
};

const ReduxProvider = ({ children }: Props) => {
  // $FlowFixMe
  const { store } = createStore(createMemoryHistory());

  return <Provider store={store}>{children}</Provider>;
};

ReduxProvider.displayName = "Mock.ReduxProvider";

export default ReduxProvider;
