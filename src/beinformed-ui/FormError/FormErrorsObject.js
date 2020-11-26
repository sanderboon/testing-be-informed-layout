// @flow
import { Message } from "beinformed/i18n";

import classNames from "classnames";

import type { FormModel, FormObjectModel } from "beinformed/models";
export type Props = {
  className?: string,
  form: FormModel,
  formObject: FormObjectModel,
  onlyServerErrors: boolean,
  onClick: Function,
};

const FormErrorsObject = ({
  className,
  form,
  formObject,
  onlyServerErrors,
  onClick,
}: Props) => {
  const hasMandatoryError = formObject.errorCollection.hasMandatoryError();
  const errors = formObject.errorCollection.filter(
    (error) =>
      (!hasMandatoryError || error.isMandatoryConstraint) &&
      (!onlyServerErrors || !error.isClientConstraint)
  );

  return errors.map((error) => (
    <li
      key={error.id}
      className={classNames("form-errors-item form-errors-object", className)}
      data-type={error.id}
    >
      <a
        className="no-initial-focus"
        href={`#${form.key}-${formObject.key}`}
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        <Message
          id={error.id}
          defaultMessage={error.defaultMessage}
          data={error.parameters}
        />
      </a>
    </li>
  ));
};

export default FormErrorsObject;
