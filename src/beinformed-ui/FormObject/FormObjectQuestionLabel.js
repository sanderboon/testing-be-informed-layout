// @flow
import classNames from "classnames";

import { Heading } from "_component-registry/elements";

import { HIDE_LABEL } from "beinformed/constants/LayoutHints";

import type { FormObjectModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +object: FormObjectModel,
};
const FormObjectQuestionLabel = ({ className, object }: Props) => {
  const label = object.repeatIndexLabel
    ? `${object.label} (${object.repeatIndexLabel})`
    : object.label;

  if (!object.layouthint.has(HIDE_LABEL) && object.label) {
    return (
      <Heading as="h3" className={classNames(className, "question-label")}>
        {label}
      </Heading>
    );
  }

  return null;
};
FormObjectQuestionLabel.displayName = "BI.FormObjectQuestionLabel";

export default FormObjectQuestionLabel;
