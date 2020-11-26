import { optionsKnob as options, select } from "@storybook/addon-knobs";

import LayoutHintConfiguration from "beinformed/constants/LayoutHintConfig.json";
import { KNOB_GROUPS } from "./constants";

export const getLayoutHints = (...componentTypes) => {
  return Object.keys(LayoutHintConfiguration)
    .filter((hintProp) => {
      const layoutHint = LayoutHintConfiguration[hintProp];
      return (
        !layoutHint.component ||
        componentTypes.some((ct) => layoutHint.component.includes(ct))
      );
    })
    .sort()
    .reduce((hints, hintProp) => {
      const { hint } = LayoutHintConfiguration[hintProp];
      hints[hint] = hint;
      return hints;
    }, {});
};

export const layoutHintKnob = (
  componentTypes,
  label = "Layouthint",
  group = KNOB_GROUPS.MODULARUI
) =>
  options(
    label,
    getLayoutHints(...componentTypes),
    [],
    { display: "multi-select" },
    group
  );

export const formLayoutKnob = (
  defaultValue = "vertical",
  group = KNOB_GROUPS.COMPONENT
) =>
  select(
    "formLayout",
    ["horizontal", "vertical", "compact"],
    defaultValue,
    group
  );
