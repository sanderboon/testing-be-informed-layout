// @flow
import { memo, useEffect } from "react";
import classNames from "classnames";
import { mdiCloseCircle } from "@mdi/js";

import { Message } from "beinformed/i18n";

import { Button } from "_component-registry/buttons";
import { Icon } from "_component-registry/icon";

import { KEYCODES } from "beinformed/constants/Constants";

export type Props = {
  +className?: string,
  +iconPath?: any,
  +onClose: (e: SyntheticEvent<*>) => void,
};

const isDatePicker = (target: EventTarget) => {
  return target instanceof HTMLElement && target.closest(".datetimepicker");
};

const isDropdown = (target: EventTarget) => {
  return target instanceof HTMLElement && target.closest(".dropdown");
};

const CloseButton = memo<Props>(({ className, iconPath, onClose }: Props) => {
  useEffect(() => {
    const handler = (e: SyntheticKeyboardEvent<any>) => {
      // should not close on open datetimepickers
      if (
        e.keyCode === KEYCODES.ESCAPE &&
        !isDatePicker(e.target) &&
        !isDropdown(e.target)
      ) {
        onClose(e);
      }
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <Button
      className={classNames("close", className)}
      aria-label="Close"
      name="closeButton"
      buttonStyle="LINK"
      onClick={onClose}
    >
      <Icon path={iconPath || mdiCloseCircle} />
      <Message id="CloseButton.label" defaultMessage="Close" screenreaderOnly />
    </Button>
  );
});

CloseButton.displayName = "BI.CloseButton";

export default CloseButton;
