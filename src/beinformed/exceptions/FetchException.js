// @flow
import { get, has } from "lodash";

const CLIENT_ERROR_CODE = 400;

const getErrorInfo = (
  errorResponse?: ErrorResponseJSON | null,
  requestOptions?: Object = {}
) => {
  const defaultErrorInfo = {
    id: "Error.CannotRequestResource",
    defaultMessage: `Cannot request resource ${requestOptions.url} with method ${requestOptions.method}`,
  };

  if (!errorResponse) {
    return defaultErrorInfo;
  }

  if (has(errorResponse, "error")) {
    return {
      ...defaultErrorInfo,
      ...get(errorResponse, "error", {}),
    };
  }

  const [key] = Object.keys(errorResponse);
  if (has(errorResponse[key], "errors")) {
    return {
      ...defaultErrorInfo,
      ...get(errorResponse[key], "errors", {}),
    };
  }

  return defaultErrorInfo;
};

export default class FetchException extends Error {
  request: XMLHttpRequest | dataFetcher | null;
  status: number;
  response: ErrorResponseJSON | null;
  id: string;
  parameters: any;
  properties: Object;
  action: any;
  requestOptions: Object = {};

  constructor(
    errorResponse: ErrorResponseJSON | null,
    failedRequest?: XMLHttpRequest | dataFetcher | null = null,
    requestOptions?: Object = {}
  ) {
    const errorInfo = getErrorInfo(errorResponse, requestOptions);
    super(errorInfo.id);

    this.name = errorInfo.id;
    this.id = errorInfo.id;
    this.request = failedRequest;
    this.requestOptions = requestOptions;

    this.status =
      failedRequest && failedRequest.status
        ? failedRequest.status
        : CLIENT_ERROR_CODE;

    this.response = errorResponse;
    this.properties = get(errorInfo, "properties", {});
    this.parameters = get(errorInfo, "param", null);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchException);
    }
  }
}
