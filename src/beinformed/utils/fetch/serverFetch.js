// @flow
import { BASE } from "beinformed/constants/Constants";
import { FetchException } from "beinformed/exceptions";

/**
 * Fetch data from server (uses nashorn and datafetcher).
 */
export default function serverFetch(args: Object): Promise<Object> {
  // remove contextPath of url, when the request is internal the context path is not needed
  const urlNoBase = args.url.includes("http")
    ? args.url
    : args.url.replace(BASE, "");
  const params = args.params
    ? args.params.replace("includeContext=true", "")
    : "";
  const url = params === "" ? urlNoBase : `${urlNoBase}?${params}`;

  const data = dataFetcher.fetch(url, args);

  try {
    const jsonData = JSON.parse(data);

    if (jsonData.error) {
      return Promise.reject(new FetchException(jsonData, null, args));
    }

    return Promise.resolve(jsonData);
  } catch (error) {
    return Promise.reject(error);
  }
}
