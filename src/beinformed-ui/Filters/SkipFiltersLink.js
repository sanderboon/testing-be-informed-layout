// @flow
import styled from "styled-components";
import classNames from "classnames";

export type Props = {
  className?: string,
  listKey: string,
};

const StyledSkipFiltersLink = styled.a`
  left: -999px;
  position: absolute;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
  z-index: -999;

  &:focus,
  &:active {
    color: #fff;
    background-color: #000;
    left: auto;
    top: auto;
    width: 30%;
    height: auto;
    overflow: auto;
    margin: 10px 35%;
    padding: 5px;
    border-radius: 15px;
    border: 4px solid yellow;
    text-align: center;
    font-size: 1.2em;
    z-index: 999;
  }
`;

const SkipFiltersLink = ({ className, listKey }: Props) => (
  <StyledSkipFiltersLink
    className={classNames("no-initial-focus", className)}
    href={`#list-main-${listKey}`}
  >
    Skip to list results
  </StyledSkipFiltersLink>
);
SkipFiltersLink.displayName = "BI.SkipFiltersLink";

export default SkipFiltersLink;
