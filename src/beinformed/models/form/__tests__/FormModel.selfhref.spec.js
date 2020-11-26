import ModularUIResponse from "beinformed/modularui/ModularUIResponse";
import FormModel from "../FormModel";

import FormContributionsJSON from "./FormInstrumentContributions.json";

describe("FormModel selfhref", () => {
  it("return a self href", () => {
    const firstMissingJSON = {
      formresponse: {
        _links: {
          self: {
            href: "/persons/persons/create-person",
          },
          api_doc: {
            href: "/api-docs/v3/persons/persons/create-person",
          },
          contributions: {
            href: "/contributions/persons/persons/create-person",
          },
        },
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

    expect(form.selfhref.toString()).toBe(
      "/persons/persons/create-person?commit=false"
    );
  });

  it("return a self href always-commit-form", () => {
    const firstMissingJSON = {
      _links: {
        self: {
          href: "/persons/persons/create-person",
        },
        api_doc: {
          href: "/api-docs/v3/persons/persons/create-person",
        },
        contributions: {
          href: "/contributions/persons/persons/create-person",
        },
      },
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
    };

    const formData = {
      data: firstMissingJSON,
      contributions: FormContributionsJSON,
    };

    const form = new FormModel(formData);

    expect(form.selfhref.toString()).toBe("/persons/persons/create-person");
  });
});
