// @flow
import { isUndefined } from "lodash";
/**
 * Indicates if this is a production build
 */
export const IS_DEVELOPMENT = process.env.NODE_ENV !== "production";

export const IS_HMR = !isUndefined(process.env.HMR);

/**
 * Indicates if contributions should be cached
 */
export const USE_CACHE = true;

/**
 * Base path
 *
 * This uses contextPath set from property from server
 *
 * When requesting a remote server with CORS enabled, add the origin, for example:
 * export const BEINFORMED_PATH = 'http://192.168.128.61:8080/BeInformed';
 */
const serverBase =
  typeof __CONTEXT_PATH__ === "undefined" ? null : __CONTEXT_PATH__;
export const BASE = serverBase || window.contextPath || "/BeInformed";

/**
 * Path to the contributions api end point
 * /contributions uri part is added through the _links in the data service
 */
export const MODULARUI_CONTRIBUTIONS = "/contributions";

/**
 * Application uri
 * @type {string}
 */
const APPLICATION_URI = "/";

/**
 * Base Path
 * @type {string}
 */
export const APPLICATION_PATH = BASE + APPLICATION_URI;

// path to content service
export const CONTENT_PATH = `${BASE}/content`;

// Upload Path
export const UPLOAD_PATH = `${BASE}/uploadFile`;

// Captcha Path
export const CAPTCHA_PATH = `${BASE}/captchaServices`;

// Deeplink to login page / component
export const LOGIN_PATH = "/signin";

// Deeplink to logout page / component
export const LOGOUT_PATH = "/signout";

// Deeplink to change password page / component
export const CHANGEPASSWORD_PATH = "/change-password";

// Deeplink to user profile page / component
export const USERPROFILE_PATH = "/user";

// Separator for parameters of a list, makes it possible to render multiple lists on a page in a non-js environment
export const PARAMETER_SEPARATOR = "~";

/**
 * Model Catalog & Source Browser
 */
export const TIMEVERSION_FILTER_NAME = "entryDate";

/**
 * Parameter name for the viewtype toggle
 * @type {string}
 */
const PARAMETER_OVERVIEW_VIEWTYPE = "viewType";
export const UI_PARAMETERS = [PARAMETER_OVERVIEW_VIEWTYPE];

export const ISO_DATE_FORMAT = "yyyy-MM-dd";
export const ISO_TIME_FORMAT = "HH:mm:ss";
export const ISO_TIMESTAMP_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSS";

// Key codes
export const KEYCODES = {
  TAB: 9,
  ENTER: 13,
  ESCAPE: 27,
  SPACE: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40,
};

export const IS_SYNC = typeof dataFetcher !== "undefined";
export const IS_SERVER = IS_SYNC;

export const NOTIFICATION_TYPES = {
  SUCCESS: "SUCCESS",
  INFO: "INFO",
  WARNING: "WARNING",
  ERROR: "ERROR",
};

// SUPPORTED HTTP METHODS
export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
};

// POSSIBLE MODULARUI STATUSSES
export const MODULARUI_STATUS = {
  LOADING: "LOADING",
  FINISHED: "FINISHED",
  ERROR: "ERROR",
};

// POSSIBLE AUTOSAVE STATUSSES
export const AUTOSAVE_STATUS = {
  START: "AUTOSAVE_START",
  FINISHED: "AUTOSAVE_FINISHED",
};

// DEBOUNCE INPUT TIMEOUT
export const INPUT_DEBOUNCE_TIMEOUT = 100;

// DEBOUNCE VALIDATION TIMEOUT
export const VALIDATE_DEBOUNCE_TIMEOUT = 500;
