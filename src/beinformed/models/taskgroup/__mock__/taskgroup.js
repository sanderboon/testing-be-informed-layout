// @flow
import TaskGroupModel from "../TaskGroupModel";
import ModularUIResponse from "beinformed/modularui/ModularUIResponse";

import data from "./data.json";
import contributions from "./contributions.json";

const response = ModularUIResponse.create({
  key: "taskgroup",
  data,
  contributions,
});

export default new TaskGroupModel(response);
