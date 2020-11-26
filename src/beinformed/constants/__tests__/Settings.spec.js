import { setSettings, getSetting } from "../Settings";

describe("Settings", () => {
  it("Should be able to retrieve settings", () => {
    setSettings({
      CUSTOM_SETTING: 1234,
    });

    expect(getSetting("CUSTOM_SETTING")).toBe(1234);
    expect(getSetting("NON_EXISTING", "DEFAULT VALUE")).toBe("DEFAULT VALUE");

    expect(() => {
      getSetting("NON_EXITING_NO_DEFAULT");
    }).toThrow();
  });
});
