// @flow
import classNames from "classnames";

import {
  HTMLHead,
  ResetBrowserStyles,
  GlobalStyles,
  ConnectedProgressIndicator,
} from "_component-registry/main";

import { RootRoute } from "_component-registry/routes";

import type { Node } from "react";
export type Props = {
  +className?: string,
  +title: string,
  +locale: string,
  +children?: Node,
};

const Main = ({ className, title, locale, children }: Props) => (
  <>
    <ResetBrowserStyles />
    <GlobalStyles />
    <RootRoute>
      <div className={classNames("application", className)}>
        <HTMLHead title={title} locale={locale} />
        {children}
        <ConnectedProgressIndicator />
      </div>
    </RootRoute>
  </>
);

Main.displayName = "BI.Main";

export default Main;
