// @flow
import { isString } from "lodash";

const RESOURCE_CACHE_PREFIX = "res:";

/**
 * Manage the browser cache
 */
class Cache {
  _cache: typeof sessionStorage;

  /**
   * constructor
   */
  constructor() {
    if (typeof sessionStorage !== "undefined") {
      this._cache = sessionStorage;
    }
  }

  /**
   * Create a key that can be used to cache resources, needs the request arguments and uses url, params and header of the request args
   * to create a key that is unique for time versions and locale
   */
  createResourceKey(requestArgs: Object): string {
    let resourceKey = requestArgs.url;

    if (requestArgs.params) {
      resourceKey += `|${requestArgs.params}`;
    }

    if (requestArgs.locale) {
      resourceKey += `|${requestArgs.locale}`;
    }

    return `${RESOURCE_CACHE_PREFIX}${resourceKey}`;
  }

  /**
   * Get a cached item by it's key
   */
  getItem(key: string) {
    const cache = this._cache;

    if (!cache) {
      return null;
    }

    const cacheItem = cache.getItem(key);

    if (!cacheItem) {
      return null;
    }

    try {
      return JSON.parse(cacheItem);
    } catch (error) {
      return this._cache.getItem(key);
    }
  }

  /**
   * Check if the item with key exists in the browser cache
   */
  hasItem(key: string) {
    return this.getItem(key) !== null;
  }

  /**
   * Add an item to the cache
   */
  addItem(key: string, value: any) {
    const stringValue = isString(value) ? value : JSON.stringify(value);

    this._cache.setItem(key, stringValue);
  }

  setItem(key: string, value: any) {
    this.addItem(key, value);
  }

  removeItem(key: string) {
    this._cache.removeItem(key);
  }

  /**
   * Clear complete cache storage
   */
  clear(pattern?: string) {
    if (!this._cache) {
      return;
    }

    if (pattern) {
      Object.keys(this._cache)
        .filter((k) => (pattern ? new RegExp(pattern).test(k) : true))
        .forEach((k) => this._cache.removeItem(k));
    } else {
      this._cache.clear();
    }
  }

  // Session storage is not available between different tabs in the same window,
  // this load method copies sessionStorage from other tabs into this tab using localStorage
  // see https://blog.guya.net/2015/06/12/sharing-sessionstorage-between-tabs-for-secure-multi-tab-authentication/
  loadOtherBrowserTabs(callback: () => void) {
    window.addEventListener("storage", (e) => {
      this.sendSessionStorage(e);
      this.receiveSessionStorage(e, callback);
    });

    if (this._cache.length === 0) {
      // trigger retrieval of sessionstorage on other tabs
      localStorage.setItem("getSessionStorage", Date.now().toString());
    }
  }

  sendSessionStorage(e: StorageEvent) {
    if (e.key === "getSessionStorage") {
      localStorage.setItem("sessionStorage", JSON.stringify(this._cache));
      localStorage.removeItem("sessionStorage");
    }
  }

  receiveSessionStorage(e: StorageEvent, callback: () => void) {
    if (e.key === "sessionStorage" && !this.getItem("sessionStorageCopied")) {
      // receive sessionstorage from other tabs
      const newData = e.newValue ? JSON.parse(e.newValue) : {};
      Object.entries(newData)
        .filter(([key]) => !this.hasItem(key))
        .forEach(([key, value]) => {
          this.addItem(key, value);
        });

      this.setItem("sessionStorageCopied", Date.now().toString());

      return callback();
    }

    return null;
  }
}

export default new Cache();
