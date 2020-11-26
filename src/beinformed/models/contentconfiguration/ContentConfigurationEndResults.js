// @flow
import ContentConfigurationResults from "beinformed/models/contentconfiguration/ContentConfigurationResults";

class ContentConfigurationEndResults {
  _configuration: Array<Object>;

  constructor(configuration: Array<Object>) {
    this._configuration = configuration || [];
  }

  get config(): Array<ContentConfigurationResults> {
    return this._configuration
      .filter((configElement) => {
        const [key] = Object.keys(configElement);

        return (
          key === "decisionResult" ||
          key === "classificationResult" ||
          key === "calculatorResult"
        );
      })
      .map((configElement) => {
        const [key] = Object.keys(configElement);
        return new ContentConfigurationResults(configElement[key]);
      });
  }

  getContentConfigurationElementsForAttribute(
    attributeKey: string
  ): ContentConfigurationResults | null {
    return (
      this.config.find((item) => item.attributes.includes(attributeKey)) || null
    );
  }
}

export default ContentConfigurationEndResults;
