// @flow
import classNames from "classnames";
import {
  Dropdown,
  DropdownButton,
  DropdownChildren,
  DropdownItem,
} from "_component-registry/dropdown";
import { Icon } from "_component-registry/icon";

import styled from "styled-components";
import { themeProp, spacer } from "beinformed/theme/utils";

export type Props = {
  +className?: string,
  +align?: "left" | "right",
  +overviews: Array<{ key: string, label: string }>,
  +activeOverview: string,
  +onChange: Function,
};

const StyledDropdown = styled(Dropdown)`
  .dropdown-toggle {
    background: ${themeProp("WHITE")};
    font-size: ${themeProp("FONT_SIZE_BASE")};
  }

  svg {
    color: ${themeProp("PRIMARY_COLOR")};
    width: 1.4rem;
    height: 1.4rem;

    margin-top: ${spacer(-0.4)};
    top: ${spacer(0.4)};
  }

  .dropdown-menu {
    div:focus,
    div:hover {
      background: transparent;
      color: ${themeProp("PRIMARY_COLOR")};
      cursor: pointer;
    }
  }
`;

const ModelOverviewSelector = ({
  className,
  align,
  overviews,
  activeOverview,
  onChange,
}: Props) => {
  const activeOverviewConfig = overviews.find(
    (overview) => overview.key === activeOverview
  );
  const activeOverviewLabel = activeOverviewConfig
    ? activeOverviewConfig.label
    : "Choose one";

  return (
    <StyledDropdown className={classNames("modeloverview-selector", className)}>
      <DropdownButton>{activeOverviewLabel}</DropdownButton>
      <DropdownChildren align={align}>
        {overviews.map((overview) => (
          <DropdownItem
            key={overview.key}
            id={overview.key}
            onClick={() => onChange(overview.key)}
          >
            {overview.key === activeOverview ? (
              <Icon name="checkbox-marked-circle-outline" textAfter />
            ) : (
              <Icon name="checkbox-blank-circle-outline" textAfter />
            )}

            <span className="link-text">{overview.label}</span>
          </DropdownItem>
        ))}
      </DropdownChildren>
    </StyledDropdown>
  );
};
ModelOverviewSelector.displayName = "BI.ModelOverviewSelector";

export default ModelOverviewSelector;
