// @flow
import { Redirect } from "react-router-dom";

import {
  FORM_FINISH_RETURN,
  FORM_FINISH_RETURN_RELOAD_LIST,
  NOTIFY,
} from "beinformed/constants/LayoutHints";

import { ReloadList } from "_component-registry/form";

import type { LocationShape } from "react-router";
import type { FormModel } from "beinformed/models";
export type Props = {
  +form: FormModel,
  +redirectTo?: LocationShape,
  +showFormNotification: (form: FormModel) => void,
};

const FormFinishedHandler = ({
  form,
  redirectTo,
  showFormNotification,
}: Props) => {
  if (form.layouthint.has(NOTIFY)) {
    showFormNotification(form);
  }

  if (form.layouthint.has(FORM_FINISH_RETURN_RELOAD_LIST)) {
    return <ReloadList href={form.selfhref} />;
  }

  if (form.layouthint.has(FORM_FINISH_RETURN)) {
    return null;
  }

  if (form.isFinished && redirectTo) {
    return (
      <Redirect
        to={{
          ...redirectTo,
          state: { reload: Date.now() },
        }}
      />
    );
  }

  if (form.redirectLocation) {
    if (form.redirectLocation.isExternal) {
      window.location = form.redirectLocation.absolutehref;
      return null;
    }

    return (
      <Redirect
        to={{
          ...form.redirectLocation.toLocation(),
          state: { reload: Date.now() },
        }}
      />
    );
  }

  return null;
};

FormFinishedHandler.displayName = "BI.FormFinishedHandler";

export default FormFinishedHandler;
