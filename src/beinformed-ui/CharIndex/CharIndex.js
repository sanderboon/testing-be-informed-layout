// @flow
import classNames from "classnames";
import styled from "styled-components";
import { roundedCorners } from "beinformed/theme/utils";

import { Char } from "_component-registry/modelcatalog";

import { Href } from "beinformed/models";

export type Props = {
  +className?: string,
  +active: Array<string>,
  +enabled: Array<string>,
  +href: Href,
  +onClick?: Function,
};

const StyledIndex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  > * {
    border-radius: 0;
  }

  > :first-child {
    ${roundedCorners("bottom-left")};
    ${roundedCorners("top-left")};
  }

  > :last-child {
    ${roundedCorners("bottom-right")};
    ${roundedCorners("top-right")};
  }
`;

const CharIndex = ({
  className,
  active = [],
  enabled = [],
  href,
  onClick,
}: Props) => {
  const allChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0_".split("");
  const charsNotInDefault = enabled
    ? enabled.filter((enabledChar) => !allChars.includes(enabledChar))
    : [];

  return (
    <StyledIndex
      className={classNames("char-index", className)}
      role="group"
      aria-label="Character index"
    >
      {allChars.map((char) => (
        <Char
          key={char}
          char={char}
          href={href}
          isEnabled={enabled.includes(char)}
          isActive={active.includes(char)}
          onClick={onClick}
        />
      ))}
      {charsNotInDefault.map((char) => (
        <Char
          key={char}
          char={char}
          href={href}
          isEnabled
          isActive={active.includes(char)}
          onClick={onClick}
        />
      ))}
    </StyledIndex>
  );
};

CharIndex.displayName = "BI.CharIndex";

export default CharIndex;
