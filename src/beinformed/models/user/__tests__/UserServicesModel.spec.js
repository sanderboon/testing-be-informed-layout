import UserServicesModel from "beinformed/models/user/UserServicesModel";

describe("UserServicesModel", () => {
  it("should be able to create an empty UserServicesModel object", () => {
    const userServices = new UserServicesModel({});

    expect(userServices).toBeInstanceOf(UserServicesModel);
    expect(userServices.user === null).toBeTruthy();
  });
});
