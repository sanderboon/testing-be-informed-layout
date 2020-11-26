// @flow
import isColor from "is-color";

import styled, { withTheme } from "styled-components";

import { allSettings } from "beinformed/constants/Settings";

const StyledHeader = styled.h2`
  margin-top: 1em;
`;
const StyledWrapper = styled.div`
  background: #fff;
  margin: 10px;
  padding: 10px;
`;
const StyledRow = styled.tr`
  border-bottom: 1px solid #000;
`;
const StyledCell = styled.td`
  position: relative;
  padding-left: 25px;
`;
const StyledValue = styled.span`
  position: absolute;
  top: 4px;
  left: 0px;

  display: inline-block;
  background-color: ${({ value }) => value};
  outline: 1px solid #000;
  font-size: 1px;
  line-height: 1;
  width: 16px;
  height: 16px;
`;

export type Props = {
  +theme: Object,
};
const ShowAvailableThemeProps = ({ theme }: Props) => (
  <StyledWrapper>
    <h2>Settings</h2>
    <table>
      <tbody>
        {Object.entries(allSettings()).map(([key, value]) => (
          <StyledRow key={key}>
            <th>{JSON.stringify(key)}</th>
            <StyledCell>{JSON.stringify(value)}</StyledCell>
          </StyledRow>
        ))}
      </tbody>
    </table>

    <StyledHeader>Theme</StyledHeader>
    <table>
      <tbody>
        {Object.entries(theme).map(([key, value]) => (
          <StyledRow key={key}>
            <th>{JSON.stringify(key)}</th>
            <StyledCell>
              {JSON.stringify(value)}
              {isColor(value) && (
                <StyledValue value={value}>&nbsp;</StyledValue>
              )}
            </StyledCell>
          </StyledRow>
        ))}
      </tbody>
    </table>
  </StyledWrapper>
);
ShowAvailableThemeProps.displayName = "BI.ShowAvailableThemeProps";

export default withTheme(ShowAvailableThemeProps);
