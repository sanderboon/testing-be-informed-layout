import createTheme from "../createTheme";

describe("createTheme", () => {
  it("Creates the general theme", () => {
    const finalTheme = createTheme();

    expect(finalTheme).toEqual(
      expect.objectContaining({
        WHITE: "#fff",
        BUTTON_PRIMARY_DISABLED_BORDER_COLOR: "#0065d1",
      })
    );
  });

  it("Creates the general theme with custom config", () => {
    const finalTheme = createTheme({
      PRIMARY_COLOR: "#fff",
      INPUT_FOCUS_BORDER_COLOR: "#000",
    });

    expect(finalTheme).toEqual(
      expect.objectContaining({
        WHITE: "#fff",
        PRIMARY_COLOR: "#fff",
        BUTTON_PRIMARY_DISABLED_BORDER_COLOR: "#fff",
        INPUT_FOCUS_BORDER_COLOR: "#000",
      })
    );
  });

  it("Merges themes", () => {
    const config = {
      PROP1: "Value",
      PROP3: "$PROP1 3",
      PROP7: "$PROP6",
    };

    const themeFn = (input) => ({
      ...input,
      PROP2: "Value 2",
      PROP3: "Overwrite Prop 3",
      PROP4: "$PROP2",
    });

    const secondConfig = {
      PROP5: "Value 5",
    };

    const secondFn = (input) => ({
      ...input,
      PROP6: "Value 6",
    });

    const finalTheme = createTheme(
      {},
      [config, themeFn],
      secondConfig,
      secondFn
    );

    expect(finalTheme).toEqual(
      expect.objectContaining({
        PROP1: "Value",
        PROP2: "Value 2",
        PROP3: "Overwrite Prop 3",
        PROP4: "Value 2",
        PROP5: "Value 5",
        PROP6: "Value 6",
        PROP7: "Value 6",
      })
    );
  });
});
