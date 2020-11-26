// @flow
import { EndResult } from "_component-registry/results";

import type { FormObjectModel } from "beinformed/models";
export type Props = {
  +results: Array<FormObjectModel>,
  +id: string,
};

/**
 * Render form results of a form
 */
const FormResults = ({ results, id }: Props) => (
  <div>
    {results.map((formResult) => (
      <EndResult
        key={formResult.key}
        id={id}
        attributes={formResult.attributeCollection.all}
        contentConfiguration={formResult.contentConfiguration}
      />
    ))}
  </div>
);

FormResults.displayName = "BI.FormResults";

export default FormResults;
