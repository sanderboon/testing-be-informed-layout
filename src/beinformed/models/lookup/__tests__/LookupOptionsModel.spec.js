import FilterCollection from "beinformed/models/filters/FilterCollection";

import LookupOptionsModel from "beinformed/models/lookup/LookupOptionsModel";
import LookupOptionCollection from "beinformed/models/lookup/LookupOptionCollection";

import data from "./_LookupOptionsData.json";
import listData from "./_LookupOptionsListData.json";
import taxoData from "./_TaxonomyAttributeData.json";
import contributions from "./_LookupOptionsContributions.json";
import listContributions from "./_LookupOptionsListContributions.json";

import ModularUIResponse from "../../../modularui/ModularUIResponse";
import ChoiceAttributeOptionCollection from "../../attributes/ChoiceAttributeOptionCollection";

describe("LookupOptionsModel spec", () => {
  it("should be able to create an empty model", () => {
    const lookup = new LookupOptionsModel();

    expect(lookup).toBeInstanceOf(LookupOptionsModel);

    expect(lookup.key).toBe("unknown");

    expect(lookup.options).toBeInstanceOf(LookupOptionCollection);
    expect(lookup.options.all).toEqual([]);

    expect(lookup.filterCollection).toBeInstanceOf(FilterCollection);
  });

  it("should be able to create options", () => {
    const response = ModularUIResponse.create({
      key: "lookup",
      data,
      contributions,
    });

    const lookup = new LookupOptionsModel(response);

    expect(lookup).toBeInstanceOf(LookupOptionsModel);

    expect(lookup.options).toHaveLength(3);
    expect(
      lookup.options.first.children instanceof ChoiceAttributeOptionCollection
    ).toBeTruthy();
    expect(lookup.options.first.children).toHaveLength(0);
  });

  it("should be able to create options for list", () => {
    const response = ModularUIResponse.create({
      key: "lookup",
      data: listData,
      contributions: listContributions,
    });

    const lookup = new LookupOptionsModel(response);

    expect(lookup).toBeInstanceOf(LookupOptionsModel);

    expect(lookup.options).toHaveLength(8);
    expect(
      lookup.options.first.children instanceof ChoiceAttributeOptionCollection
    ).toBeTruthy();
    expect(lookup.options.first.children).toHaveLength(0);
  });

  it("should be able to create options for taxonomy attribute", () => {
    const response = ModularUIResponse.create({
      key: "lookup",
      data: taxoData,
      contributions,
    });

    const lookup = new LookupOptionsModel(response);

    expect(lookup).toBeInstanceOf(LookupOptionsModel);

    expect(lookup.options).toHaveLength(1);
    expect(
      lookup.options.first.children instanceof ChoiceAttributeOptionCollection
    ).toBeTruthy();
    expect(lookup.options.first.children).toHaveLength(1);
  });
});
