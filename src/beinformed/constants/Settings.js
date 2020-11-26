// @flow
import { get, has, isUndefined, isPlainObject } from "lodash";

const defaultSettings = {
  // Time to show the notification bar
  HIDE_NOTIFICATION_TIMEOUT: 5000,

  // Always commit form, does not show result pages for instruments
  ALWAYS_COMMIT_FORM: false,

  // Render instrument and event question labels on forms (might result in duplicate labels)
  RENDER_QUESTION_LABELS: true,

  // Render mandatory indications on attributes
  RENDER_MANDATORY_ATTRIBUTE_INDICATION: true,

  // Render optional indications on attributes
  RENDER_OPTIONAL_ATTRIBUTE_INDICATION: false,

  // Renders a toggle with supported list views, options are ListView and TableView
  AVAILABLE_LIST_VIEWS: ["ListView", "TableView"],

  // Toggle client side validation
  USE_CLIENTSIDE_VALIDATION: true,

  // Indicates if server validation should be used when a form field is changed
  USE_INSTANT_SERVER_VALIDATION: true,

  // Indicates which locales are enabled
  ENABLED_LOCALES: ["en", "nl"],

  // Render forms in a modal
  RENDER_FORMS_IN_MODAL: true,

  // Wait timeout before rendering submit wait icon
  SHOW_SUBMIT_WAIT_TIMEOUT: 300,

  // Swim lane diagram configuration file
  SWIM_LANE_DIAGRAM_CONFIGURATION: "/Library/Diagrams/Overviews.json",

  // input format for dates
  DATE_INPUT_FORMAT: "dd-MM-yyyy",

  // readonly format for dates
  DATE_READONLY_FORMAT: "dd-MM-yyyy",
};

let settings = defaultSettings;
const setSettings = (config: Object) => {
  if (isPlainObject(config)) {
    settings = Object.assign(defaultSettings, config);
  }
};

const getSetting = (key: string, defaultValue?: any) => {
  if (!has(settings, key) && isUndefined(defaultValue)) {
    throw new Error(
      `Setting with name ${key} not found and no defaultValue given`
    );
  }

  return get(settings, key, defaultValue);
};

const allSettings = () => settings;

export { getSetting, setSettings, allSettings };
