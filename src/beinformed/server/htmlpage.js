// @flow
/**
 * Create page html
 */
const htmlpage = (
  contextPath: string,
  application: string,
  head: Object,
  state: string = "",
  UUID: string = ""
) => `
  <!doctype html>
  <html ${head && head.htmlAttributes ? head.htmlAttributes.toString() : ""}>
    <head>
      <meta charset="utf-8" />
      ${Object.keys(head)
        .filter((key) => key !== "htmlAttributes")
        .map((key) => head[key].toString())
        .join("")}
      {CSSASSETS:<link rel="stylesheet" type="text/css" href="${contextPath}/{FILE}" />:CSSASSETS}
    </head>
    <body class="nojs">
      <div id="application">${application}</div>
      <div id="portal"></div>
      <script
        type="application/json"
        data-app-state="app-json"
        data-app-contextpath="${contextPath}"
        data-app-filepath="{FILEPATH}"
        data-app-nonce="${UUID}">${state}</script>
      {JSASSETS:<script src="${contextPath}/{FILE}"></script>:JSASSETS}
    </body>
  </html>
`;

export default htmlpage;
