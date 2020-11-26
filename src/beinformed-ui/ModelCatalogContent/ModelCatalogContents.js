// @flow
import { ContentIndex } from "_component-registry/modelcatalog";

export type Props = {
  +className?: string,
};

const ModelCatalogContents = ({ className }: Props) => (
  <div className={className}>
    <ContentIndex />
  </div>
);

ModelCatalogContents.displayName = "BI.ModelCatalogContents";

export default ModelCatalogContents;
