// @flow
import { useState } from "react";

import classNames from "classnames";
import styled from "styled-components";
import { spacer } from "beinformed/theme/utils";

import {
  FormContent,
  FormContentPopover,
} from "_component-registry/formcontent";
import { FormAttributeAssistant } from "_component-registry/attributes-assistant";
import { FormLabel } from "_component-registry/formlabel";
import { Row, Column } from "_component-registry/grid";

import type { FormLayoutType } from "beinformed/constants";
import type {
  AttributeType,
  ContentConfigurationElements,
} from "beinformed/models";

type EventListener = (attribute: AttributeType, value: string) => void;

export type Props<T> = {
  +className?: string,
  +attribute: T,
  +questionContentConfiguration?: ?ContentConfigurationElements,
  +id?: string,
  +name: string,
  +formLayout?: FormLayoutType,
  +onBlur?: EventListener,
  +onClick?: EventListener,
  +onChange?: EventListener,
  +onFocus?: EventListener,
};

import type { Node } from "react";
type InjectedProps = { +renderInput: (props: InputProps) => Node };

type FormInputElements =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

export type InputProps = {
  value: string,
  inError: boolean,
  handleValueChange: (value: string) => void,
  handleBlur: (e?: SyntheticEvent<FormInputElements>) => void,
  handleClick: (e: SyntheticEvent<FormInputElements>) => void,
  handleChange: (e: SyntheticEvent<FormInputElements>) => void,
  handleFocus: (e: SyntheticEvent<FormInputElements>) => void,
};

const StyledGroup = styled.div`
  margin-bottom: ${spacer()};
`;

const BaseAttribute = <T: AttributeType>({
  className,
  attribute,
  renderInput,
  name,
  id,
  questionContentConfiguration,
  formLayout,
  onChange,
  onClick,
  onBlur,
  onFocus,
}: {
  ...Props<T>,
  ...InjectedProps,
}) => {
  const [hasFocus, setHasFocus] = useState(false);

  const handleEvent = (event?: EventListener, inputvalue: string) => {
    if (event) {
      return event(attribute, inputvalue);
    }

    return null;
  };

  const handleValueChange = (value: string) => {
    handleEvent(onChange, value);
  };
  const handleClick = (e: SyntheticEvent<FormInputElements>) => {
    handleEvent(onClick, e.currentTarget.value);
  };
  const handleChange = (e: SyntheticEvent<FormInputElements>) => {
    handleEvent(onChange, e.currentTarget.value);
  };
  const handleFocus = (e: SyntheticEvent<FormInputElements>) => {
    setHasFocus(true);
    handleEvent(onFocus, e.currentTarget.value);
  };
  const handleBlur = (e?: SyntheticEvent<FormInputElements>) => {
    setHasFocus(false);

    if (e && e.target) {
      handleEvent(onBlur, e.currentTarget.value);
    }
  };

  const showErrors =
    (!hasFocus ||
      attribute.type === "choice" ||
      attribute.type === "boolean") &&
    (attribute.inError() || attribute.hasServerErrors());

  const label = (
    <FormLabel
      htmlFor={id || name}
      attribute={attribute}
      contentConfiguration={questionContentConfiguration}
      formLayout={formLayout}
    >
      <FormContentPopover
        concept={attribute.concept}
        contentConfiguration={questionContentConfiguration}
      />
    </FormLabel>
  );

  const input = renderInput({
    value: attribute.readonly ? attribute.readonlyvalue : attribute.inputvalue,
    inError: showErrors,
    handleValueChange,
    handleBlur,
    handleClick,
    handleChange,
    handleFocus,
  });

  const assistent = (
    <FormAttributeAssistant showErrors={showErrors} attribute={attribute} />
  );

  const content = (
    <FormContent
      concept={attribute.concept}
      contentConfiguration={questionContentConfiguration}
    />
  );

  const groupClass = classNames(
    `form-group ${attribute.type}widget`,
    className
  );

  if (formLayout === "compact") {
    return (
      <StyledGroup className={groupClass} data-id={name}>
        <Row>
          {attribute.choicetype === "radiobutton" && label}
          <Column>{input}</Column>
        </Row>
        <Row>
          <Column>
            {assistent}
            {content}
          </Column>
        </Row>
      </StyledGroup>
    );
  }

  const isGroupedInput =
    attribute.choicetype === "radiobutton" ||
    attribute.choicetype === "checkbox";

  return (
    <StyledGroup as={Row} className={groupClass} data-id={name}>
      {label}
      {isGroupedInput && (
        <Column
          as={FormContent}
          size={12}
          concept={attribute.concept}
          contentConfiguration={questionContentConfiguration}
        />
      )}
      <Column>
        {input}
        {assistent}
        {!isGroupedInput && content}
      </Column>
    </StyledGroup>
  );
};

BaseAttribute.displayName = "BI.BaseAttribute";

export default BaseAttribute;
