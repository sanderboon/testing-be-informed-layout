// @flow
import { get } from "lodash";
import ConceptDetailModel from "beinformed/models/concepts/ConceptDetailModel";

import type { ModularUIResponse } from "beinformed/modularui";
import type { ModularUIModel, LinkModel } from "beinformed/models";

class BusinessScenarioModel extends ConceptDetailModel {
  _models: Array<ConceptDetailModel>;
  _scenarioSteps: Array<ConceptDetailModel>;

  get type(): string {
    return "BusinessScenario";
  }

  static isApplicableModel(data: ModularUIResponse) {
    return (
      get(data.data, "_links.concepttype.href", "") ===
      "/concepttypes/Library/KMTs/Business scenarios.bixml/BusinessScenario"
    );
  }

  getInitialChildModelLinks(): Array<LinkModel> {
    const childModelLinks = [];
    const conceptTypeLink = this.links.getLinkByKey("concepttype");

    if (conceptTypeLink) {
      childModelLinks.push(conceptTypeLink);
    }

    const scenarioStepLinks = this.relationsCollection.all
      .filter(
        (relation) =>
          relation.direction === "outgoing" &&
          relation.concept.concepttypeHref.path ===
            "/concepttypes/Library/KMTs/Business scenarios.bixml/ScenarioStep"
      )
      .map((relation) => relation.concept.asLinkModel());

    if (scenarioStepLinks.length > 0) {
      childModelLinks.push(...scenarioStepLinks);
    }

    return childModelLinks;
  }

  setChildModels(models: Array<ModularUIModel>) {
    this.conceptType = models.find(
      (model) => model.type === "ConceptTypeDetail"
    );

    // $FlowFixMe
    this.scenarioSteps = models.filter(
      (childModel) =>
        childModel.type === "ConceptDetail" &&
        // $FlowFixMe
        childModel.conceptType.selfhref.path ===
          "/concepttypes/Library/KMTs/Business scenarios.bixml/ScenarioStep"
    );
  }

  set scenarioSteps(models: Array<ConceptDetailModel>) {
    this._scenarioSteps = models;
  }

  get scenarioSteps(): Array<ConceptDetailModel> {
    return this._scenarioSteps;
  }

  get actors(): Array<ConceptDetailModel> {
    const actors = [];

    this.scenarioSteps.forEach((scenarioStep) => {
      const relationsToActor = scenarioStep.relationsCollection.find(
        (relation) =>
          relation.direction === "outgoing" &&
          relation.concept.concepttypeHref.path ===
            "/concepttypes/Library/KMTs/Business scenarios.bixml/Persona"
      );

      const newRelationToActor =
        relationsToActor &&
        !actors.some((actor) => actor.key === relationsToActor.concept.key);

      if (relationsToActor && newRelationToActor) {
        actors.push(relationsToActor.concept);
      }
    });

    return actors;
  }
}

export default BusinessScenarioModel;
