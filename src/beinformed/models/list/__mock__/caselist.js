// @flow
import ListModel from "../ListModel";
import ModularUIResponse from "beinformed/modularui/ModularUIResponse";

import data from "./caselist.data.json";
import contributions from "./caselist.contributions.json";

const response = ModularUIResponse.create({
  key: "caselist",
  data,
  contributions,
});

export default new ListModel(response);
