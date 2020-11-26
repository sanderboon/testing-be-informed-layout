// @flow
import ResourceCollection from "beinformed/models/base/ResourceCollection";
import ChoiceAttributeOptionModel from "beinformed/models/attributes/ChoiceAttributeOptionModel";

class LookupOptionCollection extends ResourceCollection<ChoiceAttributeOptionModel> {
  static create(data: Object, contributions: Object) {
    const collection = new LookupOptionCollection();

    if (data.options && contributions.options) {
      data.options.forEach((option) => {
        collection.add(
          new ChoiceAttributeOptionModel([], {
            ...option,
            elementsContributions: contributions.options[0].elements,
          })
        );
      });
    }

    return collection;
  }
}

export default LookupOptionCollection;
