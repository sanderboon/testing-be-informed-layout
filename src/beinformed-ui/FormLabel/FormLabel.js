// @flow
import { get } from "lodash";

import classNames from "classnames";
import styled, { css } from "styled-components";
import { spacer, themeProp } from "beinformed/theme/utils";

import { HIDE_LABEL } from "beinformed/constants/LayoutHints";

import { Column } from "_component-registry/grid";
import {
  MandatoryIndication,
  OptionalIndication,
} from "_component-registry/formlabel";

import {
  shouldRenderOptionalIndication,
  shouldRenderMandatoryIndication,
  getColSize,
  getHtmlElement,
} from "./_util";

import type { Node } from "react";
import type { FormLayoutType } from "beinformed/constants";
import type {
  AttributeType,
  ContentConfigurationElements,
} from "beinformed/models";
export type Props = {
  +className?: string,
  +htmlFor?: string,
  +id?: string,
  +defaultLabel?: string,
  +contentConfiguration?: ContentConfigurationElements | null,
  +attribute: AttributeType,
  +formLayout?: FormLayoutType,
  +children?: Node,
  +isMandatory?: boolean,
  +size?: number,
};

const StyledLabel = styled(Column)`
  font-weight: ${themeProp("FONT_WEIGHT_LABEL")};
  display: inline-block;
  ${({ size }) =>
    size !== "auto" &&
    css`
      margin-bottom: ${spacer(0.5)};
    `};
`;

const FormLabel = ({
  className,
  htmlFor,
  id,
  defaultLabel,
  contentConfiguration,
  attribute,
  formLayout,
  children,
  isMandatory,
  size = 3,
}: Props) => {
  if (attribute.layouthint.has(HIDE_LABEL)) {
    return null;
  }

  const elementId = id || (htmlFor ? `${htmlFor}-label` : null);
  const colSize = getColSize(formLayout, size);

  const label =
    defaultLabel || attribute.getContentConfiguredLabel(contentConfiguration);

  const renderOptionalIndication = shouldRenderOptionalIndication(
    attribute,
    isMandatory
  );
  const renderMandatoryIndication = shouldRenderMandatoryIndication(
    attribute,
    isMandatory
  );

  const htmlElement = getHtmlElement(formLayout, get(attribute, "choicetype"));

  return (
    <StyledLabel
      as={htmlElement}
      className={classNames("form-label", className)}
      htmlFor={htmlElement === "label" ? htmlFor : null}
      size={colSize}
      id={elementId}
    >
      {renderOptionalIndication || renderMandatoryIndication ? (
        <>
          <span className="label-text">{label}</span>
          {renderOptionalIndication && <OptionalIndication />}
          {renderMandatoryIndication && <MandatoryIndication />}
        </>
      ) : (
        label
      )}
      {children}
    </StyledLabel>
  );
};

FormLabel.displayName = "BI.FormLabel";

export default FormLabel;
