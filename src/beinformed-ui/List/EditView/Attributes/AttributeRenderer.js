// @flow
import { Fragment } from "react";

import {
  AttributeBoolean,
  AttributeChoice,
  AttributeDatetime,
  AttributeLookup,
  AttributeMemo,
  AttributeMoney,
  AttributeNumber,
  AttributePassword,
  AttributeString,
  AttributeUpload,
  AttributeRange,
  AttributeConstraints,
} from "_component-registry/inline-edit";

import type { AttributeType } from "beinformed/models";
export type Props = {
  +className?: string,
  +attribute: AttributeType,
  +itemId: string | number,
  +onBlur?: Function,
  +onChange: Function,
  +onFocus?: Function,
};

/**
 * Render correct widget
 */
const AttributeRenderer = ({
  className,
  attribute,
  itemId,
  onBlur,
  onChange,
  onFocus,
}: Props) => {
  const name = `${itemId}--${attribute.name}`;

  const attributeMap = {
    lookup: AttributeLookup,
    boolean: AttributeBoolean,
    choice: AttributeChoice,
    date: AttributeDatetime,
    time: AttributeDatetime,
    timestamp: AttributeDatetime,
    datetime: AttributeDatetime,
    memo: AttributeMemo,
    money: AttributeMoney,
    number: AttributeNumber,
    password: AttributePassword,
    upload: AttributeUpload,
    xml: AttributeMemo,
    range: AttributeRange,
    string: AttributeString,
  };

  const attributeType =
    attribute.type in attributeMap ? attribute.type : "string";

  const Attribute = attributeMap[attributeType];

  return (
    <Fragment>
      <Attribute
        key="attribute"
        className={className}
        // $FlowFixMe
        attribute={attribute}
        id={name}
        name={name}
        inError={attribute.hasServerErrors()}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <AttributeConstraints attribute={attribute} />
    </Fragment>
  );
};

AttributeRenderer.displayName = "BI.AttributeRenderer";

export default AttributeRenderer;
