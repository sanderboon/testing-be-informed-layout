// @flow
import { isFunction } from "lodash";

import classNames from "classnames";
import styled from "styled-components";
import {
  themeProp,
  roundedCorners,
  spacers,
  spacer,
} from "beinformed/theme/utils";

import { FormErrors } from "_component-registry/form";

import type { FormModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +form: FormModel,
  +onlyServerErrors?: boolean,
  +renderAttributeErrors?: boolean,
  +onDismiss?: Function,
};

const StyledWrapper = styled.div`
  position: relative;
  padding: ${spacers(0.75, 4, 1.25, 0.75)};
  margin-bottom: ${spacer()};
  ${roundedCorners()};
  color: ${themeProp("ALERT_COLOR", "#721c24")};
  background-color: ${themeProp("ALERT_BG", "#f8d7da")};
  border-color: ${themeProp("ALERT_BORDER_COLOR", "#f5c6cb")};
`;

const StyledCloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: ${spacers(0.75, 1.25)};
  color: inherit;
`;

/**
 * Render Form errors
 */
const FormErrorMessages = ({
  className,
  form,
  onlyServerErrors = false,
  renderAttributeErrors = true,
  onDismiss,
}: Props) => {
  if (onlyServerErrors && !form.hasServerErrors()) {
    return null;
  }

  if (
    !renderAttributeErrors &&
    form.errorCollection.isEmpty &&
    (!form.currentFormObject || form.currentFormObject.errorCollection.isEmpty)
  ) {
    return null;
  }

  return (
    <StyledWrapper
      className={classNames("form-errormessages", className)}
      role="alert"
    >
      {isFunction(onDismiss) && (
        <StyledCloseButton
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
          onClick={onDismiss}
        >
          <span aria-hidden="true">&times;</span>
        </StyledCloseButton>
      )}

      <FormErrors
        form={form}
        onlyServerErrors={onlyServerErrors}
        renderAttributeErrors={renderAttributeErrors}
      />
    </StyledWrapper>
  );
};

FormErrorMessages.displayName = "BI.FormErrorMessages";

export default FormErrorMessages;
