// @flow
import { Fragment } from "react";

import classNames from "classnames";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { spacer } from "beinformed/theme/utils";

import type { FormModel } from "beinformed/models";
import {
  FormErrorsForm,
  FormErrorsObject,
  FormErrorsAttributes,
} from "_component-registry/form";

export type Props = {
  +className?: string,
  +form: FormModel,
  +onlyServerErrors?: boolean,
  +renderAttributeErrors?: boolean,
};

const ERROR_HIGHLIGHT_TIMEOUT = 1000;

const errorHighlight = (FORM_ELEMENT_HIGHLIGHT) => keyframes`
  0% {
    background: ${FORM_ELEMENT_HIGHLIGHT || "#ffc107"};
  }

  100% {
    background: none;
  }
`;

const GlobalErrorHighlight = createGlobalStyle`
  .error-highlight {
    animation: ${({ theme }) =>
      errorHighlight(
        theme.FORM_ELEMENT_HIGHLIGHT
      )} ${ERROR_HIGHLIGHT_TIMEOUT}ms ease-in;
  }

  @media screen and (prefers-reduced-motion) {
    .error-highlight {
      animation: none;
    }
  }
`;

const StyledList = styled.ul`
  padding-left: ${spacer()};
  margin: 0;
`;

const FormErrors = ({
  className,
  form,
  onlyServerErrors = false,
  renderAttributeErrors = true,
}: Props) => {
  const formObject = form.currentFormObject;

  const handleClick = (selector?: string) => {
    const formName = form.key;
    const formObjectKey = formObject ? formObject.key : "";
    const scrollToSelector = selector
      ? `form[name="${formName}"] [data-id="${formObjectKey}"] ${selector}`
      : `form[name="${formName}"] [data-id="${formObjectKey}"]`;

    const scrollTo = document.querySelectorAll(scrollToSelector);

    if (scrollTo.length > 0) {
      scrollTo[0].scrollIntoView({
        behavior: "auto",
        block: "center",
        inline: "center",
      });
      scrollTo[0].classList.add("error-highlight");

      setTimeout(() => {
        scrollTo[0].classList.remove("error-highlight");
      }, ERROR_HIGHLIGHT_TIMEOUT + 250);
    }
  };

  return (
    <Fragment>
      <GlobalErrorHighlight />
      <StyledList className={classNames("form-errors", className)}>
        <FormErrorsForm form={form} />

        {formObject && (
          <FormErrorsObject
            form={form}
            formObject={formObject}
            onlyServerErrors={onlyServerErrors}
            onClick={handleClick}
          />
        )}

        {renderAttributeErrors && formObject && (
          <FormErrorsAttributes
            form={form}
            attributes={formObject.attributeCollection.visible}
            onlyServerErrors={onlyServerErrors}
            onClick={handleClick}
          />
        )}
      </StyledList>
    </Fragment>
  );
};
FormErrors.displayName = "BI.FormError";

export default FormErrors;
