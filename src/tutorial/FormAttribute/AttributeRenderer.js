// @flow
import React from "react";
 
import DefaultAttributeRenderer from "beinformed-ui/FormAttribute/AttributeRenderer";
 
import BirthdayAttribute from "../BirthdayAttribute/BirthdayAttribute";
 
import type { Props } from "beinformed-ui/FormAttribute/AttributeRenderer";
 
const AttributeRenderer = (props: Props) => {
  if (props.attribute) {
    if (props.attribute.layouthint.has("date-birthday")) {
      return <BirthdayAttribute {...props} />;
    }
 
    return <DefaultAttributeRenderer {...props} />;
  }
 
  return null;
};
 
AttributeRenderer.displayName = "Tutorial.AttributeRenderer";
 
export default AttributeRenderer;