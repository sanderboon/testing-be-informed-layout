// @flow
import { Tooltip } from "_component-registry/tooltip";
import { LinkButton } from "_component-registry/buttons";

import type { Href } from "beinformed/models";
export type Props = {
  +className?: string,
  +itemId: string | number,
  +href: Href,
  +label: string,
};

const ButtonDelete = ({ className, itemId, href, label }: Props) => (
  <Tooltip content={label}>
    <LinkButton
      className={className}
      key={`${itemId}--delete`}
      icon="trash-can-outline"
      dataId={`${itemId}--delete`}
      href={href}
      ariaLabel={label}
    />
  </Tooltip>
);

ButtonDelete.displayName = "BI.ButtonDelete";

export default ButtonDelete;
