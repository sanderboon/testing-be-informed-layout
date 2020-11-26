// @flow
import { DatetimeInput } from "_component-registry/input";

import type { DatetimeAttributeModel } from "beinformed/models";
export type Props = {
  +attribute: DatetimeAttributeModel,
  +className?: string,
  +id: string,
  +name: string,
  +inError: boolean,
  +onBlur: Function,
  +onChange: Function,
  +onFocus: Function,
};

/**
 * Render date, time or datetime widget
 */
const AttributeDatetime = ({
  className,
  attribute,
  name,
  id,
  inError,
  onBlur,
  onChange,
  onFocus,
}: Props) => {
  const placeholder =
    attribute.placeholder === ""
      ? attribute.formatLabel
      : attribute.placeholder;

  return (
    <DatetimeInput
      className={className}
      name={name}
      id={id}
      value={attribute.inputvalue}
      readOnly={attribute.readonly}
      placeholder={placeholder}
      inError={inError}
      mindate={attribute.mindate}
      maxdate={attribute.maxdate}
      dateInputValue={attribute.dateInputValue}
      timeInputValue={attribute.timeInputValue}
      timeInputFormat={attribute.timeInputFormat}
      dateInputFormat={attribute.dateInputFormat}
      format={attribute.inputFormat}
      ariaLabel={attribute.label}
      onBlur={onBlur}
      onChange={(e) => onChange(attribute, e.currentTarget.value)}
      onValueChange={(value) => onChange(attribute, value)}
      onFocus={onFocus}
    />
  );
};

AttributeDatetime.displayName = "BI.AttributeDatetime";

export default AttributeDatetime;
