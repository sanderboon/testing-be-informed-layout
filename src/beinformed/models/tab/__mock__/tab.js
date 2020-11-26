// @flow
import TabModel from "../TabModel";
import ModularUIResponse from "beinformed/modularui/ModularUIResponse";

import data from "./data.json";
import contributions from "./contributions.json";

const response = ModularUIResponse.create({
  key: "tab",
  data,
  contributions,
});

export default new TabModel(response);
