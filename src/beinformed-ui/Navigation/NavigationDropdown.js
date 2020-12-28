// @flow
import classNames from "classnames";
import styled from "styled-components";
import { spacers } from "beinformed/theme/utils";

import {
  Dropdown,
  DropdownButton,
  DropdownChildren,
  DropdownLink,
} from "_component-registry/dropdown";

import type { LinkModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +toggleLabel: string,
  +items: Array<LinkModel>,
};

const StyledDropdownButton = styled(DropdownButton)`
  padding: ${spacers(0.5, 1)};
`;



/**
 * Tab component chooser
 */
const NavigationDropdown = ({ className, toggleLabel, items }: Props) => (
  <Dropdown className={classNames("nav-dropdown", className)}>
    <StyledDropdownButton>{toggleLabel}</StyledDropdownButton>
    <DropdownChildren>
      {items.map((item) => (
        <DropdownLink key={item.key} dataId={item.key} href={item.href}>
          {item.label}
        </DropdownLink> 
      ))}
 

    </DropdownChildren>
  </Dropdown>
  
);

NavigationDropdown.displayName = "BI.NavigationDropdown";

export default NavigationDropdown;
