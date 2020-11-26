import { create } from "@storybook/theming/create";
import Logo from "./beinformed-logo.png";

export default create({
  base: "light",

  colorPrimary: "#ed8400",
  colorSecondary: "#e07b00",

  brandTitle: "General layout storybook",
  brandUrl: "https://plaza.beinformed.com/amdoc/user-interface",
  brandImage: Logo
});
