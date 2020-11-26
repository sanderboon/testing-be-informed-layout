// @flow
import { createGlobalStyle } from "styled-components";
import { themeProp } from "beinformed/theme/utils";

const GlobalStyles = createGlobalStyle`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${themeProp("FONT_FAMILY_HEADER")};
  }

  /* stylelint-disable */
  /*
    This will hide the focus indicator if the element receives focus via the mouse,
    but it will still show up on keyboard focus using focus-visible class
  */
  .js-focus-visible :focus:not(.focus-visible) {
    outline: none;
  }
  
  .js-focus-visible .focus-visible:focus {
    outline: none;
    box-shadow: ${themeProp("FOCUS_OUTLINE")};
  }
  /* stylelint-enable */
`;

GlobalStyles.displayName = "BI.GlobalStyles";

export default GlobalStyles;
