// @flow
import { InstrumentResult } from "_component-registry/results";

import { getResults } from "./getResults";

import type { AttributeType, ContentConfiguration } from "beinformed/models";
export type Props = {
  className?: string,
  id: string,
  attributes: Array<AttributeType>,
  contentConfiguration: ContentConfiguration,
  configuredElementsOnly?: boolean,
};

/**
 * Render form results of a form
 */
const EndResult = ({
  className,
  id,
  attributes,
  contentConfiguration,
  configuredElementsOnly = true,
}: Props): Array<any> => {
  const results = getResults(
    attributes,
    contentConfiguration,
    configuredElementsOnly
  );

  return results.map((result) => (
    <InstrumentResult
      className={className}
      key={id}
      id={id}
      attributes={result.attributes}
      contentConfiguration={result.config}
    />
  ));
};

EndResult.displayName = "BI.EndResult";

export default EndResult;
