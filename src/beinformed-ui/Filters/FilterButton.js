// @flow
import { memo } from "react";

import classNames from "classnames";
import styled from "styled-components";
import { spacer } from "beinformed/theme/utils";

import { Icon } from "_component-registry/icon";
import { Button } from "_component-registry/buttons";

import { Message } from "beinformed/i18n";

const StyledButton = styled(Button)`
  margin-left: ${spacer(0.25)};
`;

export type Props = {
  +className?: string,
  +disabled?: boolean,
  +onClick?: Function,
};

const FilterButton = memo<Props>(({ className, disabled, onClick }: Props) => (
  <StyledButton
    className={classNames("filter-button", className)}
    name="filter"
    type="submit"
    buttonStyle="SECONDARY"
    isOutlineButton
    disabled={disabled}
    onClick={onClick}
  >
    <Icon name="chevron-right" />
    <Message id="FilterButton.Label" defaultMessage="Filter" screenreaderOnly />
  </StyledButton>
));

FilterButton.displayName = "BI.FilterButton";

export default FilterButton;
