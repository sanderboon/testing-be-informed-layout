// @flow
import classNames from "classnames";

import { FormattedText } from "_component-registry/text";
import { Heading } from "_component-registry/elements";

type textFragmentType = {
  type: string,
  label: string,
  text: string,
};

export type Props = {
  +textfragments: Array<textFragmentType>,
  +className: string,
  +renderLabel: boolean,
};

/**
 * Concept text fragments
 */
const FormContentTextFragments = ({
  textfragments,
  className,
  renderLabel,
}: Props) =>
  textfragments.length > 0 ? (
    <div
      className={classNames(
        "textfragment-elements concept-textfragments",
        className
      )}
    >
      {textfragments.map((textfragment) => (
        <div key={textfragment.type}>
          {renderLabel && (
            <Heading as="h4" className="label">
              {textfragment.label}
            </Heading>
          )}
          {textfragment.text
            ? textfragment.text.split("\n").map((textLine, i) => (
                <span key={textLine}>
                  {i > 0 && <br />}
                  <FormattedText text={textLine} />
                </span>
              ))
            : "-"}
        </div>
      ))}
    </div>
  ) : null;

FormContentTextFragments.displayName = "BI.FormContentTextFragments";

export default FormContentTextFragments;
