// @flow
import { mdiArrowLeft, mdiArrowRight } from "@mdi/js";

import { KEYCODES } from "beinformed/constants/Constants";

import { DatepickerDateToolbarView } from "_component-registry/datetimepicker";

import { calcNewPeriod, getToolbarSwitchLabel } from "./_utils";

export type Props = {
  +className?: string,
  +date: string,
  +type: "days" | "months" | "years" | "decades",
  +iconLeft?: string,
  +iconRight?: string,
  +onChange: (value: string) => void,
  +onSwitch: (value: "days" | "months" | "years" | "decades") => void,
};

const DatepickerDateToolbar = ({
  className,
  date,
  type = "days",
  iconLeft = mdiArrowLeft,
  iconRight = mdiArrowRight,
  onChange,
  onSwitch,
}: Props) => {
  const handleSwitch = () => {
    const typeMap = {
      days: "months",
      months: "years",
      years: "decades",
      decades: "days",
    };

    onSwitch(typeMap[type]);
  };

  const handleClick = (
    e: SyntheticEvent<HTMLButtonElement>,
    eventType: "switch" | "next" | "prev"
  ) => {
    if (eventType === "switch") {
      handleSwitch();
    } else {
      onChange(calcNewPeriod(date, type, eventType));
    }
  };

  const handleKeydown = (
    e: SyntheticKeyboardEvent<HTMLButtonElement>,
    eventType: "switch" | "next" | "prev"
  ) => {
    if (e.keyCode === KEYCODES.ENTER || e.keyCode === KEYCODES.SPACE) {
      e.preventDefault();

      handleClick(e, eventType);
    }
  };

  const switchLabel = getToolbarSwitchLabel(date, type);

  return (
    <DatepickerDateToolbarView
      className={className}
      switchLabel={switchLabel.toString()}
      iconLeft={iconLeft}
      iconRight={iconRight}
      onClick={handleClick}
      onKeydown={handleKeydown}
    />
  );
};

DatepickerDateToolbar.displayName = "BI.DatepickerDateToolbar";

export default DatepickerDateToolbar;
