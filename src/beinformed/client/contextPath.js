// @flow
(function x() {
  const dataElement = document.querySelector(
    'script[type="application/json"][data-app-state="app-json"]'
  );
  if (!dataElement) {
    throw new Error(
      "Error finding script with attribute app-json to retrieve context path"
    );
  }

  const contextPath = dataElement.getAttribute("data-app-contextpath");
  if (contextPath) {
    window.contextPath = contextPath;
  }

  const filePath = dataElement.getAttribute("data-app-filepath");
  if (filePath && filePath !== "{FILEPATH}") {
    __webpack_public_path__ = `${filePath}/`; // NOSONAR
  } else if (contextPath) {
    __webpack_public_path__ = `${contextPath}/`; // NOSONAR
  }

  const nonce = dataElement.getAttribute("data-app-nonce");
  if (nonce) {
    __webpack_nonce__ = nonce; // NOSONAR
  }
})();

export {};
