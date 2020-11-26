// @flow
import ListDetailModel from "../ListDetailModel";
import ModularUIResponse from "beinformed/modularui/ModularUIResponse";

import data from "./caselist-34.data.json";
import contributions from "./caselist-34.contributions.json";

const response = ModularUIResponse.create({
  key: "Book",
  data,
  contributions,
});

export default new ListDetailModel(response);
