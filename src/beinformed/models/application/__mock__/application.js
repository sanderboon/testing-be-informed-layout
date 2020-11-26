// @flow
import ApplicationModel from "../ApplicationModel";
import ModularUIResponse from "beinformed/modularui/ModularUIResponse";

import data from "./data.json";
import contributions from "./contributions.json";

const response = ModularUIResponse.create({
  key: "application",
  data,
  contributions,
});

export default new ApplicationModel(response);
