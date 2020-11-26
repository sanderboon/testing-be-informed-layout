// @flow
import DetailModel from "beinformed/models/detail/DetailModel";
import Href from "beinformed/models/href/Href";

import ModularUIResponse from "beinformed/modularui/ModularUIResponse";

import { CASEVIEW_LINK } from "beinformed/constants/LayoutHints";

import type {
  ChoiceAttributeOptionModel,
  ActionCollection,
  LinkCollection,
} from "beinformed/models";

/**
 * List Item
 */
export default class ListItemModel extends DetailModel {
  static createFromChoiceAttributeOption(option: ChoiceAttributeOptionModel) {
    const listitemInput = new ModularUIResponse();
    listitemInput.key = option.code;

    const item = new ListItemModel(listitemInput);
    item.attributeCollection = option.attributeCollection;

    return item;
  }

  get selfhref(): Href {
    const selflink = this.links.getLinkByKey("self");

    if (selflink === null) {
      return new Href("#");
    }

    return selflink.href;
  }

  get caseviewHref(): Href {
    const caseviewLinkAttribute = this.attributeCollection.getAttributeByLayoutHint(
      CASEVIEW_LINK
    );
    if (caseviewLinkAttribute) {
      const caseviewLinkKey = caseviewLinkAttribute.name;
      const caseviewLink = this.links.getLinkByKey(caseviewLinkKey);

      if (caseviewLink) {
        return caseviewLink.href;
      }
    }

    return this.selfhref;
  }

  /**
   * Getting panel links
   */
  get panelLinks(): LinkCollection {
    return this.links.getLinksByGroup("panel");
  }

  /**
   * Check if list item has panel links
   */
  hasPanelLinks(): boolean {
    return this.panelLinks.length > -1;
  }

  /**
   * Retrieve all actions by type
   */
  getActionsByType(actionType: string): ActionCollection {
    return this.actionCollection.getActionsByType(actionType);
  }

  get additionalDetailRoutePath() {
    const additionalDetailLinks = this.panelLinks;

    if (additionalDetailLinks.length === 0) {
      return "__NON_EXISTING_ROUTE__";
    }

    return additionalDetailLinks.map((link) => link.href.path).join("|");
  }
}
