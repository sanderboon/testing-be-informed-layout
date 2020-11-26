import ModularUIResponse from "beinformed/modularui/ModularUIResponse";
import FormModel from "../FormModel";

import FormContributionsJSON from "./FormContributions.json";

describe("FormModel repeating objects", () => {
  it("should be able to add an empty form object from existing object", () => {
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

    expect(form.currentFormObject.key).toBe("Person");
    expect(form.allObjects).toHaveLength(1);
    expect(form.currentFormObject.repeatIndex).toBe(1);

    form.addEmptyFormObject(form.currentFormObject);
    expect(form.allObjects).toHaveLength(2);
    expect(form.currentFormObject.repeatIndex).toBe(2);

    expect(form.allObjects[0].key).toBe(form.currentFormObject.key);
    expect(form.allObjects[0]).not.toBe(form.currentFormObject);

    form.addEmptyFormObject();
    expect(form.allObjects).toHaveLength(3);
    expect(form.currentFormObject.repeatIndex).toBe(3);

    expect(() => form.removeFormObject()).toThrow();
    expect(() => form.removeFormObject(form.currentFormObject)).toThrow();

    form.removeFormObject(form.allObjects[0]);

    expect(form.allObjects).toHaveLength(2);
    expect(form.currentFormObject.repeatIndex).toBe(3);
  });
});
