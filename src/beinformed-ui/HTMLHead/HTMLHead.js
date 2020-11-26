// @flow
import { Fragment } from "react";
import { Helmet } from "react-helmet-async";

import { Favicon } from "_component-registry/main";

export type Props = { +title: string, +locale: string };

/**
 * Render HTML Head information using React Helmet
 */
const HTMLHead = ({ title, locale }: Props) => (
  <Fragment>
    <Helmet defaultTitle={title} titleTemplate={`${title} - %s`}>
      <html lang={locale} />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
    </Helmet>
    <Favicon />
  </Fragment>
);

HTMLHead.displayName = "BI.HTMLHead";

export default HTMLHead;
