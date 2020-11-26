// @flow
import styled, { css } from "styled-components";
import { isNumber } from "lodash";

import { gutter } from "beinformed/theme/utils";

const Column = styled.div`
  position: relative;
  padding-right: ${gutter()};
  padding-left: ${gutter()};
  width: 100%;
  min-width: 0;

  ${({ theme = { GRID_SIZE: 12 }, size }) => {
    if (size === "auto") {
      return css`
        width: auto;
        flex: 0 1 auto;
      `;
    }

    if (isNumber(size)) {
      return css`
        width: 100%;
        flex: 0 0 ${size * (100 / theme.GRID_SIZE)}%;
        max-width: ${size * (100 / theme.GRID_SIZE)}%;
      `;
    }

    return css`
      flex-basis: 0;
      flex-grow: 1;
      max-width: 100%;
    `;
  }};

  ${({ theme = { GRID_SIZE: 12 }, offset }) =>
    offset &&
    isNumber(offset) &&
    css`
      margin-left: ${offset * (100 / theme.GRID_SIZE)}%;
    `};
`;

export default Column;
