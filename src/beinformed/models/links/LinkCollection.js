// @flow
import BaseCollection from "beinformed/models/base/BaseCollection";
import normalizeLinkJSON from "beinformed/models/links/normalizeLinkJSON";
import LinkModel from "beinformed/models/links/LinkModel";

import type { Href } from "beinformed/models";

/**
 * Collection of links
 * @see {LinkModel}
 */
export default class LinkCollection extends BaseCollection<LinkModel> {
  /**
   * Constructs the link collection
   */
  constructor(linkData: Object = {}, linkContributions: Object = {}) {
    super();

    // There can be links in data and/or contributions (e.g. concept link is available through contributions)
    this.collection = normalizeLinkJSON(linkData, linkContributions).map(
      ({ data, contributions }) => new LinkModel(data, contributions)
    );
  }

  /**
   * Getting links
   */
  get links(): Array<LinkModel> {
    return this.collection;
  }

  /**
   * Set Link collection
   */
  set links(links: Array<LinkModel>) {
    this.collection = links;
  }

  /**
   * Get a link by it's key, handy for getting the self link
   */
  getLinkByKey(key: string) {
    return this.links.find((link) => link.key === key) || null;
  }

  /**
   * Get a link by it's Href
   */
  getLinkByHref(href: Href) {
    return this.links.find((link) => link.href.equals(href)) || null;
  }

  /**
   * Getting the links by group key. For instance getting all 'tab' links of the web application.
   */
  getLinksByGroup(...args: Array<string>) {
    const findGroups = args.length > 0 ? [...args] : [];
    const groupLinks = this.links.filter((link) =>
      findGroups.includes(link.group)
    );

    const linkCollection = new LinkCollection();

    linkCollection.links = groupLinks;

    return linkCollection;
  }

  /**
   * Retrieve links by resource type
   */
  getLinkByResourceType(resourceType: string) {
    const linkCollection = new LinkCollection();

    linkCollection.collection = this.links.filter(
      (link) => link.resourcetype === resourceType
    );

    return linkCollection;
  }

  /**
   * Retrieve links including a layout hint
   */
  getLinksByLayoutHint(hint: string) {
    const newCollection = new LinkCollection();

    newCollection.collection = this.all.filter((link) =>
      link.layouthint.has(hint)
    );

    return newCollection;
  }

  /**
   * Indicates if a link with layout hint exists
   */
  hasLinksByLayoutHint(hint: string) {
    return this.all.some((link) => link.layouthint.has(hint));
  }

  /**
   * Get all href of links in collection in an array of Href's
   */
  toHrefArray(): Array<Href> {
    return this.links.map((link) => link.href);
  }

  /**
   * Check if link exists in collection
   */
  hasLink(link: LinkModel) {
    return this.some((l) => l.href.equals(link.href));
  }

  /**
   * Updates the collection with a new link, when the link to update does not exist, it is added to the collection
   */
  update(newLink: LinkModel) {
    const oldIndex = this.links.findIndex((link) => link.key === newLink.key);

    if (oldIndex === -1) {
      this.collection = [...this.collection, newLink];

      return this;
    }

    this.collection = [
      ...this.links.slice(0, oldIndex),
      newLink,
      ...this.links.slice(oldIndex + 1),
    ];

    return this;
  }

  /**
   * Use as path regex for react router routes
   */
  get routePath(): string {
    if (this.length === 0) {
      return "__NON_EXISTING_ROUTE__";
    }

    const path = this.collection.map((link) => link.href.path).join("|");
    return this.length > 1 ? `(${path})` : path;
  }
}
