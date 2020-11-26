// @flow
import ContentConfigurationQuestions from "beinformed/models/contentconfiguration/ContentConfigurationQuestions";
import ContentConfigurationResults from "beinformed/models/contentconfiguration/ContentConfigurationResults";
import ContentConfigurationEndResults from "beinformed/models/contentconfiguration/ContentConfigurationEndResults";

/**
 * Content definition for questions, results, given answers etc.
 * Mostly maps to the Instrument questions configuration of Be Informed
 */
export default class ContentConfiguration {
  _config: Object;

  constructor(contentConfiguration: Object) {
    this._config = contentConfiguration || null;
  }

  get questions() {
    if (this._config === null || !this._config.questions) {
      return null;
    }

    return new ContentConfigurationQuestions(this._config.questions);
  }

  isConfiguredIntermediateResultAttribute(attributeKey: string) {
    if (this.intermediateResults === null) {
      return false;
    }

    return this.intermediateResults.attributes.includes(attributeKey);
  }

  get intermediateResults() {
    if (this._config === null || !this._config.intermediateResults) {
      return null;
    }

    return new ContentConfigurationResults(this._config.intermediateResults);
  }

  isConfiguredEndResultAttribute(attributeKey: string) {
    if (this.endResults === null) {
      return false;
    }

    return this.endResults.config.some((item) =>
      item.attributes.includes(attributeKey)
    );
  }

  get endResults() {
    if (this._config === null || !this._config.results) {
      return null;
    }

    return new ContentConfigurationEndResults(this._config.results);
  }
}
