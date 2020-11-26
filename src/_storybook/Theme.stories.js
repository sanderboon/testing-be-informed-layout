import { isFunction } from "lodash";
import styled, { withTheme } from "styled-components";

import { themeProp } from "beinformed/theme/utils";

import { allSettings } from "beinformed/constants/Settings";

const StyledRow = styled.tr`
  border-top: 1px solid #ccc;

  &:first-child {
    border-top: 0;
  }
`;
const StyledCell = styled.td`
  position: relative;
  padding: 5px 30px 5px 5px;
`;

export default {
  title: "Theme",
};

export const Settings = () => (
  <table>
    <tbody>
      {Object.entries(allSettings()).map(([key, value]) => (
        <StyledRow key={key}>
          <StyledCell>{key}</StyledCell>
          <StyledCell>{JSON.stringify(value)}</StyledCell>
        </StyledRow>
      ))}
    </tbody>
  </table>
);

const StyledWrapper = styled.div``;
const ColorBox = styled.div`
  position: relative;
  display: inline-block;
  width: 150px;
  height: 150px;
  border: 1px solid #000;
  margin: 50px 50px 100px;

  .label {
    position: absolute;
    bottom: -2em;
  }

  .value {
    position: absolute;
    top: calc(50% - 1em);
    width: 150px;
    text-align: center;
    color: #fff;
  }
`;
const PrimaryColor = styled(ColorBox)`
  background-color: ${themeProp("PRIMARY_COLOR")};
`;
const PrimaryAccentColor = styled(ColorBox)`
  background-color: ${themeProp("PRIMARY_ACCENT_COLOR")};
`;
const SecondaryColor = styled(ColorBox)`
  background-color: ${themeProp("SECONDARY_COLOR")};
`;
const MainColorSettings = withTheme(({ theme }) => (
  <StyledWrapper>
    <PrimaryColor>
      <span className="value">{theme.PRIMARY_COLOR}</span>
      <span className="label">PRIMARY_COLOR</span>
    </PrimaryColor>
    {theme.PRIMARY_ACCENT_COLOR && (
      <PrimaryAccentColor>
        <span className="value">{theme.PRIMARY_ACCENT_COLOR}</span>
        <span className="label">PRIMARY_ACCENT_COLOR</span>
      </PrimaryAccentColor>
    )}
    <SecondaryColor>
      <span className="value">{theme.SECONDARY_COLOR}</span>
      <span className="label">SECONDARY_COLOR</span>
    </SecondaryColor>
  </StyledWrapper>
));
export const MainColors = () => <MainColorSettings />;

const FontSettings = withTheme(({ theme }) => (
  <table>
    <tbody>
      {Object.entries(theme)
        .filter(([key]) => key.startsWith("FONT"))
        .map(([key, value]) => (
          <StyledRow key={key}>
            <StyledCell>{key}</StyledCell>
            <StyledCell>{value}</StyledCell>
          </StyledRow>
        ))}
    </tbody>
  </table>
));

export const Fonts = () => <FontSettings />;

const StyledValue = styled.span`
  position: absolute;
  top: 7px;
  left: -20px;

  display: inline-block;
  background-color: ${({ value }) => value};
  outline: 1px solid #000;
  font-size: 1px;
  line-height: 1;
  width: 16px;
  height: 16px;
`;

const ThemeConfiguration = withTheme(({ theme }) => (
  <table>
    <tbody>
      {Object.entries(theme).map(([key, value]) => {
        const strValue = isFunction(value)
          ? "function"
          : JSON.stringify(value).replaceAll('"', "");

        return (
          <StyledRow key={key}>
            <StyledCell>{key}</StyledCell>
            <StyledCell>
              {strValue.startsWith("#") && <StyledValue value={strValue} />}
              <span>{strValue}</span>
            </StyledCell>
          </StyledRow>
        );
      })}
    </tbody>
  </table>
));

export const all = () => <ThemeConfiguration />;
