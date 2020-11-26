// @flow
import type { Node } from "react";
import type { Href } from "beinformed/models";
export type Props = {
  +action?: Href,
  +children?: Node,
  +className?: string,
  +method?: "post" | "get",
  +name: string,
  +onSubmit: Function,
};

/**
 * Render a HTML form
 */
const HTMLForm = ({
  action,
  children,
  className,
  method = "post",
  name,
  onSubmit,
}: Props) => {
  const actionHref = action ? action.absolutepath : null;

  return (
    <form
      className={className}
      method={method}
      action={actionHref}
      name={name}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();

        return setTimeout(() => onSubmit(e), 200);
      }}
    >
      {children}
    </form>
  );
};

HTMLForm.displayName = "BI.HTMLForm";

export default HTMLForm;
