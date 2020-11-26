// @flow
import { get, has } from "lodash";

import ProcessStatusSettingsModel from "beinformed/models/process/ProcessStatusSettingsModel";
import BaseModel from "beinformed/models/base/BaseModel";
import Href from "beinformed/models/href/Href";
import LinkCollection from "beinformed/models/links/LinkCollection";

import type { ModularUIModel } from "beinformed/models";

/**
 * Defines a Link. For instance below example of a link to the tab 'books'
 * <br/>
 * "Books": {
 * "href": "/books",
 * "profile": "/profiles/tab"
 * }
 *
 */
class LinkModel extends BaseModel {
  _href: Href;
  _isCacheable: boolean;
  _icon: string;
  _targetModel: Class<ModularUIModel>;

  /**
   * Create a Link
   */
  constructor(data: Object, contributions: Object) {
    super(data, contributions);

    this._href = new Href(this.data.href);
    this._href.resourcetype = this.resourcetype;

    this._isCacheable = false;
  }

  /**
   * Create a simple Link Model
   */
  static create(name: string, href: string | Href, label: string) {
    return new LinkModel(
      {
        name,
        href,
      },
      {
        label,
      }
    );
  }

  /**
   * Getting link group
   */
  get group(): string {
    return this.contributions.group || this.data.group;
  }

  /**
   * Getting the key/name of this link
   */
  get key(): string {
    return this.data.name;
  }

  /**
   * Retrieve the href of the link
   */
  get href(): Href {
    return this._href;
  }

  /**
   * Set the href of the Link
   */
  set href(href: Href) {
    this._href = href;
  }

  /**
   * Getting the label of the link
   */
  get label(): string {
    return this.contributions.label || this.key;
  }

  /**
   * Getting the type of the link
   */
  get resourcetype(): string {
    return this.contributions.resourcetype || "";
  }

  get links(): LinkCollection {
    if (this.data.components) {
      return new LinkCollection(
        { components: this.data.components },
        { components: this.contributions.components }
      );
    }

    return new LinkCollection();
  }

  /**
   * Check if the href startswith the URI of the given href
   */
  isActive(link: ?LinkModel): boolean {
    if (link) {
      return link.href.startsWith(this.href);
    }

    return false;
  }

  /**
   * Setter for icon of LinkModel
   */
  set icon(icon: string) {
    this._icon = icon;
  }

  /**
   * Retrieve icon of LinkModel
   */
  get icon(): string {
    return this._icon;
  }

  get targetModel() {
    return this._targetModel;
  }

  set targetModel(targetModel: Class<ModularUIModel>) {
    this._targetModel = targetModel;
  }

  get isCacheable(): boolean {
    return this._isCacheable;
  }

  set isCacheable(isCacheable: boolean) {
    this._isCacheable = isCacheable;
  }

  get filterName() {
    return this.data.filter.name;
  }

  get hasProcessStatusSettings(): boolean {
    return (
      has(this.data, "processStatus") &&
      has(this.contributions, "processStatus")
    );
  }

  get processStatus(): ProcessStatusSettingsModel | null {
    if (this.hasProcessStatusSettings) {
      return new ProcessStatusSettingsModel(
        get(this.data, "processStatus", {}),
        get(this.contributions, "processStatus", {})
      );
    }

    return null;
  }
}

export default LinkModel;
