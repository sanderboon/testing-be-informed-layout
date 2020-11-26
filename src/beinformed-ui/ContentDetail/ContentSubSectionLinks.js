// @flow
import classNames from "classnames";

import { ContentSubSectionLink } from "_component-registry/content";

import type { SourceReferenceModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +sourceReferences: Array<SourceReferenceModel>,
};

const ContentSubSectionLinks = ({ className, sourceReferences }: Props) => (
  <ul className={classNames(className, "source-reference-links")}>
    {sourceReferences.map((sourceReference) => (
      <li
        key={`${sourceReference.type}--${sourceReference.referenceHash}`}
        className="source-reference-link"
      >
        <ContentSubSectionLink sourceReference={sourceReference} />
      </li>
    ))}
  </ul>
);

ContentSubSectionLinks.displayName = "BI.ContentSubSectionLinks";

export default ContentSubSectionLinks;
