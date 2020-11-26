// @flow
import { isNil, isPlainObject } from "lodash";

import { IS_SYNC, USE_CACHE } from "beinformed/constants/Constants";
import serverFetch from "beinformed/utils/fetch/serverFetch";
import xhr from "beinformed/utils/fetch/xhr";
import Cache from "beinformed/utils/browser/Cache";

/**
 * Checks each x ms if a cache item is set after fetching the item.
 */
const waitForCachedItem = (cacheKey) => {
  let TIMEOUT = 3000;
  const CHECK_TIMEOUT = 100;

  return new Promise((resolve, reject) => {
    const check = () => {
      if (Cache.getItem(cacheKey) !== "is-fetching") {
        resolve(Cache.getItem(cacheKey));
      } else if ((TIMEOUT -= CHECK_TIMEOUT) < 0) {
        reject(new Error("timed out!"));
      } else {
        setTimeout(check, CHECK_TIMEOUT);
      }
    };
    setTimeout(check, CHECK_TIMEOUT);
  });
};

const browserFetch = (args: Object) => {
  if (USE_CACHE && args.cache) {
    const cacheKey = Cache.createResourceKey(args);

    if (Cache.hasItem(cacheKey)) {
      const cacheItem = Cache.getItem(cacheKey);

      if (!isNil(cacheItem) && cacheItem === "is-fetching") {
        return waitForCachedItem(cacheKey);
      } else if (!isNil(cacheItem) && isPlainObject(cacheItem)) {
        return Promise.resolve(cacheItem);
      }
    }

    Cache.addItem(cacheKey, "is-fetching");
  }

  return xhr(args).then((response) => {
    if (USE_CACHE && args.cache) {
      const cacheKey = Cache.createResourceKey(args);

      Cache.addItem(cacheKey, response);
    }

    return response;
  });
};

/**
 * Request data from server, uses server datafetcher or xhr in browser.
 *
 * @param  {Object} args - Request arguments.
 * @return {Promise|Object} - Returns a Promise when in the client, a response when in the server.
 */
export default function universalFetch(args: Object): Promise<any> {
  // Set locale as Accept-Language header
  if (args.locale) {
    args.headers = {
      "Accept-Language": args.locale,
    };
  }

  if (args.includeContext) {
    args.url = `${args.url}?includeContext=true`;
  }

  // server side no access to the browser cache apis, no cache available
  if (IS_SYNC) {
    return serverFetch(args);
  }

  return browserFetch(args);
}
