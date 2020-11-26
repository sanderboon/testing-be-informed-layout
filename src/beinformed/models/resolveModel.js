// @flow
import { has } from "lodash";

import ApplicationModel from "beinformed/models/application/ApplicationModel";
import CaseSearchModel from "beinformed/models/search/CaseSearchModel";
import CaseViewModel from "beinformed/models/caseview/CaseViewModel";
import DetailModel from "beinformed/models/detail/DetailModel";
import FormModel from "beinformed/models/form/FormModel";
import GroupingPanelModel from "beinformed/models/panels/GroupingPanelModel";
import ListModel from "beinformed/models/list/ListModel";
import ListDetailModel from "beinformed/models/list/ListDetailModel";
import TabModel from "beinformed/models/tab/TabModel";
import TaskGroupModel from "beinformed/models/taskgroup/TaskGroupModel";
import UserModel from "beinformed/models/user/UserModel";
import UserServicesModel from "beinformed/models/user/UserServicesModel";
import ModelCatalogModel from "beinformed/models/modelcatalog/ModelCatalogModel";
import ConceptIndexModel from "beinformed/models/concepts/ConceptIndexModel";
import BusinessScenarioModel from "beinformed/models/concepts/BusinessScenarioModel";
import ConceptDetailModel from "beinformed/models/concepts/ConceptDetailModel";
import ConceptTypeDetailModel from "beinformed/models/concepts/ConceptTypeDetailModel";
import ContentIndexModel from "beinformed/models/content/ContentIndexModel";
import ContentTOCModel from "beinformed/models/content/ContentTOCModel";
import ContentModel from "beinformed/models/content/ContentModel";
import ContentTypeModel from "beinformed/models/content/ContentTypeModel";
import LookupOptionsModel from "beinformed/models/lookup/LookupOptionsModel";

import type { ModularUIResponse } from "beinformed/modularui";

/**
 * Mapping of models and resourcetypes
 */
const RESOURCE_MODELS = [
  ApplicationModel,
  TabModel,
  ListDetailModel,
  ListModel,
  GroupingPanelModel,
  CaseSearchModel,
  CaseViewModel,
  DetailModel,
  TaskGroupModel,
  FormModel,
  UserModel,
  UserServicesModel,
  ModelCatalogModel,
  ConceptIndexModel,
  BusinessScenarioModel,
  ConceptDetailModel,
  ConceptTypeDetailModel,
  ContentIndexModel,
  ContentTOCModel,
  ContentModel,
  ContentTypeModel,
  LookupOptionsModel,
];

/**
 * Resolve a model by resource
 */
const resolveModel = (data: ModularUIResponse) => {
  if (!data) {
    throw new Error("No data or contribution available, cannot resolve model");
  }

  if (!has(data.contributions, "resourcetype")) {
    throw new Error(
      "Data has wrong format, missing resourcetype in contributions, cannot resolve model"
    );
  }

  const resourceTypeModel = RESOURCE_MODELS.find((resourceModel) =>
    resourceModel.isApplicableModel(data)
  );

  if (resourceTypeModel) {
    return resourceTypeModel;
  }

  return null;
};

export default resolveModel;
