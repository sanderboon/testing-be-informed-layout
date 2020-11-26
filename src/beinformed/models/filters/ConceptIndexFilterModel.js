// @flow
import BaseFilterModel from "beinformed/models/filters/BaseFilterModel";
import ChoiceAttributeModel from "beinformed/models/attributes/ChoiceAttributeModel";

/**
 * The concept index model is a special filter used to index all first concept label letters in de modelcatalog.
 */
export default class ConceptIndexFilterModel extends BaseFilterModel {
  /**
   * Construct a filter
   */
  constructor(data: Object, contributions: Object) {
    super(data, contributions);

    if (data.options) {
      const selectedValues = data.options
        .filter((option) => option.selected)
        .map((option) => option.key);

      data.options.forEach((option) => {
        if (this.attribute instanceof ChoiceAttributeModel) {
          this.attribute.options.addOption(
            { value: selectedValues },
            {
              code: option.key,
              label: option.key,
            }
          );
        }
      });
    }
  }
}
