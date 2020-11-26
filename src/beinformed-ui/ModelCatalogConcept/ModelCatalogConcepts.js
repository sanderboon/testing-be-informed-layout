// @flow
import { ModelOverview, ConceptIndex } from "_component-registry/modelcatalog";

export type Props = {
  +className?: string,
};

const ModelCatalogConcepts = ({ className }: Props) => (
  <div className={className}>
    <ModelOverview />

    <ConceptIndex />
  </div>
);

ModelCatalogConcepts.displayName = "BI.ModelCatalogConcepts";

export default ModelCatalogConcepts;
