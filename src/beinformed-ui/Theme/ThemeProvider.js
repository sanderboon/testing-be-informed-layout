// @flow
import { useSelector } from "react-redux";
import { ThemeProvider as SCThemeProvider } from "styled-components";

import createTheme from "beinformed/theme/createTheme";

import type { Node } from "react";
export type Props = {
  +theme: ?Object,
  +children: Node,
};

const ThemeProvider = ({ theme, children }: Props) => {
  const storedTheme = useSelector(({ preferences }) => preferences.theme);
  const finalTheme = createTheme(storedTheme, theme);

  return <SCThemeProvider theme={finalTheme}>{children}</SCThemeProvider>;
};
ThemeProvider.displayName = "BI.ThemeProvider";

export default ThemeProvider;
