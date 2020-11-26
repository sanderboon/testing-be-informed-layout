// @flow
import styled from "styled-components";
import { gutter } from "beinformed/theme/utils";

const Row = styled.div`
  display: flex;
  flex-wrap: ${({ nowrap }) => (nowrap ? "nowrap" : "wrap")};
  margin-right: ${gutter(-1)};
  margin-left: ${gutter(-1)};
`;

export default Row;
