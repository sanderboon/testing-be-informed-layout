// @flow
import { ChoiceAttributeModel } from "beinformed/models";

import { KNOB_GROUPS } from "_storybook/constants";
import { layoutHintKnob, formLayoutKnob } from "_storybook/utils";

import {
  text,
  boolean,
  select,
  optionsKnob as options,
} from "@storybook/addon-knobs";

import mock from "xhr-mock";

import {
  AttributeRenderer,
  ChoiceAttribute,
} from "_component-registry/attributes";

export default {
  title: "Attributes/Choice attribute/Form",
  component: ChoiceAttribute,
};

const getSelectableOptionCodes = (options) => {
  const allOptions = {};

  for (const [, value] of Object.entries(options)) {
    allOptions[value.code] = value.code;
  }

  return allOptions;
};

const data = {
  key: "FavoriteCar",
  value: ["AudiQ5"],
};

const contributions = {
  type: "string",
  label: "Favorite car",
  mandatory: true,
  optionMode: "static",
  multiplechoice: false,
  assistant: "This includes your current favorite car",
  layouthint: ["radiobutton"],
  enumerated: true,
  options: [
    {
      code: "AudiQ5",
      label: "Audi Q5",
    },
    {
      code: "BMW5Series",
      label: "BMW 5 Series",
    },
    {
      code: "ChevroletSilverado",
      label: "Chevrolet Silverado",
    },
    {
      code: "ChryslerPacifica",
      label: "Chrysler Pacifica",
    },
    {
      code: "FiatPanda",
      label: "Fiat Panda",
    },
    {
      code: "FerrariGTO",
      label: "Ferrari GTO",
    },
  ],
};

/**
 * Interactive
 */
export const interactive = () => {
  const choiceType = select(
    "Choice type",
    ["checkbox", "radiobutton", "combobox", "listview"],
    "checkbox",
    KNOB_GROUPS.MODULARUI
  );

  // knob to make the input element multi or single select - not valid in case of radio button - mandatory in case of checkbox
  const multiplechoice = boolean(
    "multiplechoice",
    contributions.multiplechoice,
    KNOB_GROUPS.MODULARUI
  );

  const layoutHints = [
    choiceType,
    ...layoutHintKnob(["attribute", "attribute/choice"]),
  ];

  const selectedValues = options(
    "selected",
    getSelectableOptionCodes(contributions.options),
    "",
    { display: multiplechoice ? "multi-select" : "select" },
    KNOB_GROUPS.MODULARUI
  );

  const attribute = new ChoiceAttributeModel(
    { ...data, value: selectedValues },
    {
      ...contributions,
      label: text("Label", contributions.label, KNOB_GROUPS.MODULARUI),
      layouthint: layoutHints,
      multiplechoice,
      optionMode: "static",
      mandatory: boolean(
        "Mandatory",
        contributions.mandatory,
        KNOB_GROUPS.MODULARUI
      ),
    }
  );

  return (
    <AttributeRenderer
      name={attribute.name}
      attribute={attribute}
      formLayout={formLayoutKnob()}
    />
  );
};

/**
  checkbox
 */
export const checkbox = () => {
  const selectedValues = options(
    "selected",
    getSelectableOptionCodes(contributions.options),
    "",
    { display: "multi-select" },
    KNOB_GROUPS.MODULARUI
  );

  const attribute = new ChoiceAttributeModel(
    { ...data, value: selectedValues },
    {
      ...contributions,
      multiplechoice: true,
      layouthint: ["checkbox"],
    }
  );

  return <AttributeRenderer name={attribute.name} attribute={attribute} />;
};

checkbox.story = {
  name: "Check box",
};

/**
  radiobutton
 */
export const radiobutton = () => {
  const selectedValue = options(
    "selected",
    getSelectableOptionCodes(contributions.options),
    "",
    { display: "select" },
    KNOB_GROUPS.MODULARUI
  );

  const attribute = new ChoiceAttributeModel(
    { ...data, value: selectedValue },
    {
      ...contributions,
      multiplechoice: false,
      layouthint: ["radiobutton"],
    }
  );
  return <AttributeRenderer name={attribute.name} attribute={attribute} />;
};

radiobutton.story = {
  name: "Radio button",
};

/**
  combobox
 */
export const combobox = () => {
  const multiplechoice = boolean(
    "multiplechoice",
    contributions.multiplechoice,
    KNOB_GROUPS.MODULARUI
  );

  const selectedValues = options(
    "selected",
    getSelectableOptionCodes(contributions.options),
    "",
    { display: multiplechoice ? "multi-select" : "select" },
    KNOB_GROUPS.MODULARUI
  );

  const attribute = new ChoiceAttributeModel(
    { ...data, value: selectedValues },
    {
      ...contributions,
      layouthint: ["combobox"],
    }
  );
  return <AttributeRenderer name={attribute.name} attribute={attribute} />;
};

combobox.story = {
  name: "Combo box",
};

/**
  listview
 */
export const listview = () => {
  const multiplechoice = boolean(
    "multiplechoice",
    contributions.multiplechoice,
    KNOB_GROUPS.MODULARUI
  );

  const selectedValues = options(
    "selected",
    getSelectableOptionCodes(contributions.options),
    "",
    { display: multiplechoice ? "multi-select" : "select" },
    KNOB_GROUPS.MODULARUI
  );

  const attribute = new ChoiceAttributeModel(
    { ...data, value: selectedValues },
    {
      ...contributions,
      layouthint: ["listview"],
    }
  );
  return <AttributeRenderer name={attribute.name} attribute={attribute} />;
};

