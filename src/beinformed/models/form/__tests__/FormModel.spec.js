import ModularUIResponse from "beinformed/modularui/ModularUIResponse";
import FormContributionsJSON from "./FormContributions.json";

import FormModel from "beinformed/models/form/FormModel";
import FormObjectModel from "beinformed/models/form/FormObjectModel";
import Parameter from "beinformed/models/href/Parameter";
import ErrorResponse from "beinformed/models/error/ErrorResponse";

import { FetchException } from "beinformed/exceptions";

describe("FormModel", () => {
  it("should be able to create an empty FormModel object", () => {
    const form = new FormModel({});

    expect(form).toBeInstanceOf(FormModel);
    expect(form.type).toBe("Form");
    expect(form.getInitialChildModelLinks()).toHaveLength(0);

    expect(form.currentFormObject).toBeNull();
    expect(form.completedFormObjects).toHaveLength(0);
    expect(form.hasNextStep).toBeFalsy();
    expect(form.hasPreviousStep).toBeFalsy();
    expect(form.isValid).toBeTruthy();
    expect(form.hasServerErrors()).toBeFalsy();
    expect(form.numberOfExpectedQuestions).toBe(0);

    expect(() => {
      form.selfhref;
    }).toThrow();
  });

  it("should be able to create a FormModel from missing information", () => {
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

    expect(FormModel.isApplicableModel(formData)).toBeTruthy();

    expect(form).toBeInstanceOf(FormModel);

    expect(form.currentFormObject).toBeInstanceOf(FormObjectModel);
    expect(form.errorCollection).toHaveLength(0);

    expect(form.label).toBe("Create person");
    expect(form.isChanged()).toBeFalsy();

    form.currentFormObject.attributeCollection.first.update("test");

    setTimeout(() => {
      expect(form.currentFormObject.attributeCollection.first.value).toBe(
        "test"
      );
      expect(form.isChanged()).toBeTruthy();
    }, 2);

    expect(form.hasNextStep).toBeTruthy();
  });

  it("should be able to create a FormModel from missing error information", () => {
    const missingJSON = {
      formresponse: {
        _links: {},
        missing: {
          anchors: [
            {
              objectid: "Person",
              elementid: "Name",
            },
          ],
        },
      },
    };

    const data = ModularUIResponse.create({
      data: missingJSON,
      contributions: FormContributionsJSON,
    });
    const form = new FormModel(data);

    expect(form).toBeInstanceOf(FormModel);

    expect(form.currentFormObject).toBeInstanceOf(FormObjectModel);
    expect(form.errorCollection).toHaveLength(0);
  });

  it("should be able to create a FormModel from error information", () => {
    const errorJSON = {
      formresponse: {
        _links: {},
        errors: [
          {
            anchor: {
              objectid: "Person",
              elementid: "DateOfBirth",
            },
            id: "INVALID_DATE_FORMAT",
            properties: {
              format: "yyyy-MM-dd",
            },
          },
        ],
      },
    };

    const form = new FormModel({
      data: errorJSON,
      contributions: FormContributionsJSON,
    });

    expect(form).toBeInstanceOf(FormModel);

    expect(form.currentFormObject).toBeNull();
    expect(form.errorCollection).toHaveLength(0);
  });

  it("should be able to update an existing form model with error information", () => {
    const initialData = ModularUIResponse.create({
      data: {
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
      },
      contributions: FormContributionsJSON,
    });
    const mainForm = new FormModel(initialData);

    const errorData = ModularUIResponse.create({
      data: {
        formresponse: {
          _links: {},
          missing: {
            anchors: [
              {
                objectid: "Person",
                elementid: "Name",
              },
            ],
          },
        },
      },
      contributions: FormContributionsJSON,
    });
    const formWithMissingError = new FormModel(errorData);

    const updatedForm = mainForm.update(formWithMissingError);

    expect(updatedForm).toBeInstanceOf(FormModel);
    expect(updatedForm.currentFormObject).toBeInstanceOf(FormObjectModel);
    expect(updatedForm.isValid).toBeFalsy();

    const secondError = ModularUIResponse.create({
      data: {
        formresponse: {
          _links: {},
          errors: [
            {
              anchor: {
                objectid: "Person",
                elementid: "DateOfBirth",
              },
              id: "INVALID_DATE_FORMAT",
              properties: {
                format: "yyyy-MM-dd",
              },
            },
          ],
        },
      },
      contributions: FormContributionsJSON,
    });
    const formWithErrors = new FormModel(secondError);

    mainForm.update(formWithErrors);

    expect(updatedForm).toBeInstanceOf(FormModel);
    expect(updatedForm.currentFormObject).toBeInstanceOf(FormObjectModel);
    expect(updatedForm.isValid).toBeFalsy();
  });

  it("Can set parameters", () => {
    const form = new FormModel({});

    expect(form.isFinished).toBeFalsy();
    expect(form.successRedirect).toBeNull();

    form.parameters = [new Parameter(null, "name", "value")];
    expect(form.parameters).toHaveLength(1);
  });

  it("Can handle success response", () => {
    const form = new FormModel({
      data: {
        success: {
          redirect: "/endredirect",
        },
      },
    });

    expect(form.isFinished).toBeTruthy();
    expect(form.successRedirect.path).toBe("/endredirect");
  });

  it("Should be able to handle xhr server errors", () => {
    const form = new FormModel();

    form.addServerError(
      new ErrorResponse(
        new FetchException({
          error: {
            id: "GENERAL_ERROR",
            parameters: {
              type: "ErrorType",
            },
          },
        })
      )
    );

    expect(form.errorCollection).toHaveLength(1);
  });

  it("Should be able to handle errors on attributes", () => {
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

    const data = ModularUIResponse.create({
      data: firstMissingJSON,
      contributions: FormContributionsJSON,
    });

    const form = new FormModel(data);

    form.currentFormObject.getAttributeByKey("DateOfBirth").inputvalue = "bla";

    form.handleErrors({
      data: {
        errors: [
          {
            id: "Form Error",
          },
          {
            id: "Anchor No Object Error",
            anchor: {
              elementid: "Person",
            },
          },
          {
            id: "Form.mandatory",
            anchor: {
              objectid: "Person",
              elementid: "Name",
            },
          },
          {
            id: "Form.wrongvalue",
            anchor: {
              objectid: "Person",
              elementid: "DateOfBirth",
            },
          },
        ],
      },
    });

    expect(form.errorCollection).toHaveLength(2);

    const dateOfBirth = form.currentFormObject.getAttributeByKey("DateOfBirth");
    expect(dateOfBirth.constraintCollection.all).toHaveLength(1);
    expect(dateOfBirth.errorCollection.all).toHaveLength(2);
  });

  it("is able to update missing form response, mandatory server", () => {
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

    const firstData = ModularUIResponse.create({
      data: firstMissingJSON,
      contributions: FormContributionsJSON,
    });

    const form = new FormModel(firstData);

    const secondMissingJSON = {
      formresponse: {
        _links: {},
        missing: {
          anchors: [
            {
              objectid: "Person",
              elementid: "Name",
            },
            {
              objectid: "Person",
              elementid: "DateOfBirth",
            },
          ],
        },
      },
    };

    const secondData = ModularUIResponse.create({
      data: secondMissingJSON,
      contributions: FormContributionsJSON,
    });

    const nextForm = new FormModel(secondData);

    const updatedForm = form.update(nextForm);

    expect(updatedForm.completedFormObjects).toHaveLength(0);
    expect(updatedForm.currentFormObject).toBeInstanceOf(FormObjectModel);
    expect(updatedForm.lastUpdate).not.toBe(0);
  });

  it("Is able to update from new form response", () => {
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

    const initialData = ModularUIResponse.create({
      data: firstMissingJSON,
      contributions: FormContributionsJSON,
    });

    const form = new FormModel(initialData);

    expect(form.hasNextStep).toBeTruthy();
    expect(form.completedFormObjects).toHaveLength(0);
    expect(form.allObjects).toHaveLength(1);
    expect(form.currentFormObject).toBeInstanceOf(FormObjectModel);

    const secondMissingJSON = {
      formresponse: {
        _links: {},
        missing: {
          anchors: [
            {
              objectid: "Details",
              index: 1,
              numberofrepeats: 1,
              last: true,
              elements: [{ elementid: "Address" }],
            },
          ],
        },
      },
    };

    const secondData = ModularUIResponse.create({
      data: secondMissingJSON,
      contributions: FormContributionsJSON,
    });

    const nextForm = new FormModel(secondData);

    const updatedForm = form.update(nextForm);

    expect(form.hasNextStep).toBeFalsy();
    expect(updatedForm.completedFormObjects).toHaveLength(1);
    expect(form.allObjects).toHaveLength(2);
    expect(updatedForm.currentFormObject).toBeInstanceOf(FormObjectModel);

    const finishData = ModularUIResponse.create({
      data: {
        formresponse: {
          success: {
            redirect: "/endredirect",
          },
        },
      },
      contributions: FormContributionsJSON,
    });
    const finishForm = new FormModel(finishData);

    form.update(finishForm);

    expect(form.completedFormObjects).toHaveLength(2);
    expect(form.allObjects).toHaveLength(2);
    expect(form.currentFormObject).toBeNull();

    form.setPreviousObject();
    expect(form.completedFormObjects).toHaveLength(1);
    expect(form.currentFormObject).toBeInstanceOf(FormObjectModel);
    expect(form.hasNextStep).toBeFalsy();
  });

  it("is able to get formdata for request", () => {
    const firstMissingJSON = {
      formresponse: {
        _links: {},
        missing: {
          anchors: [
            {
              objectid: "Person",
              elements: [
                { elementid: "Name", suggestion: "John Doe" },
                { elementid: "DateOfBirth" },
                { elementid: "DateOfDeath" },
              ],
            },
          ],
        },
      },
    };

    const data = ModularUIResponse.create({
      data: firstMissingJSON,
      contributions: FormContributionsJSON,
    });

    const form = new FormModel(data);

    expect(form.formdata).toBe(
      JSON.stringify({
        objects: [
          {
            Person: {
              Name: "John Doe",
              DateOfBirth: null,
              DateOfDeath: null,
            },
          },
        ],
      })
    );

    const nextData = ModularUIResponse.create({
      data: {
        formresponse: {
          _links: {},
          missing: {
            anchors: [
              {
                objectid: "Details",
                index: 1,
                numberofrepeats: 3,
                elements: [{ elementid: "Address" }],
              },
            ],
          },
        },
      },
      contributions: FormContributionsJSON,
    });
    const nextForm = new FormModel(nextData);

    const updatedForm = form.update(nextForm);

    expect(updatedForm.formdata).toBe(
      JSON.stringify({
        objects: [
          {
            Person: {
              Name: "John Doe",
              DateOfBirth: null,
              DateOfDeath: null,
            },
          },
          {
            Details: {
              Address: null,
            },
          },
        ],
      })
    );

    const thirdData = ModularUIResponse.create({
      data: {
        formresponse: {
          _links: {},
          missing: {
            anchors: [
              {
                objectid: "Details",
                index: 2,
                numberofrepeats: 3,
                elements: [
                  { elementid: "Address", suggestion: "Second address" },
                ],
              },
            ],
          },
        },
      },
      contributions: FormContributionsJSON,
    });
    const thirdForm = new FormModel(thirdData);

    const updatedFormSecondIteration = updatedForm.update(thirdForm);

    expect(updatedFormSecondIteration.formdata).toBe(
      JSON.stringify({
        objects: [
          {
            Person: { Name: "John Doe", DateOfBirth: null, DateOfDeath: null },
          },
          { Details: { Address: null } },
          { Details: { Address: "Second address" } },
        ],
      })
    );
  });

  it("Can handle missing and error date range child", () => {
    const data = ModularUIResponse.create({
      data: {
        formresponse: {
          missing: {
            anchors: [
              {
                objectid: "Details",
                elementid: "DateRange.EndDate",
                value: "2019-09-01",
              },
            ],
          },
          errors: [
            {
              anchor: {
                objectid: "Details",
                elementid: "TimeRange",
              },
              id: "Constraint.TimeRange.InvalidRange",
              properties: {
                start: "12:00",
                end: "11:00",
              },
              message: "Start time must be before end time",
            },
          ],
        },
      },
      contributions: FormContributionsJSON,
    });

    const form = new FormModel(data);

    expect(form.currentFormObject.attributeCollection.size).toBe(1);
  });

  it("Can handle initial form errors on root level", () => {
    const data = ModularUIResponse.create({
      data: {
        formresponse: {
          errors: [
            {
              id: "FORM_ERROR_INCORRECT_INPUT",
              message:
                "The requested task cannot be executed due to incorrect input",
            },
          ],
        },
      },
      contributions: FormContributionsJSON,
    });

    const form = new FormModel(data);
    expect(form.errorCollection.size).toBe(1);
  });
});
