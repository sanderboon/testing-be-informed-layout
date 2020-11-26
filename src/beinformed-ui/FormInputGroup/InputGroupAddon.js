// @flow
import { memo, Children, isValidElement } from "react";

import styled from "styled-components";
import classNames from "classnames";
import { themeProp } from "beinformed/theme/utils";

import { InputGroupText } from "_component-registry/input";

import type { Node } from "react";
export type Props = {
  +className?: string,
  +children?: Node,
  +isPrepend?: boolean,
  +isAppend?: boolean,
};

const StyledAddon = styled.div`
  display: flex;
  font-size: ${themeProp("INPUT_ADDON_FONT_SIZE")};
  height: calc(2.25rem + 2px);

  ${({ isPrepend }) => isPrepend && `margin-right: -1px;`};
  ${({ isAppend }) => isAppend && `margin-left: -1px;`};
`;

/**
 * Render append
 */
const InputGroupAddon = memo<Props>(
  ({ className, children, isPrepend, isAppend }: Props) => (
    <StyledAddon
      className={classNames("input-group-addon", className)}
      isPrepend={isPrepend}
      isAppend={isAppend}
    >
      {Children.map(children, (addon) =>
        isValidElement(addon) ? (
          addon
        ) : (
          <InputGroupText isPrepend={isPrepend} isAppend={isAppend}>
            {addon}
          </InputGroupText>
        )
      )}
    </StyledAddon>
  )
);

InputGroupAddon.displayName = "BI.InputGroupAddon";

export default InputGroupAddon;
