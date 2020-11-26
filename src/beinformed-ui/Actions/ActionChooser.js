// @flow
import classNames from "classnames";

import { getSetting } from "beinformed/constants/Settings";

import { Icon } from "_component-registry/icon";
import { ButtonGroup } from "_component-registry/buttons";
import { Action } from "_component-registry/actions";
import {
  Dropdown,
  DropdownButton,
  DropdownChildren,
} from "_component-registry/dropdown";

import { Message } from "beinformed/i18n";

import type { ActionModel } from "beinformed/models";
export type Props = {
  +actions: Array<ActionModel>,
  +align?: "left" | "right",
  +className?: string,
  +direction?: "down" | "up",
  +dropdownTreshold?: number,
  +size?: "small" | "large" | "default",
};

/**
 * Render one or more actions
 */
const ActionChooser = ({
  actions,
  align,
  className,
  direction,
  dropdownTreshold = 1,
  size,
}: Props) => {
  const buttonActions = actions.filter((action, i) => i < dropdownTreshold);
  const dropdownActions = actions.filter((action, i) => i >= dropdownTreshold);

  if (actions.length === 0) {
    return null;
  }

  const RENDER_FORMS_IN_MODAL = getSetting("RENDER_FORMS_IN_MODAL");

  const dropdownActionComponents = dropdownActions.map((action) => (
    <Action
      key={action.name}
      action={action}
      isModal={RENDER_FORMS_IN_MODAL}
      isDropdown
    />
  ));

  return (
    <ButtonGroup
      className={classNames("actionchooser", className)}
      alignRight={align === "right"}
    >
      {buttonActions.map((action) => (
        <Action
          key={action.name}
          action={action}
          size={size}
          isModal={RENDER_FORMS_IN_MODAL}
          isButton
        />
      ))}

      {dropdownActions.length > 0 && (
        <Dropdown direction={direction}>
          <DropdownButton size={size} renderToggleIcon={false}>
            <Icon name="dots-horizontal" />
            <Message
              id="ActionChooser.ShowActions"
              defaultMessage="Show actions"
              screenreaderOnly
            />
          </DropdownButton>
          <DropdownChildren align={align}>
            {dropdownActionComponents}
          </DropdownChildren>
        </Dropdown>
      )}
    </ButtonGroup>
  );
};

ActionChooser.displayName = "BI.ActionChooser";

export default ActionChooser;
