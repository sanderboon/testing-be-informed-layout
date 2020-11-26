// @flow
import { Helmet } from "react-helmet-async";

import classNames from "classnames";
import styled from "styled-components";
import { themeProp, gutter, spacers, spacer } from "beinformed/theme/utils";

import { HTMLForm, FormTitle } from "_component-registry/form";
import { FormButtons } from "_component-registry/formbuttons";

import type { Node } from "react";
import type { FormModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +form: FormModel,
  +children?: Node,
  +onCancel: (form: FormModel) => void,
  +onPrevious: (form: FormModel) => void,
  +onSubmit: (form: FormModel) => void,
  +isSubmitting?: boolean,
};

const StyledForm = styled.div`
  margin: ${spacers(1, "auto")};
  width: 100%;
  padding-right: ${gutter()};
  padding-left: ${gutter()};
  max-width: ${themeProp("FULLPAGE_FORM_MAX_WIDTH")};
`;

const StyledButtons = styled(FormButtons)`
  margin-top: ${spacer(1.5)};
`;

const FullPageForm = ({
  className,
  form,
  children,
  onCancel,
  onPrevious,
  isSubmitting,
  onSubmit,
}: Props) => (
  <StyledForm className={classNames("fullpage-form", className)}>
    <FormTitle title={form.label} />

    <HTMLForm name={form.key} onSubmit={() => onSubmit(form)}>
      <Helmet>
        <title>{form.label}</title>
      </Helmet>

      {children}

      <StyledButtons
        form={form}
        onCancel={onCancel}
        onPreviousClick={onPrevious}
        isSubmitting={isSubmitting}
      />
    </HTMLForm>
  </StyledForm>
);

FullPageForm.displayName = "BI.FullPageForm";

export default FullPageForm;
