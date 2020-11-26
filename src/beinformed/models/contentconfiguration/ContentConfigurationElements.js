// @flow
import { isNil } from "lodash";
import LayoutHintCollection from "beinformed/models/layouthint/LayoutHintCollection";

/**
 * Get element configuration of instrument questions
 */
class ContentConfigurationElements {
  _hasConfiguration: boolean;
  _elementConfiguration: Array<Object>;

  constructor(elementConfiguration: ?Array<Object>) {
    this._hasConfiguration = !isNil(elementConfiguration);
    this._elementConfiguration = isNil(elementConfiguration)
      ? []
      : elementConfiguration;
  }

  includeLayoutHints(hints: Array<string>) {
    const contentIncludeLayoutHint = this._elementConfiguration.filter(
      (elementConfig) => {
        const [key] = Object.keys(elementConfig);
        const config = elementConfig[key];

        if (!config || !config.layouthint) {
          return false;
        }

        return config.layouthint.some((hint) => hints.includes(hint));
      }
    );

    return new ContentConfigurationElements(contentIncludeLayoutHint);
  }

  excludeLayoutHints(hints: Array<string>) {
    const contentExcludeLayoutHint = this._elementConfiguration.filter(
      (elementConfig) => {
        const [key] = Object.keys(elementConfig);
        const config = elementConfig[key];

        if (!config) {
          return false;
        } else if (!config.layouthint) {
          return true;
        }

        return !config.layouthint.some((hint) => hints.includes(hint));
      }
    );

    return new ContentConfigurationElements(contentExcludeLayoutHint);
  }

  get config(): Array<Object> {
    return this._elementConfiguration.map((elementConfig) => {
      const [key] = Object.keys(elementConfig);
      const config = elementConfig[key];

      if (!config) {
        return {};
      }

      return {
        type: key,
        label: config.label,
        types:
          config.labelTypes ||
          config.propertyTypes ||
          config.sectionReferenceTypes ||
          config.textFragmentTypes,
        layouthint: new LayoutHintCollection(config.layouthint),
        icon: config.icon || "",
      };
    });
  }

  hasConfig() {
    return this._hasConfiguration;
  }

  hasContent() {
    return this.config.some(
      (configElement) => configElement.type === "contentElement"
    );
  }

  /**
   * Retrieve if the configuration has an element that has a specific layouthint,
   * makes it easy to indicate that the content needs to be presented in a certain way.
   */
  hasLayoutHint(hint: string) {
    return this.config.some((configElement) =>
      configElement.layouthint.has(hint)
    );
  }

  /**
   * Returns config elements by given types
   */
  byTypes(types: Array<string> = []): Array<Object> {
    if (!types || types.length === 0) {
      return this.config;
    }

    return this.config.filter((config) => types.includes(config.type));
  }

  /**
   * Get label config elements
   */
  get labelConfig(): Array<Object> {
    return this.config.filter((config) => config.type === "labelElement");
  }

  /**
   * Get all section reference types
   */
  getAllSectionReferenceTypes() {
    const sectionReferences = [];

    this.config
      .filter((item) => item.type === "contentElement")
      .forEach((item) => {
        sectionReferences.push(...item.types);
      });

    return sectionReferences;
  }

  /**
   * Retrieve all content element configuration by content type
   */
  getContentElementConfigBySectionReferenceType(type: string): Array<Object> {
    return this.config.filter(
      (config) =>
        config.type === "contentElement" && config.types.includes(type)
    );
  }
}

export default ContentConfigurationElements;
