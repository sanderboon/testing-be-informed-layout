declare class dataFetcher {
  static fetch(url: string, options?: Object): any;
  status: number;
}

declare type HttpServletRequestJava = {
  getPathInfo(): string,
  getQueryString(): string | null,
  getFullRequestUrl(): string,
  getAcceptLanguage(): string | null,
  getHeader(headerName: string): string | null,
  getAllCookies(): Map<string, string>,
  getCookies(): {
    [idx: string]: {
      getName: () => string,
      getValue: () => string,
    },
  },
  getCookieByName(cookieName: string): string | null,
};

declare class preferencesProvider {
  static getLayoutConfigFileLocation(): string | null;
  static getContextPath(): string | null;
  static getPreferenceByName(perferenceName: string): string | null;
  static isStudioContext(): boolean;
}
