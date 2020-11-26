// @flow
import styled from "styled-components";
import { spacer } from "beinformed/theme/utils";

import {
  Dropdown,
  DropdownButton,
  DropdownChildren,
  DropdownItem,
} from "_component-registry/dropdown";

import classNames from "classnames";

import type { FilterModel } from "beinformed/models";
export type Props = {
  +active: FilterModel,
  +className?: string,
  +options: Array<FilterModel>,
  +onChange: (option: FilterModel) => void,
};

const StyledDropdown = styled(Dropdown)`
  margin-right: ${spacer(0.25)};
`;

/**
 * Render pagesize chooser
 */
const QuickSearchChooser = ({
  className,
  options,
  active,
  onChange,
}: Props) => (
  <StyledDropdown className={classNames("quicksearchchooser", className)}>
    <DropdownButton>{active.label}</DropdownButton>
    <DropdownChildren>
      {options.map((option) => (
        <DropdownItem
          key={option.name}
          value={option.name}
          onClick={() => onChange(option)}
        >
          {option.label}
        </DropdownItem>
      ))}
    </DropdownChildren>
  </StyledDropdown>
);

QuickSearchChooser.displayName = "BI.QuickSearchChooser";

export default QuickSearchChooser;
