// @flow
import React from "react";
 
import { BaseAttribute } from "_component-registry/attributes";
 
import BirthdayInput from "./BirthdayInput";
 
import type { DatetimeAttributeModel } from "beinformed/models";
import type {
  Props,
  InputProps
} from "beinformed-ui/FormAttribute/BaseAttribute";
 
const BirthdayAttribute = (props: Props<DatetimeAttributeModel>) => (
  <BaseAttribute
    {...props}
    renderInput={({ handleValueChange }: InputProps) => (
      <BirthdayInput name={props.name} onValueChange={handleValueChange} />
    )}
  />
);
 
BirthdayAttribute.displayName = "BI.BirthdayAttribute";
 
export default BirthdayAttribute;