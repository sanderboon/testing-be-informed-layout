// @flow
import { get } from "lodash";

import BaseModel from "beinformed/models/base/BaseModel";
import { TIMEVERSION_FILTER_NAME } from "beinformed/constants/Constants";
import LinkCollection from "beinformed/models/links/LinkCollection";
import { DateUtil } from "beinformed/utils/datetime/DateTimeUtil";

export default class ProcessStatusSettingsModel extends BaseModel {
  get concequenceType(): string {
    return get(this.contributions, "consequenceType", "").toLowerCase();
  }

  get transition(): string {
    return get(this.contributions, "transition", "").toLowerCase();
  }

  get isApplicable(): boolean {
    return get(this.data, "applicable", false);
  }

  get isCompleted(): boolean {
    return get(this.data, "completed", false);
  }

  get isNeeded(): boolean | null {
    const needed = get(this.data, "needed", "unknown");

    if (get(this.data, "needed", "unknown") === "unknown") {
      return null;
    }

    return needed === "true";
  }

  get state(): string | null {
    return get(this.data, "state", null);
  }

  get canComplete(): boolean | null {
    return get(this.data, "canComplete", null);
  }

  get links() {
    return new LinkCollection(this.contributions._links);
  }

  get referenceDate() {
    return DateUtil.now();
  }

  /**
   * Retrieve concept link of attribute when available
   */
  get conceptLink() {
    const conceptLink = this.links.getLinkByKey("concept");
    if (conceptLink !== null) {
      conceptLink.href = conceptLink.href.addParameter(
        TIMEVERSION_FILTER_NAME,
        this.referenceDate
      );

      conceptLink.isCacheable = true;
    }

    return conceptLink;
  }
}
