import ModularUIResponse from "../ModularUIResponse";

describe("ModularUIResponse", () => {
  it("can create an empty response", () => {
    expect(new ModularUIResponse()).toBeInstanceOf(ModularUIResponse);
    expect(ModularUIResponse.create()).toBeInstanceOf(ModularUIResponse);

    expect(
      ModularUIResponse.create({
        key: "sleutel",
      }) instanceof ModularUIResponse
    ).toBeTruthy();

    expect(
      ModularUIResponse.create({
        data: {
          dataKey: {},
        },
      }) instanceof ModularUIResponse
    ).toBeTruthy();

    expect(
      ModularUIResponse.create({
        contributions: {
          contriKey: {},
        },
      }) instanceof ModularUIResponse
    ).toBeTruthy();
  });

  it("can create a response with static create method", () => {
    const response = ModularUIResponse.create({
      key: "sleutel",
      data: {
        sleutel: {
          prop: "value",
        },
      },
      contributions: {
        sleutel: {
          resourcetype: "Application",
        },
      },
    });

    expect(response.key).toBe("sleutel");
    expect(response.data.prop).toBe("value");
    expect(response.contributions.resourcetype).toBe("Application");
  });

  it("can handle locale", () => {
    const response = ModularUIResponse.create();

    response.locale = "en";
    expect(response.locale).toBe("en");
  });

  it("can handle key", () => {
    const response = ModularUIResponse.create();

    response.key = "sleutel";
    expect(response.key).toBe("sleutel");
  });

  it("can handle data", () => {
    const response = ModularUIResponse.create();

    response.data = { sleutel: "value" };
    expect(response.data.sleutel).toBe("value");
  });

  it("can handle contributions", () => {
    const response = ModularUIResponse.create();

    response.contributions = { sleutel: "value" };
    expect(response.contributions.sleutel).toBe("value");
  });

  it("can rehydrate", () => {
    const response = ModularUIResponse.rehydrate({
      key: "Sleutel",
      data: { propName: "propValue" },
      contributions: { propName: "propValue" },
      locale: "en",
    });

    expect(response.key).toBe("Sleutel");
    expect(response.data.propName).toBe("propValue");
    expect(response.contributions.propName).toBe("propValue");
    expect(response.locale).toBe("en");
  });
});
