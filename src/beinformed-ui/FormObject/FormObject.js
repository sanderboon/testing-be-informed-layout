// @flow
import classNames from "classnames";
import styled from "styled-components";

import { getSetting } from "beinformed/constants/Settings";

import { FormAttributeSet } from "_component-registry/attributeset";
import { FormattedText } from "_component-registry/text";
import { IconPopover } from "_component-registry/popover";
import { InstrumentResult } from "_component-registry/results";
import { FormObjectQuestionLabel } from "_component-registry/form";

import type { FormLayoutType } from "beinformed/constants";
import type { FormModel, FormObjectModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +id: string,
  +form: FormModel,
  +object: FormObjectModel,
  +formLayout?: FormLayoutType,
  +autosave?: boolean,
  +autosubmit?: boolean,
};

const StyledPopover = styled(IconPopover)`
  position: absolute;
  top: 1em;
  right: 1em;
`;

/**
 * Render form object
 */
const FormObject = ({
  className,
  form,
  object,
  id,
  formLayout,
  autosave,
  autosubmit,
}: Props) => {
  const hasIntermediateResult =
    object.attributeCollection.results.length > 0 &&
    object.contentConfiguration.intermediateResults !== null;

  const RENDER_QUESTION_LABELS = getSetting("RENDER_QUESTION_LABELS");

  return (
    <div className={classNames("form-object", className)} data-id={object.key}>
      {RENDER_QUESTION_LABELS && <FormObjectQuestionLabel object={object} />}

      {object.assistent && (
        <StyledPopover className="form-object-popover">
          {object.assistent}
        </StyledPopover>
      )}

      {object.introText && (
        <FormattedText className="introtext" text={object.introText} />
      )}

      {hasIntermediateResult && (
        <InstrumentResult
          id={id}
          attributes={object.attributeCollection.results}
          contentConfiguration={object.contentConfiguration.intermediateResults}
        />
      )}

      <FormAttributeSet
        form={form}
        object={object}
        id={id}
        formLayout={formLayout}
        autosave={autosave}
        autosubmit={autosubmit}
      />
    </div>
  );
};

FormObject.displayName = "BI.FormObject";

export default FormObject;
