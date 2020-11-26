// @flow
import classNames from "classnames";

import { Message } from "beinformed/i18n";

import type { FormModel } from "beinformed/models";
export type Props = {
  className?: string,
  form: FormModel,
};

const FormErrorsForm = ({ className, form }: Props) =>
  form.errorCollection.map((error) => (
    <li
      key={error.id}
      className={classNames("form-errors-item", className)}
      data-type={error.id}
    >
      <Message
        id={error.id}
        defaultMessage={error.defaultMessage}
        data={error.parameters}
      />
    </li>
  ));

export default FormErrorsForm;
