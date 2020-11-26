// @flow
import Href from "beinformed/models/href/Href";

import type { Locales } from "beinformed/i18n";

export const getFullRequestUrl = (request: HttpServletRequestJava) => {
  const pathInfo = request.getPathInfo() || "/";
  const queryString = request.getQueryString();

  if (queryString) {
    return `${pathInfo}?${queryString}`;
  }

  return pathInfo;
};

export const getFullRequestHref = (request: HttpServletRequestJava) =>
  new Href(getFullRequestUrl(request));

export const getCookieFromRequest = (
  request: HttpServletRequestJava,
  cookieName: string
) => {
  return request.getCookieByName(cookieName);
};

export const getPreferredLocale = (
  request: HttpServletRequestJava,
  locales: Locales
) => {
  const languageFromCookie = getCookieFromRequest(request, "locale");
  const acceptLanguageHeader =
    languageFromCookie || request.getHeader("Accept-Language");

  // when no accept language header or cookie present, get first locale code
  if (acceptLanguageHeader === null) {
    return locales.availableLocaleCodes[0];
  }

  return locales.getPreferredLocale(acceptLanguageHeader);
};
