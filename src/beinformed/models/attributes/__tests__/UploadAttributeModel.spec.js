import UploadAttributeModel from "beinformed/models/attributes/UploadAttributeModel";

describe("UploadAttributeModel", () => {
  it("should be able to create an empty UploadAttributeModel object", () => {
    const attribute = new UploadAttributeModel({});

    expect(attribute).toBeInstanceOf(UploadAttributeModel);
    expect(attribute.type).toBe("upload");
    expect(attribute.multiple).toBeFalsy();
    expect(attribute.constraintCollection).toHaveLength(0);
  });

  it("Can handle multiple files", () => {
    const attribute = new UploadAttributeModel(
      {},
      {
        allowedMimeTypes: ["image/jpeg", "image/png"],
        allowedExtensions: ["jpg", "jpeg", "png"],
        uploadMaxFileSize: 10000,
      }
    );

    attribute.update(`{
      "test.jpg": {
        "name": "test.jpg",
        "size": 200,
        "progress": 100,
        "token": "abc"
      },
      "test2.jpg": {
        "name": "test2.jpg",
        "size": 100,
        "progress": 100,
        "token": "def"
      }
    }`);

    expect(attribute.uploadedFileSize).toBe(300);
  });

  it("Can have upload constraints", () => {
    const attribute = new UploadAttributeModel(
      {},
      {
        allowedMimeTypes: ["image/jpeg", "image/png"],
        allowedExtensions: ["jpg", "jpeg", "png"],
        uploadMaxFileSize: 10000,
      }
    );

    expect(attribute.constraintCollection).toHaveLength(2);

    expect(attribute.constraintCollection.all[0].id).toBe(
      "Constraint.File.InvalidExtension"
    );
    expect(attribute.constraintCollection.all[1].id).toBe(
      "Constraint.File.MaxFileSize"
    );
  });
});
