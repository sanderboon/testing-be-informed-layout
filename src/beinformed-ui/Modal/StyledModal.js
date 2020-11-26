// @flow
import styled from "styled-components";
import { getThemeProp } from "beinformed/theme/utils/themeProps";

const StyledModal = styled.div`
  position: relative;
  width: auto;
  margin: 4% auto 2em;

  pointer-events: none;

  max-width: ${({ theme, size }) => {
    switch (size) {
      case "small":
        return getThemeProp(theme, "MODAL_SMALL_MAX_WIDTH");
      case "medium":
        return getThemeProp(theme, "MODAL_MEDIUM_MAX_WIDTH");
      case "xl":
        return getThemeProp(theme, "MODAL_XL_MAX_WIDTH");
      case "max":
        return getThemeProp(theme, "MODAL_MAX_MAX_WIDTH");
      default:
        return getThemeProp(theme, "MODAL_LARGE_MAX_WIDTH");
    }
  }};
`;

StyledModal.displayName = "BI.StyledModal";

export { StyledModal };
