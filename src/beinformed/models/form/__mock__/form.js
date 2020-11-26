// @flow
import FormModel from "../FormModel";
import ModularUIResponse from "beinformed/modularui/ModularUIResponse";

import data from "./data.json";
import contributions from "./contributions.json";

const response = ModularUIResponse.create({
  key: "form",
  data,
  contributions,
});

export default new FormModel(response);
