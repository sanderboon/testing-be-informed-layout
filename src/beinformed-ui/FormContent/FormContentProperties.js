// @flow
import { isNil } from "lodash";

import classNames from "classnames";
import styled from "styled-components";

import { Row } from "_component-registry/grid";
import {
  FormContentPropertiesLabel,
  FormContentPropertiesValue,
} from "_component-registry/formcontent";

export type Props = {
  +properties: Array<propertyJSON>,
  +renderEmpty: boolean,
  +className: string,
};

const StyledContentPropertyRow = styled(Row)`
  margin: 0;
`;

const FormContentProperties = ({
  className,
  properties,
  renderEmpty,
}: Props) => {
  const contentProperties = renderEmpty
    ? properties
    : properties.filter(
        (property: propertyJSON) =>
          !isNil(property.value) && property.value !== ""
      );

  return (
    <div
      className={classNames("property-elements concept-properties", className)}
    >
      {contentProperties.map((property) => (
        <StyledContentPropertyRow key={`propery-${property._id}`}>
          <FormContentPropertiesLabel property={property} />
          <FormContentPropertiesValue property={property} />
        </StyledContentPropertyRow>
      ))}
    </div>
  );
};

FormContentProperties.displayName = "BI.FormContentProperties";

export default FormContentProperties;
