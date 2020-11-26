// @flow
import { Helmet } from "react-helmet-async";

import favicon from "./favicon/favicon.ico";
import favicon192 from "./favicon/favicon-192.png";
import favicon96 from "./favicon/favicon-96.png";
import favicon64 from "./favicon/favicon-64.png";
import favicon32 from "./favicon/favicon-32.png";
import favicon16 from "./favicon/favicon-16.png";
import favicon57 from "./favicon/favicon-57.png";
import favicon114 from "./favicon/favicon-114.png";
import favicon72 from "./favicon/favicon-72.png";
import favicon144 from "./favicon/favicon-144.png";
import favicon60 from "./favicon/favicon-60.png";
import favicon120 from "./favicon/favicon-120.png";
import favicon76 from "./favicon/favicon-76.png";
import favicon152 from "./favicon/favicon-152.png";
import favicon180 from "./favicon/favicon-180.png";
import favicon512 from "./favicon/favicon-512.png";
import browserconfig from "./favicon/browserconfig.xml";

const Favicon = () => (
  <Helmet>
    <meta name="msapplication-TileColor" content="#ffffff" />
    <meta name="msapplication-TileImage" content={favicon144} />
    <meta name="msapplication-config" content={browserconfig} />

    <link rel="shortcut icon" href={favicon} />

    <link rel="icon" sizes="16x16 32x32 48x48" href={favicon} />
    <link rel="icon" sizes="512x512" href={favicon512} />
    <link rel="icon" sizes="196x196" href={favicon192} />
    <link rel="icon" sizes="96x96" href={favicon96} />
    <link rel="icon" sizes="64x64" href={favicon64} />
    <link rel="icon" sizes="32x32" href={favicon32} />
    <link rel="icon" sizes="16x16" href={favicon16} />

    <link rel="apple-touch-icon" href={favicon57} />
    <link rel="apple-touch-icon" sizes="114x114" href={favicon114} />
    <link rel="apple-touch-icon" sizes="72x72" href={favicon72} />
    <link rel="apple-touch-icon" sizes="144x144" href={favicon144} />
    <link rel="apple-touch-icon" sizes="60x60" href={favicon60} />
    <link rel="apple-touch-icon" sizes="120x120" href={favicon120} />
    <link rel="apple-touch-icon" sizes="76x76" href={favicon76} />
    <link rel="apple-touch-icon" sizes="152x152" href={favicon152} />
    <link rel="apple-touch-icon" sizes="180x180" href={favicon180} />
  </Helmet>
);
Favicon.displayName = "BI.Favicon";

export default Favicon;
