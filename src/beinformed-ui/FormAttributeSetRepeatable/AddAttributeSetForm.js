// @flow
import { forwardRef } from "react";

import styled from "styled-components";
import { spacer } from "beinformed/theme/utils";

import { Message } from "beinformed/i18n";

import { Heading } from "_component-registry/elements";
import { ButtonErrorPopover } from "_component-registry/button-error-popover";
import { Button } from "_component-registry/buttons";

import type { Node } from "react";
import type { FormModel, FormObjectModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +form: FormModel,
  +object: FormObjectModel,
  +children?: Node,
  +onSave: () => void,
  +onCancel: () => void,
};

const StyledFormControls = styled.div`
  & > * {
    margin-right: ${spacer(0.5)};
  }
`;

const AddAttributeSetForm = forwardRef<Props, HTMLDivElement>(
  ({ className, children, form, object, onSave, onCancel }: Props, ref) => (
    <div ref={ref} className={className}>
      <Heading as="h3">
        <Message id="FormAttributeSetRepeatable.Create.Header">Create</Message>
      </Heading>

      {children}

      <StyledFormControls className="form-controls">
        {object.hasErrors() ? (
          <ButtonErrorPopover
            type="button"
            name="save"
            buttonStyle="PRIMARY"
            form={form}
          >
            <Message id="Form.Button.Create" defaultMessage="Create" />
          </ButtonErrorPopover>
        ) : (
          <Button
            type="button"
            name="save"
            buttonStyle="PRIMARY"
            onClick={onSave}
          >
            <Message id="Form.Button.Create" defaultMessage="Create" />
          </Button>
        )}
        <Button
          type="button"
          name="cancel"
          buttonStyle="LINK"
          onClick={onCancel}
        >
          <Message id="Form.Button.Cancel" defaultMessage="Cancel" />
        </Button>
      </StyledFormControls>
    </div>
  )
);
AddAttributeSetForm.displayName = "BI.AddAttributeSetForm";

export default AddAttributeSetForm;
