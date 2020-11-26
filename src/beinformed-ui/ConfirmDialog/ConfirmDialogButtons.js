// @flow
import classNames from "classnames";
import styled from "styled-components";
import { spacer } from "beinformed/theme/utils";

import { Message } from "beinformed/i18n";

import { Button } from "_component-registry/buttons";

import type { FormModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +form: FormModel,
  +onCancel: Function,
};

const StyledButtons = styled.div`
  > * + * {
    margin-left: ${spacer(0.25)};
  }
`;

const ConfirmDialogButtons = ({ className, form, onCancel }: Props) => (
  <StyledButtons className={classNames("form-buttons", className)}>
    <Button
      className={classNames("btn-cancel", className)}
      buttonStyle="LINK"
      type="button"
      name="cancel"
      onClick={() => onCancel(form)}
    >
      <Message id="ConfirmDialogButtons.Cancel">Cancel</Message>
    </Button>

    <Button
      type="submit"
      name="submit"
      buttonStyle="PRIMARY"
      className={classNames("btn-confirm", className)}
    >
      <Message id="ConfirmDialogButtons.Confirm">Confirm</Message>
    </Button>
  </StyledButtons>
);

ConfirmDialogButtons.displayName = "BI.ConfirmDialogButtons";

export default ConfirmDialogButtons;
