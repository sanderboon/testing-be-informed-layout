import ModelCatalogModel from "beinformed/models/modelcatalog/ModelCatalogModel";

describe("ModelCatalogModel", () => {
  it("should be able to create an empty ModelCatalogModel object", () => {
    const modelcatalog = new ModelCatalogModel();

    expect(modelcatalog).toBeInstanceOf(ModelCatalogModel);
  });
});
