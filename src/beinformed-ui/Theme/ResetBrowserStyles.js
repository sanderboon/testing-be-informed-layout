// @flow

/* stylelint-disable property-no-vendor-prefix  */

// Main styles are forked from Bootstraps reboot css.
// Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
//
// Normalize is licensed MIT. https://github.com/necolas/normalize.css

import { createGlobalStyle } from "styled-components";
import { themeProp, spacers, spacer } from "beinformed/theme/utils";

const ResetBrowserStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    font-family: sans-serif;
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
    -ms-overflow-style: scrollbar;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  @-ms-viewport {
    width: device-width;
  }

  article,
  aside,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  main,
  nav,
  section {
    display: block;
  }

  body {
    margin: 0;
    font-family: ${themeProp("FONT_FAMILY_BASE")};
    font-size: ${themeProp("FONT_SIZE_BASE", "1rem")};
    font-weight: ${themeProp("FONT_WEIGHT_NORMAL", 400)};
    line-height: ${themeProp("LINE_HEIGHT_BASE", 1.5)};
    color: ${themeProp("BODY_COLOR", "#212529")};
    text-align: left;
    background-color: ${themeProp("BODY_BG", "#fff")};
  }

  /* stylelint-disable */
  [tabindex="-1"]:focus {
    outline: 0 !important;
    box-shadow: none;
  }
  /* stylelint-enable */

  hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
    margin-bottom: ${themeProp("HEADINGS_MARGIN_BOTTOM", "0.5rem")};
  }

  p {
    margin-top: 0;
    margin-bottom: ${themeProp("PARAGRAPH_MARGIN_BOTTOM", "1rem")};
  }

  abbr[title],
  abbr[data-original-title] {
    text-decoration: underline dotted;
    cursor: help;
    border-bottom: 0;
  }

  address {
    margin-bottom: ${spacer()};
    font-style: normal;
    line-height: inherit;
  }

  ol,
  ul,
  dl {
    margin-top: 0;
    margin-bottom: ${spacer()};
  }

  ol ol,
  ul ul,
  ol ul,
  ul ol {
    margin-bottom: 0;
  }

  dt {
    font-weight: 700;
  }

  dd {
    margin-bottom: ${spacer(0.5)};
    margin-left: 0;
  }

  blockquote {
    margin: ${spacers(0, 0, 1)};
  }

  b,
  strong {
    font-weight: bolder;
  }

  small {
    font-size: 80%;
  }

  sub,
  sup {
    position: relative;
    font-size: 75%;
    line-height: 0;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  a {
    color: ${themeProp("LINK_COLOR", "#007bff")};
    text-decoration: ${themeProp("LINK_DECORATION", "none")};
    background-color: transparent;
  }

  a:focus,
  a:hover {
    color: ${themeProp("LINK_HOVER_COLOR", "#007bff")};
    text-decoration: ${themeProp("LINK_HOVER_DECORATION", "underline")};
  }

  a:not([href]):not([tabindex]) {
    color: inherit;
    text-decoration: none;
  }

  a:not([href]):not([tabindex]):hover,
  a:not([href]):not([tabindex]):focus {
    color: inherit;
    text-decoration: none;
  }

  /* stylelint-disable */
  a:not([href]):not([tabindex]):focus {
    outline: 0;
  }
  /* stylelint-enable */

  pre,
  code,
  kbd,
  samp {
    font-family: ${themeProp(
      "FONT_FAMILY_MONOSPACE",
      'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
    )};
    font-size: 1em;
  }

  pre {
    margin-top: 0;
    margin-bottom: ${spacer()};
    overflow: auto;
    -ms-overflow-style: scrollbar;
  }

  figure {
    margin: ${spacers(0, 0, 1)};
  }

  img {
    vertical-align: middle;
    border-style: none;
  }

  svg {
    overflow: hidden;
    vertical-align: middle;
  }

  table {
    border-collapse: collapse;
  }

  caption {
    padding-top: ${spacer(0.75)};
    padding-bottom: ${spacer(0.75)};
    color: ${themeProp("GREY_600", "#6c757d")};
    text-align: left;
    caption-side: bottom;
  }

  th {
    text-align: inherit;
  }

  label {
    display: inline-block;
    margin-bottom: ${spacer(0.5)};
  }

  button {
    border-radius: 0;
  }

  input,
  button,
  select,
  optgroup,
  textarea {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  button,
  input {
    overflow: visible;
  }

  button,
  select {
    text-transform: none;
  }

  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: button;
  }

  button::-moz-focus-inner,
  [type="button"]::-moz-focus-inner,
  [type="reset"]::-moz-focus-inner,
  [type="submit"]::-moz-focus-inner {
    padding: 0;
    border-style: none;
  }

  input[type="radio"],
  input[type="checkbox"] {
    box-sizing: border-box;
    padding: 0;
  }

  input[type="date"],
  input[type="time"],
  input[type="datetime-local"],
  input[type="month"] {
    -webkit-appearance: listbox;
  }

  textarea {
    overflow: auto;
    resize: vertical;
  }

  fieldset {
    min-width: 0;
    padding: 0;
    margin: 0;
    border: 0;
  }

  legend {
    display: block;
    width: 100%;
    max-width: 100%;
    padding: 0;
    margin-bottom: ${spacer(0.5)};
    font-size: 1.5rem;
    line-height: inherit;
    color: inherit;
    white-space: normal;
  }

  progress {
    vertical-align: baseline;
  }

  [type="number"]::-webkit-inner-spin-button,
  [type="number"]::-webkit-outer-spin-button {
    height: auto;
  }

  [type="search"] {
    outline-offset: -2px;
    -webkit-appearance: none;
  }

  [type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-file-upload-button {
    font: inherit;
    -webkit-appearance: button;
  }

  output {
    display: inline-block;
  }

  summary {
    display: list-item;
    cursor: pointer;
  }

  template {
    display: none;
  }

  [hidden] {
    display: none !important;
  }
`;

ResetBrowserStyles.displayName = "BI.ResetBrowserStyles";

export default ResetBrowserStyles;
