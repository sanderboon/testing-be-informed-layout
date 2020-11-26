// @flow
import styled from "styled-components";

import { Icon } from "_component-registry/icon";
import { StyledButton } from "_component-registry/elements";
import { useMessage } from "beinformed/i18n";

const StyledToolbar = styled.div`
  border-bottom: 2px solid #d3d9df;
  width: 100%;
  display: flex;
`;

const StyledToolbarPrevious = styled(StyledButton)`
  width: 15%;
  border-right-width: 1px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
`;
const StyledToolbarSwitch = styled(StyledButton)`
  flex: 1;
  font-weight: 700;
  border-left-width: 1px;
  border-right-width: 1px;
  border-radius: 0;
`;
const StyledToolbarNext = styled(StyledButton)`
  width: 15%;
  border-left-width: 1px;
  border-top-left-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
`;

export type Props = {
  +className?: string,
  +switchLabel: string,
  +iconLeft?: string,
  +iconRight?: string,
  +onClick: Function,
  +onKeydown: Function,
};

const DatepickerDateToolbarView = ({
  className,
  switchLabel,
  iconLeft,
  iconRight,
  onClick,
  onKeydown,
}: Props) => (
  <StyledToolbar className={className}>
    <StyledToolbarPrevious
      type="button"
      aria-label={useMessage("DatePicker.previous", "Previous")}
      onClick={(e) => onClick(e, "prev")}
      onKeyDown={(e) => onKeydown(e, "prev")}
    >
      <Icon path={iconLeft} />
    </StyledToolbarPrevious>
    <StyledToolbarSwitch
      type="button"
      onClick={(e) => onClick(e, "switch")}
      onKeyDown={(e) => onKeydown(e, "switch")}
    >
      {switchLabel}
    </StyledToolbarSwitch>
    <StyledToolbarNext
      type="button"
      aria-label={useMessage("DatePicker.next", "Next")}
      onClick={(e) => onClick(e, "next")}
      onKeyDown={(e) => onKeydown(e, "next")}
    >
      <Icon path={iconRight} />
    </StyledToolbarNext>
  </StyledToolbar>
);
DatepickerDateToolbarView.displayName = "BI.DatepickerDateToolbarView";

export default DatepickerDateToolbarView;
