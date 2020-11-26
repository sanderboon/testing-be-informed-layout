// @flow
import classNames from "classnames";

import { ListHref } from "beinformed/models";

import { PagingButton } from "_component-registry/paging";
import { Icon } from "_component-registry/icon";

import type { Node } from "react";
export type Props = {
  +className?: string,
  +ariaLabel?: string,
  +baseHref: ListHref,
  +isEnabled?: boolean,
  +page: number,
  +type: "first" | "previous" | "next" | "last",
  +children?: Node,
  +onClick?: Function,
};

const getIcon = (type: string) => {
  switch (type) {
    case "last":
      return "chevron-double-right";
    case "next":
      return "chevron-right";
    case "first":
      return "chevron-double-left";
    case "previous":
      return "chevron-left";
    default:
      return null;
  }
};

/**
 * Paging item for prev and next arrows
 */
const PagingItemArrow = ({
  className,
  baseHref,
  page,
  type,
  isEnabled = true,
  ariaLabel,
  children,
  onClick,
}: Props) => {
  const pageHref = new ListHref(baseHref);
  pageHref.page = page;

  const icon = getIcon(type);

  return (
    <PagingButton
      className={classNames(`page-link-${type}`, className)}
      href={pageHref}
      ariaLabel={ariaLabel}
      isActive={false}
      isFirst={type === "first"}
      isLast={type === "last"}
      isDisabled={!isEnabled}
      onClick={onClick}
    >
      {icon && type !== "next" && (
        <Icon name={icon} textAfter={Boolean(children)} />
      )}
      {children}
      {icon && type === "next" && (
        <Icon name={icon} textBefore={Boolean(children)} />
      )}
    </PagingButton>
  );
};

PagingItemArrow.displayName = "BI.PagingItemArrow";

export default PagingItemArrow;
