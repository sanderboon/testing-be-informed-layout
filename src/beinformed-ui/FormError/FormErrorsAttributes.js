// @flow
import { Fragment } from "react";
import { FormErrorsAttribute } from "_component-registry/form";

import { CompositeAttributeModel } from "beinformed/models";

import type { Node } from "react";
import type { AttributeType, FormModel } from "beinformed/models";
export type Props = {
  className?: string,
  form: FormModel,
  parentSelector?: string,
  parentLabel?: string,
  attributes: Array<AttributeType>,
  onlyServerErrors: boolean,
  onClick: Function,
};

const FormErrorsAttributes = ({
  className,
  form,
  parentSelector,
  parentLabel,
  attributes,
  onlyServerErrors,
  onClick,
}: Props) => {
  const handleClick = (e, selector) => {
    e.preventDefault();
    onClick(selector);
  };

  const attributesInError = attributes.filter((attribute) =>
    onlyServerErrors ? attribute.hasServerErrors() : attribute.hasErrors()
  );

  return attributesInError.map<Node>((attribute) => {
    const selector = parentSelector
      ? `${parentSelector} [data-id="${attribute.key}"]`
      : `[data-id="${attribute.key}"]`;

    const label = parentLabel
      ? `${parentLabel} - ${attribute.label}`
      : attribute.label;

    const hasMandatoryError = attribute.errorCollection.hasMandatoryError();

    return (
      <Fragment key={attribute.key}>
        {attribute.errorCollection
          .filter(
            (error) =>
              (!hasMandatoryError || error.isMandatoryConstraint) &&
              (!onlyServerErrors || !error.isClientConstraint)
          )
          .map((error) => {
            return (
              <FormErrorsAttribute
                key={`${attribute.key}-${error.id}`}
                className={className}
                anchor={`${form.key}-${attribute.key}`}
                label={label}
                error={error}
                onClick={(e) => handleClick(e, selector)}
              />
            );
          })}
        {attribute instanceof CompositeAttributeModel && (
          <FormErrorsAttributes
            className={className}
            form={form}
            parentSelector={selector}
            parentLabel={label}
            attributes={attribute.children.all}
            onlyServerErrors={onlyServerErrors}
            onClick={onClick}
          />
        )}
      </Fragment>
    );
  });
};

FormErrorsAttributes.displayName = "BI.FormErrorsAttributes";

export default FormErrorsAttributes;
