// @flow
import styled from "styled-components";

import { Message } from "beinformed/i18n";

import {
  ConnectedModal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "_component-registry/modal";
import { Helmet } from "react-helmet-async";
import { FormTitle, HTMLForm } from "_component-registry/form";
import { ConfirmDialogButtons } from "_component-registry/confirm-dialog";

import type { FormModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +form: FormModel,
  +onCancel: (form: FormModel) => void,
  +onConfirm: (form: FormModel) => void,
};

const StyledConnectedModal = styled(ConnectedModal)`
  margin-top: 9%;
`;

const ConfirmDialog = ({ className, form, onCancel, onConfirm }: Props) => (
  <StyledConnectedModal size="small" className={className}>
    <Helmet>
      <title>{form.label}</title>
    </Helmet>

    <ModalHeader showClose onClose={() => onCancel(form)}>
      <FormTitle title={form.label} isModal />
    </ModalHeader>
    <HTMLForm name={form.key} onSubmit={onConfirm}>
      <ModalBody>
        <Message id="ConfirmDialog.ConfirmQuestion">Are you sure?</Message>
      </ModalBody>
      <ModalFooter>
        <ConfirmDialogButtons onCancel={() => onCancel(form)} form={form} />
      </ModalFooter>
    </HTMLForm>
  </StyledConnectedModal>
);

ConfirmDialog.displayName = "BI.ConfirmDialog";

export default ConfirmDialog;
