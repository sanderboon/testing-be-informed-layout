import ModularUIResponse from "beinformed/modularui/ModularUIResponse";
import FormInstrumentContributionsJSON from "./FormInstrumentContributions.json";

import FormModel from "beinformed/models/form/FormModel";

describe("FormModel Instrument Questions", () => {
  it("creates a current form object from instrument question with question and result", () => {
    const initial = {
      formresponse: {
        _links: {},
        missing: {
          anchors: [
            {
              objectid: "BerekenBoete",
              elementid: "GemetenGl",
            },
          ],
        },
        results: [
          {
            objectid: "BerekenBoete",
            elements: [
              {
                elementid: "BoeteGeenGordel",
                value: 0,
              },
              {
                elementid: "BoeteTeHardRijden",
                value: 507,
              },
            ],
          },
        ],
      },
    };

    const data = ModularUIResponse.create({
      data: initial,
      contributions: FormInstrumentContributionsJSON,
    });
    const form = new FormModel(data);

    expect(form.currentFormObject.attributeCollection).toHaveLength(3);
    expect(
      form.currentFormObject.attributeCollection.filter(
        (attr) => !attr.isResult
      ).length
    ).toBe(1);
  });

  it("is able to handle instrument questions", () => {
    const firstMissingJSON = {
      formresponse: {
        _links: {},
        missing: {
          anchors: [
            {
              objectid: "BerekenBoete",
              elements: [
                {
                  elementid: "KmhTeHard",
                },
              ],
            },
          ],
        },
      },
    };

    const data = ModularUIResponse.create({
      data: firstMissingJSON,
      contributions: FormInstrumentContributionsJSON,
    });

    const form = new FormModel(data);

    expect(form.formdata).toBe(
      JSON.stringify({
        objects: [],
      })
    );

    const attr1 = form.currentFormObject.getAttributeByKey("KmhTeHard");
    form.currentFormObject.updateAttribute(attr1, "81");

    expect(form.formdata).toBe(
      JSON.stringify({
        objects: [
          {
            BerekenBoete: {
              KmhTeHard: 81,
            },
          },
        ],
      })
    );

    const nextData = ModularUIResponse.create({
      data: {
        formresponse: {
          missing: {
            anchors: [
              {
                objectid: "BerekenBoete",
                elementid: "GordelOm",
              },
            ],
          },
          results: [
            {
              objectid: "BerekenBoete",
              elements: [
                {
                  elementid: "BoeteTeHardRijden",
                  value: 507,
                },
              ],
            },
          ],
        },
      },
      contributions: FormInstrumentContributionsJSON,
    });
    const nextForm = new FormModel(nextData);

    const updatedForm = form.update(nextForm);

    expect(updatedForm.formdata).toBe(
      JSON.stringify({
        objects: [
          {
            BerekenBoete: {
              KmhTeHard: 81,
            },
          },
        ],
      })
    );

    const attr2 = updatedForm.currentFormObject.getAttributeByKey("GordelOm");
    updatedForm.currentFormObject.updateAttribute(attr2, "true");
    expect(updatedForm.formdata).toBe(
      JSON.stringify({
        objects: [
          {
            BerekenBoete: {
              KmhTeHard: 81,
              GordelOm: true,
            },
          },
        ],
      })
    );

    const thirdForm = new FormModel({
      data: {
        formresponse: {
          _links: {},
          missing: {
            anchors: [
              {
                objectid: "BerekenBoete",
                elementid: "GemetenGl",
              },
            ],
          },
          results: [
            {
              objectid: "BerekenBoete",
              elements: [
                {
                  elementid: "BoeteGeenGordel",
                  value: 0,
                },
                {
                  elementid: "BoeteTeHardRijden",
                  value: 507,
                },
              ],
            },
          ],
        },
      },
      contributions: FormInstrumentContributionsJSON,
    });

    const updatedFormSecondIteration = updatedForm.update(thirdForm);

    expect(updatedFormSecondIteration.formdata).toBe(
      JSON.stringify({
        objects: [
          {
            BerekenBoete: {
              KmhTeHard: 81,
              GordelOm: true,
            },
          },
        ],
      })
    );
  });
});