listview.story = {
  name: "List view",
};

/**
  lookup
  NOTE: the lookup response for this story is not filtered by user input since the user input state is not available in this story 
 */
const dataWithLookupOptions = {
  key: "FavoriteOffroadCar",
  value: [],
  dynamicschema: [
    { code: "AudiQ5", label: "Audi Q5" },
    { code: "ChevroletSilverado", label: "Chevrolet Silverado" },
    { code: "ChryslerPacifica", label: "Chrysler Pacifica" },
    { code: "FerrariGTO", label: "Ferrari GTO" },
    { code: "FiatPanda", label: "Fiat Panda" },
    { code: "HondaCivic", label: "Honda Civic" },
    { code: "KiaForte", label: "Kia Forte" },
    { code: "LamborghiniAventador", label: "Lamborghini Aventador" },
    { code: "MaseratiGhibli", label: "Maserati Ghibli" },
    { code: "Mazda323", label: "Mazda 323" },
    { code: "NissanPathfinder", label: "Nissan Pathfinder" },
    { code: "OpelAstra", label: "Opel Astra" },
    { code: "PorscheMacan", label: "Porsche Macan" },
    { code: "RenaultClio", label: "Renault Clio" },
    { code: "Saab9-3", label: "Saab 9-3" },
    { code: "ToyotaCorolla", label: "Toyota Corolla" },
    { code: "VolkswagenGolf", label: "Volkswagen Golf" },
  ],
  _links: {
    lookupOptions: {
      href: "/lookupOptions",
      filter: { name: "labelFilter" },
      name: "lookupOptions",
    },
  },
};

const lookupContributions = {
  type: "array",
  label: "Favorite offroad car",
  optionMode: "lookup",
  multiplechoice: true,
  assistant: "This includes your current favorite car",
  layouthint: ["checkbox"],
  placeholder: "Start typing and select the car",
  enumerated: true,
};

const lookupOptionsResponse = {
  lookup: {
    _links: {
      self: { href: "/lookupOptions" },
      api_doc: { href: "/api-docs/v3/lookupOptions" },
      contributions: {
        href: "/contributions/lookupOptions",
      },
    },
    options: [
      { code: "AudiQ5", label: "Audi Q5" },
      { code: "ChevroletSilverado", label: "Chevrolet Silverado" },
      { code: "ChryslerPacifica", label: "Chrysler Pacifica" },
      { code: "FerrariGTO", label: "Ferrari GTO" },
      { code: "FiatPanda", label: "Fiat Panda" },
      { code: "HondaCivic", label: "Honda Civic" },
      { code: "KiaForte", label: "Kia Forte" },
      { code: "LamborghiniAventador", label: "Lamborghini Aventador" },
      { code: "MaseratiGhibli", label: "Maserati Ghibli" },
      { code: "Mazda323", label: "Mazda 323" },
      { code: "NissanPathfinder", label: "Nissan Pathfinder" },
      { code: "OpelAstra", label: "Opel Astra" },
      { code: "PorscheMacan", label: "Porsche Macan" },
      { code: "RenaultClio", label: "Renault Clio" },
      { code: "Saab9-3", label: "Saab 9-3" },
      { code: "ToyotaCorolla", label: "Toyota Corolla" },
      { code: "VolkswagenGolf", label: "Volkswagen Golf" },
    ],
    filter: { name: "labelFilter", param: "labelFilter" },
    resourcetype: "lookupOptions",
  },
};

const lookupContributionsResponse = {
  lookup: {
    resourcetype: "lookupOptions",
    filter: [
      {
        labelFilter: {
          type: "stringfilter",
          label: "labelFilter",
        },
      },
    ],
    options: [
      {
        code: {
          type: "string",
          label: "Code",
          displaysize: 50,
          maxLength: 255,
        },
        label: {
          type: "string",
          label: "Label",
          displaysize: 50,
          maxLength: 255,
        },
      },
    ],
  },
};

export const lookup = () => {
  // setup xhr-mock to respond to xhr calls
  mock.setup();

  // mock GET request to fetch data for lookupOptions
  mock.get(/BeInformed\/lookupOptions\?labelFilter=./, {
    status: 200,
    body: JSON.stringify(lookupOptionsResponse),
  });

  // mock GET request for lookupOptions contributions
  mock.get("/BeInformed/contributions/lookupOptions", {
    status: 200,
    body: JSON.stringify(lookupContributionsResponse),
  });

  const multiplechoice = boolean(
    "multiplechoice",
    contributions.multiplechoice,
    KNOB_GROUPS.MODULARUI
  );

  const selectedValues = options(
    "selected",
    getSelectableOptionCodes(lookupOptionsResponse.lookup.options),
    "",
    { display: multiplechoice ? "multi-select" : "select" },
    KNOB_GROUPS.MODULARUI
  );

  const layoutHints = [...layoutHintKnob(["attribute", "attribute/choice"])];

  const attribute = new ChoiceAttributeModel(
    { ...dataWithLookupOptions, value: selectedValues },
    {
      ...lookupContributions,
      multiplechoice,
      layouthint: layoutHints,
      mandatory: boolean(
        "Mandatory",
        contributions.mandatory,
        KNOB_GROUPS.MODULARUI
      ),
    }
  );
  return (
    <AttributeRenderer
      name={attribute.name}
      attribute={attribute}
      formLayout={formLayoutKnob()}
    />
  );
};

lookup.story = {
  name: "Lookup interactive",
};
