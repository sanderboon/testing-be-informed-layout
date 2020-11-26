// @flow
import { Fragment } from "react";

import classNames from "classnames";

import { AttributeRenderer } from "_component-registry/inline-edit";

import type { CompositeAttributeModel } from "beinformed/models";
export type Props = {
  +attribute: CompositeAttributeModel,
  +className?: string,
  +id: string,
  +name: string,
  +inError: boolean,
  +onBlur: Function,
  +onChange: Function,
  +onValueChange: Function,
  +onFocus: Function,
};

/**
 * Render range widget
 */
const AttributeRange = ({
  className,
  attribute,
  id,
  onBlur,
  onChange,
  onFocus,
}: Props) => {
  return (
    <Fragment>
      <AttributeRenderer
        key="range.start"
        className={classNames(className, "range-begin")}
        itemId={id}
        attribute={attribute.start}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />

      <AttributeRenderer
        key="range.end"
        className={classNames(className, "range-end")}
        itemId={id}
        attribute={attribute.end}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </Fragment>
  );
};

AttributeRange.displayName = "BI.AttributeRange";

export default AttributeRange;
