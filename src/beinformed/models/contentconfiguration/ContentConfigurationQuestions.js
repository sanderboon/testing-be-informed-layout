// @flow
import ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";

class ContentConfigurationQuestions {
  _configuration: Object;

  constructor(configuration: Object) {
    this._configuration = configuration || null;
  }

  hasConfig() {
    return (
      this.question.hasConfig() ||
      this.options.hasConfig() ||
      this.answers.hasConfig()
    );
  }

  get question() {
    if (this._configuration === null) {
      return new ContentConfigurationElements([]);
    }

    return new ContentConfigurationElements(
      this._configuration.questionElements
    );
  }

  get options() {
    if (this._configuration === null) {
      return new ContentConfigurationElements([]);
    }

    return new ContentConfigurationElements(this._configuration.optionElements);
  }

  get answers() {
    if (this._configuration === null) {
      return new ContentConfigurationElements([]);
    }

    return new ContentConfigurationElements(
      this._configuration.givenAnswerElements
    );
  }
}

export default ContentConfigurationQuestions;
