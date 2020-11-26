// @flow
import { Helmet } from "react-helmet-async";

import { HTMLForm, FormTitle } from "_component-registry/form";
import { FormButtons } from "_component-registry/formbuttons";

import {
  ConnectedModal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "_component-registry/modal";

import type { Node } from "react";
import type { FormModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +form: FormModel,
  +children?: Node,
  +size?: "small" | "medium" | "large" | "xl" | "max",
  +onCancel: (form: FormModel) => void,
  +onPrevious: (form: FormModel) => void,
  +onSubmit: (form: FormModel) => void,
  +isSubmitting?: boolean,
};

const ModalForm = ({
  className,
  form,
  children,
  size = "large",
  isSubmitting,
  onCancel,
  onPrevious,
  onSubmit,
}: Props) => (
  <ConnectedModal className={className} size={size}>
    <Helmet>
      <title>{form.label}</title>
    </Helmet>

    <ModalHeader showClose onClose={() => onCancel(form)}>
      <FormTitle title={form.label} isModal />
    </ModalHeader>
    <HTMLForm name={form.key} onSubmit={() => onSubmit(form)}>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <FormButtons
          form={form}
          onCancel={() => onCancel(form)}
          onPreviousClick={() => onPrevious(form)}
          isSubmitting={isSubmitting}
        />
      </ModalFooter>
    </HTMLForm>
  </ConnectedModal>
);

ModalForm.displayName = "BI.ModalForm";

export default ModalForm;
