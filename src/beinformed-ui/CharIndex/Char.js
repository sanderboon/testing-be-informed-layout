// @flow
import styled, { css } from "styled-components";
import { themeProp } from "beinformed/theme/utils";

import { Href } from "beinformed/models";

import { LinkButton } from "_component-registry/buttons";

const StyledButton = styled(LinkButton)`
  background-color: #fff;
  position: relative;
  font-size: 0.8rem;
  padding: 0.375rem 0.6rem;
  border-color: ${themeProp("INPUT_BORDER_COLOR")};

  &:not(:first-child) {
    margin-left: -1px;
  }

  &:focus,
  &:hover {
    z-index: 2;
  }

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      background-color: ${themeProp("BUTTON_DISABLED_BG")};
      color: ${themeProp("BUTTON_DISABLED_COLOR")};
      border-color: ${themeProp("BUTTON_DISABLED_BORDER_COLOR")};
    `};

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: ${themeProp("BUTTON_PRIMARY_BG")};
      color: ${themeProp("BUTTON_PRIMARY_COLOR")};
      border-color: ${themeProp("BUTTON_PRIMARY_BORDER_COLOR")};
    `};
`;

export type Props = {
  +className?: string,
  +char: string,
  +href: Href,
  +isEnabled: boolean,
  +isActive: boolean,
  +onClick?: boolean,
};

const Char = ({
  className,
  char,
  href,
  isEnabled,
  isActive = false,
  onClick,
}: Props) => {
  const charHref = new Href(href).addParameter("index", char);

  return (
    <StyledButton
      key={char}
      className={className}
      dataId={char}
      href={charHref}
      isActive={isActive}
      isDisabled={!isEnabled}
      onClick={onClick}
    >
      {char}
    </StyledButton>
  );
};

Char.displayName = "BI.Char";

export default Char;
