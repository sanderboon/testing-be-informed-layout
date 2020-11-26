// @flow
import classNames from "classnames";
import styled from "styled-components";
import { themeProp, spacer, spacers } from "beinformed/theme/utils";

import { useMessage } from "beinformed/i18n";

import { Icon } from "_component-registry/icon";

export type Props = {
  +className?: string,
  +name: string,
  +label: string,
  +contextLabel?: string,
  +isOpen: boolean,
  +onClick: Function,
  +onKeyDown: Function,
};

const StyledLabel = styled.div`
  position: relative;
  padding: ${spacers(1, 0, 0.5)};
  margin-bottom: ${spacer(0.5)};
  font-weight: ${themeProp("FONT_WEIGHT_LABEL")};
  border-bottom: 1px solid ${themeProp("GREY_300", "#dee2e6")};

  label {
    margin-bottom: 0;
  }
`;

const StyledToggle = styled.span`
  cursor: pointer;
  background: none;
  border: 0;

  position: absolute;
  right: ${spacer(0.25)};
  top: ${spacer(1.25)};
`;

const FilterLabel = ({
  className,
  name,
  label,
  contextLabel,
  isOpen = true,
  onClick,
  onKeyDown,
}: Props) => {
  const filterLabel = contextLabel ? `${label} (${contextLabel})` : label;

  return (
    <StyledLabel
      className={classNames("filter-label", className)}
      role="button"
      aria-expanded={isOpen}
      aria-controls={`${name}-body`}
      tabIndex="0"
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <div id={`${name}-label`}>{filterLabel}</div>
      <StyledToggle
        aria-label={useMessage("Filter.toggleButton", "Toggle filter")}
      >
        <Icon name={isOpen ? "chevron-up" : "chevron-down"} />
      </StyledToggle>
    </StyledLabel>
  );
};
FilterLabel.displayName = "BI.FilterLabel";

export default FilterLabel;
