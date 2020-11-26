// @flow
import { forwardRef } from "react";

import classNames from "classnames";
import styled from "styled-components";

import { ActionIcon, ActionStatusIcon } from "_component-registry/icon";
import { LinkButton } from "_component-registry/buttons";
import { Link } from "_component-registry/link";
import { DropdownLink } from "_component-registry/dropdown";

import type { Node } from "react";
import type { ActionModel } from "beinformed/models";
export type Props = {
  +action: ActionModel,
  +className?: string,
  +icon?: string,
  +size?: "small" | "large" | "default",
  +isButton?: boolean,
  +isPrimary?: boolean,
  +isDropdown?: boolean,
  +isModal?: boolean,
  +isDisabled?: boolean,
  +isProcessTaskGroup?: boolean,
  +isCompleteTaskGroup?: boolean,
  +renderIcon?: boolean,
  +renderLabel?: boolean,
  +children?: Node,
};

const StyledActionStatusIcon = styled(ActionStatusIcon)`
  width: 0.8em;
  height: 0.8em;
`;

/**
 * Create Action link with correct icon
 */
const Action = forwardRef<Props, HTMLElement>(
  (
    {
      action,
      className,
      icon,
      size,
      isButton,
      isPrimary,
      isDropdown,
      isModal = false,
      isDisabled = false,
      isProcessTaskGroup = false,
      isCompleteTaskGroup = false,
      renderIcon = true,
      renderLabel = true,
      children,
    }: Props,
    ref
  ) => {
    const linkClass = classNames("btn-task", className);

    const inner = (
      <>
        {renderIcon && (
          <ActionIcon
            action={action}
            icon={icon}
            textAfter={renderLabel || Boolean(children)}
            isProcessTaskGroup={isProcessTaskGroup}
            isCompleteTaskGroup={isCompleteTaskGroup}
          />
        )}
        {renderLabel && action.label}
        {isProcessTaskGroup && (
          <StyledActionStatusIcon action={action} textBefore />
        )}
        {children}
      </>
    );

    if (isButton) {
      return (
        <LinkButton
          ref={ref}
          dataId={action.name}
          href={action.selfhref}
          className={linkClass}
          size={size}
          isDisabled={action.isDisabled || isDisabled}
          buttonStyle={isPrimary ? "PRIMARY" : "DEFAULT"}
        >
          {inner}
        </LinkButton>
      );
    }

    if (isDropdown) {
      return (
        <DropdownLink
          ref={ref}
          dataId={action.name}
          href={action.selfhref}
          className={linkClass}
          isModal={isModal}
          isDisabled={action.isDisabled || isDisabled}
        >
          {inner}
        </DropdownLink>
      );
    }

    return (
      <Link
        ref={ref}
        dataId={action.name}
        href={action.selfhref}
        className={linkClass}
        isModal={isModal}
        isDisabled={action.isDisabled || isDisabled}
        isButton={isButton}
      >
        {inner}
      </Link>
    );
  }
);

Action.displayName = "BI.Action";

export default Action;
