import ModularUIResponse from "beinformed/modularui/ModularUIResponse";
import FormModel from "../FormModel";
import Parameter from "../../href/Parameter";
import FormContributionsJSON from "./FormContributions.json";

describe("FormModel getters", () => {
  it("should be able to create an empty FormModel object", () => {
    const form = new FormModel({});

    expect(form).toBeInstanceOf(FormModel);
    expect(form.type).toBe("Form");
    expect(form.label).toBe("");
    expect(form.hasNextStep).toBeFalsy();
    expect(form.hasPreviousStep).toBeFalsy();
    expect(form.isValid).toBeTruthy();

    expect(form.currentFormObject).toBeNull();
    expect(form.allObjects).toHaveLength(0);
    expect(form.completedFormObjects).toHaveLength(0);
    expect(form.objectKeys).toEqual([]);

    expect(form.previouslyEnteredFormObjects).toHaveLength(0);
    expect(form.numberOfExpectedQuestions).toBe(0);

    expect(form.hasEndResultConfiguration).toBeFalsy();
    expect(form.expectsEndResultFormObjects).toBeFalsy();
    expect(form.endResultFormObjects).toHaveLength(0);

    expect(form.isFinished).toBeFalsy();
    expect(form.isComplete).toBeFalsy();
    expect(form.successRedirect).toBeNull();
    expect(form.redirectLocation).toBeNull();

    expect(form.errorCollection.isEmpty).toBeTruthy();

    expect(() => {
      form.selfhref;
    }).toThrow();

    // form needs to be complete:
    expect(form.hasNoQuestionsConfigured).toBeFalsy();

    expect(form.formdata).toBe('{"objects":[]}');
    expect(form.validationData).toBe('{"objects":[]}');
  });

  it("can get and set commit param", () => {
    const form = new FormModel({});

    expect(form.commit).toBeFalsy();

    form.commit = true;
    expect(form.commit).toBeTruthy();

    form.commit = false;
    expect(form.commit).toBeFalsy();
  });

  it("can handle parameters", () => {
    const form = new FormModel({});

    expect(form.parameters).toHaveLength(0);

    form.parameters = [new Parameter()];
    expect(form.parameters).toHaveLength(1);
  });

  it("can handle tokens", () => {
    const form = new FormModel({});

    expect(form.tokens).toHaveLength(0);

    form.tokens = ["Token"];
    expect(form.tokens).toHaveLength(1);
  });

  it("can handle last modification", () => {
    const form = new FormModel({});

    expect(form.lastUpdate).toBe(0);

    form.lastUpdate = 12345;
    expect(form.lastUpdate).toBe(12345);
  });

  it("can handle first question", () => {
    const firstMissingJSON = {
      formresponse: {
        _links: {},
        missing: {
          anchors: [
            {
              objectid: "Person",
              elements: [
                { elementid: "Name" },
                { elementid: "DateOfBirth" },
                { elementid: "DateOfDeath" },
              ],
            },
          ],
        },
      },
    };

    const formData = ModularUIResponse.create({
      data: firstMissingJSON,
      contributions: FormContributionsJSON,
    });

    const form = new FormModel(formData);

    expect(form.type).toBe("Form");
    expect(form.hasNextStep).toBeTruthy();
    expect(form.hasPreviousStep).toBeFalsy();
    expect(form.isValid).toBeFalsy();

    expect(form.currentFormObject.key).toBe("Person");
    expect(form.completedFormObjects).toHaveLength(0);

    expect(form.previouslyEnteredFormObjects).toHaveLength(0);
    expect(form.numberOfExpectedQuestions).toBe(2);

    expect(form.successRedirect).toBeNull();
    expect(form.redirectLocation).toBeNull();

    expect(() => {
      form.selfhref;
    }).toThrow();

    // form needs to be complete:
    expect(form.hasNoQuestionsConfigured).toBeFalsy();
  });
});
