// @flow
import { AttributeRenderer } from "_component-registry/attributes";
import { FormAttributeSetRepeatable } from "_component-registry/attributeset";

import type { Node } from "react";
import type { UpdateFormOptions, FormLayoutType } from "beinformed/constants";
import type {
  AttributeType,
  FormModel,
  FormObjectModel,
} from "beinformed/models";
type EventListener = (
  attribute: AttributeType,
  value: string,
  options?: UpdateFormOptions
) => void;

export type Props = {
  +className?: string,
  +id: string,
  +form: FormModel,
  +object: FormObjectModel,
  +formLayout?: FormLayoutType,
  +onAttributeClick?: EventListener,
  +onAttributeChange?: EventListener,
  +onAttributeBlur?: EventListener,
  +onAttributeFocus?: EventListener,
  +onAddAttributeSetClick?: () => void,
  +onCancelAttributeSetClick?: () => void,
  +onRemoveAttributeSetClick?: () => void,
};

const FormAttributeSet = ({
  className,
  id,
  form,
  object,
  formLayout,
  onAttributeClick,
  onAttributeChange,
  onAttributeBlur,
  onAttributeFocus,
  onAddAttributeSetClick,
  onCancelAttributeSetClick,
  onRemoveAttributeSetClick,
}: Props) => {
  const { contentConfiguration } = object;

  const questionContentConfig = contentConfiguration.questions
    ? contentConfiguration.questions.question
    : null;

  const optionContentConfig = contentConfiguration.questions
    ? contentConfiguration.questions.options
    : null;

  const handleEvent = (
    event?: EventListener,
    attr: AttributeType,
    inputvalue: string
  ) => {
    if (event) {
      return event(attr, inputvalue);
    }

    return void 0;
  };

  const attributes = object.attributeCollection.questions.map<Node>(
    (attribute) => (
      <AttributeRenderer
        key={`${id}-${attribute.name}`}
        id={`${id}-${attribute.name}`}
        name={attribute.name}
        attribute={attribute}
        formLayout={formLayout}
        questionContentConfiguration={questionContentConfig}
        optionContentConfiguration={optionContentConfig}
        onClick={(attr: AttributeType, inputvalue: string) =>
          handleEvent(onAttributeClick, attr, inputvalue)
        }
        onBlur={(attr: AttributeType, inputvalue: string) =>
          handleEvent(onAttributeBlur, attr, inputvalue)
        }
        onChange={(attr: AttributeType, inputvalue: string) =>
          handleEvent(onAttributeChange, attr, inputvalue)
        }
        onFocus={(attr: AttributeType, inputvalue: string) =>
          handleEvent(onAttributeFocus, attr, inputvalue)
        }
      />
    )
  );

  if (object.isRepeatable && object.maxRepeats === -1) {
    return (
      <FormAttributeSetRepeatable
        className={className}
        form={form}
        object={object}
        onSave={onAddAttributeSetClick}
        onCancel={onCancelAttributeSetClick}
        onRemove={onRemoveAttributeSetClick}
      >
        {attributes}
      </FormAttributeSetRepeatable>
    );
  }

  return attributes;
};

FormAttributeSet.displayName = "BI.FormAttributeSet";

export default FormAttributeSet;
