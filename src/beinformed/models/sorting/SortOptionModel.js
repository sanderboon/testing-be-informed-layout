// @flow
import type { GroupModel } from "beinformed/models";
import ListHref from "beinformed/models/href/ListHref";

class SortOptionModel {
  _key: string;
  _label: string;
  _group: ?GroupModel;
  _sortorder: string = "desc";
  _selected: boolean = false;

  constructor(key: string, label?: string, group?: GroupModel) {
    this._key = key;
    this._group = group;

    if (label) {
      this._label = label;
    } else if (group) {
      const attribute = group.getAttributeByKey(key);
      if (attribute) {
        this._label = attribute.label;
      }
    }
  }

  get selected() {
    return this._selected;
  }

  set selected(selected: boolean) {
    this._selected = selected;
  }

  get key() {
    return this._key;
  }

  get value() {
    return `${this.key} ${this.sortorder}`;
  }

  get oppositeDirection() {
    return this.sortorder === "desc" ? "asc" : "desc";
  }

  get oppositeValue() {
    return `${this.key} ${this.oppositeDirection}`;
  }

  get label() {
    return this._label;
  }

  get sortorder() {
    return this._sortorder;
  }

  set sortorder(sortorder: string) {
    this._sortorder = sortorder;
  }

  get group() {
    return this._group;
  }

  getHref(listHref: ListHref) {
    const listhref = new ListHref(listHref);
    const hasPage = listhref.prefix
      ? listhref.hasParameter("page", listhref.prefix)
      : listhref.hasParameter("page");
    if (hasPage) {
      listhref.page = 1;
    }
    listhref.sort = this.oppositeValue;

    return listhref;
  }
}

export default SortOptionModel;
