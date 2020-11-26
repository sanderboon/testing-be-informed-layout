// @flow
import { useCallback, useState, useEffect } from "react";

import { HTTP_METHODS, MODULARUI_STATUS } from "beinformed/constants/Constants";

import { CONFIRM } from "beinformed/constants/LayoutHints";

import { ConfirmDialog } from "_component-registry/confirm-dialog";
import {
  FormBody,
  FullPageForm,
  ModalForm,
  FormFinishedHandler,
} from "_component-registry/form";

import type { ModularUIStatus, FormLayoutType } from "beinformed/constants";
import type { LocationShape } from "react-router";
import type { FormModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +form?: FormModel,
  +formLayout?: FormLayoutType,
  +isModal?: boolean,
  +fetchModularUI: Function,
  +redirectTo?: LocationShape,
  +status: ModularUIStatus,
  +autosave?: boolean,
  +autosubmit?: boolean,
  +onPrevious: (form: FormModel) => void,
  +onCancel: (form: FormModel) => void,
  +showFormNotification: (form: FormModel) => void,
  +mergePreviouslyEnteredObjects?: boolean,
};

const Form = ({
  className,
  form,
  formLayout,
  isModal,
  fetchModularUI,
  redirectTo,
  status,
  autosave,
  autosubmit,
  onCancel,
  onPrevious,
  showFormNotification,
  mergePreviouslyEnteredObjects = true,
}: Props) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(0);

  const handleSubmit = useCallback(
    (submitForm: FormModel) => {
      if (!isSubmitting) {
        setIsSubmitting(true);
        setLastUpdate(submitForm.lastUpdate);

        submitForm.mergePreviouslyEnteredObjects = mergePreviouslyEnteredObjects;

        // the modularui hoc gives us fetchModularUI prop
        fetchModularUI(submitForm.selfhref, {
          propName: "form",
          method: HTTP_METHODS.POST,
          data: submitForm.formdata,
          updateModel: submitForm,
        });
      }
    },
    [isSubmitting, fetchModularUI, mergePreviouslyEnteredObjects]
  );

  const isFormWithoutQuestions =
    status === MODULARUI_STATUS.FINISHED &&
    form &&
    form.hasNoQuestionsConfigured &&
    (!form.layouthint.has(CONFIRM) || isConfirmed);

  useEffect(() => {
    if (form && isFormWithoutQuestions) {
      handleSubmit(form);
    }
  }, [form, isFormWithoutQuestions, handleSubmit]);

  const hasFinishedSubmitting =
    status === MODULARUI_STATUS.FINISHED &&
    form &&
    isSubmitting &&
    lastUpdate !== form.lastUpdate;

  if (form && hasFinishedSubmitting) {
    setIsSubmitting(false);
    setLastUpdate(form.lastUpdate);
  }

  if (!form) {
    return null;
  }

  if (form.isFinished) {
    return (
      <FormFinishedHandler
        form={form}
        redirectTo={redirectTo}
        showFormNotification={showFormNotification}
      />
    );
  }

  if (form.layouthint.has(CONFIRM) && !isConfirmed) {
    return (
      <ConfirmDialog
        form={form}
        onConfirm={() => setIsConfirmed(true)}
        onCancel={onCancel}
      />
    );
  }

  if (form.hasNoQuestionsConfigured) {
    return null;
  }

  const FormComponent = isModal ? ModalForm : FullPageForm;
  const layout = formLayout || (isModal ? "vertical" : "horizontal");

  return (
    <FormComponent
      className={className}
      form={form}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      onPrevious={onPrevious}
      isSubmitting={isSubmitting}
    >
      <FormBody
        form={form}
        formLayout={layout}
        autosave={autosave}
        autosubmit={autosubmit}
      />
    </FormComponent>
  );
};

Form.displayName = "BI.Form";

export default Form;
