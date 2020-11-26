// @flow
import ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";
import LayoutHintCollection from "beinformed/models/layouthint/LayoutHintCollection";

class ContentConfigurationResults {
  _configuration: Object;
  _layouthint: LayoutHintCollection;

  constructor(configuration: Object) {
    this._configuration = configuration || null;

    this._layouthint = new LayoutHintCollection(configuration.layouthint);
  }

  get label() {
    if (this._configuration === null) {
      return null;
    }

    return this._configuration.label;
  }

  get description() {
    if (this._configuration === null) {
      return null;
    }

    return this._configuration.description;
  }

  get attributes() {
    if (this._configuration === null) {
      return [];
    }

    // An issue with mapped attributes is giving us the wrong attribute keys in the attributes property
    // as a temporary fix a layouthint with the correct mapped attribute key can be set in the configuration of the end results
    return [
      ...this._configuration.attributes,
      ...this.layouthint.all
        .filter((hint) => hint.includes("attribute:"))
        .map((hint) => hint.substring("attribute:".length)),
    ];
  }

  getFormConfigElement(elementKey: string) {
    if (this._configuration === null) {
      return new ContentConfigurationElements([]);
    }

    const configElement = this._configuration[elementKey];

    return new ContentConfigurationElements(configElement);
  }

  get calculatedResultElements() {
    return this.getFormConfigElement("calculatedResultElements");
  }

  get positiveResultElements() {
    return this.getFormConfigElement("positiveResultElements");
  }

  get negativeResultElements() {
    return this.getFormConfigElement("negativeResultElements");
  }

  get resultElements() {
    return this.getFormConfigElement("resultElements");
  }

  get layouthint() {
    return this._layouthint;
  }
}

export default ContentConfigurationResults;
