// @flow
import {
  BaseAttribute,
  AttributeRenderer,
} from "_component-registry/attributes";

import type { CompositeAttributeModel } from "beinformed/models";
import type { Props } from "beinformed-ui/FormAttribute/BaseAttribute";

type CompositeAttributeProps = { +namePrefix?: string };

const CompositeAttribute = ({
  className,
  attribute,
  name,
  id,
  namePrefix,
  questionContentConfiguration,
  formLayout,
  onChange,
  onClick,
  onBlur,
  onFocus,
}: {
  ...Props<CompositeAttributeModel>,
  ...CompositeAttributeProps,
}) => {
  return (
    <BaseAttribute
      className={className}
      attribute={attribute}
      name={name}
      id={id}
      questionContentConfiguration={questionContentConfiguration}
      formLayout={formLayout}
      onChange={onChange}
      onClick={onClick}
      onBlur={onBlur}
      onFocus={onFocus}
      renderInput={() => (
        <div className={className}>
          {attribute.children.map((childAttribute) => {
            const childName = (namePrefix || "") + childAttribute.name;

            return (
              <AttributeRenderer
                key={childName}
                questionContentConfiguration={questionContentConfiguration}
                attribute={childAttribute}
                name={childName}
                id={childName}
                formLayout={formLayout}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
              />
            );
          })}
        </div>
      )}
    />
  );
};

CompositeAttribute.displayName = "BI.CompositeAttribute";

export default CompositeAttribute;
