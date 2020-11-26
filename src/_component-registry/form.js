// @flow

/* HTML Form element */
export { default as HTMLForm } from "beinformed-ui/HTMLForm/HTMLForm";

/* Form */
import { default as _Form } from "beinformed-ui/Form/Form";
export { default as FullPageForm } from "beinformed-ui/Form/FullPageForm";
export { default as ModalForm } from "beinformed-ui/Form/ModalForm";
export { default as FormBody } from "beinformed-ui/Form/FormBody";
export { default as FormFinishedHandler } from "beinformed-ui/Form/FormFinishedHandler";

/* FormObject */
export { default as FormObject } from "beinformed-ui/FormObject/FormObject";
export { default as FormObjectQuestionLabel } from "beinformed-ui/FormObject/FormObjectQuestionLabel";

/* Form results */
export { default as FormResults } from "beinformed-ui/FormResults/FormResults";

/* Title */
export { default as FormTitle } from "beinformed-ui/Form/FormTitle";

/* Form Errors */
export { default as FormErrors } from "beinformed-ui/FormError/FormErrors";
export { default as FormErrorsForm } from "beinformed-ui/FormError/FormErrorsForm";
export { default as FormErrorsObject } from "beinformed-ui/FormError/FormErrorsObject";
export { default as FormErrorsAttributes } from "beinformed-ui/FormError/FormErrorsAttributes";
export { default as FormErrorsAttribute } from "beinformed-ui/FormError/FormErrorsAttribute";

export { default as FormErrorList } from "beinformed-ui/FormError/FormErrorList";
export { default as FormErrorMessages } from "beinformed-ui/FormError/FormErrorMessages";

/* Reload */
export { default as ReloadList } from "beinformed-ui/ReloadList/ReloadList";

/* Connectors */
import { connector as connectForm } from "beinformed/connectors/Form";
export const ConnectedForm = connectForm(_Form);
