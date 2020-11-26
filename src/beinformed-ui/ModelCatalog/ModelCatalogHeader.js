// @flow
import classNames from "classnames";
import styled from "styled-components";
import { spacer } from "beinformed/theme/utils";

import { LinkModel, LinkCollection } from "beinformed/models";
import { useMessage } from "beinformed/i18n";

import { NavigationTabs } from "_component-registry/navigation";

import type { ModelCatalogModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +modelcatalog: ModelCatalogModel,
};

const StyledHeader = styled.div`
  margin-bottom: ${spacer(2.5)};
`;

const ModelCatalogHeader = ({ className, modelcatalog }: Props) => {
  const conceptIndexLink = LinkModel.create(
    "concept",
    `/modelcatalog${modelcatalog.conceptIndexLink.href.toString()}`,
    useMessage("ConceptIndex.Header", "Business design")
  );
  const contentIndexLink = LinkModel.create(
    "content",
    `/modelcatalog${modelcatalog.contentIndexLink.href.toString()}`,
    useMessage("ContentIndex.Header", "Sources")
  );

  const links = new LinkCollection();
  links.links = [conceptIndexLink, contentIndexLink];

  return (
    <StyledHeader className={classNames("modelcatalog-header", className)}>
      <NavigationTabs items={links} />
    </StyledHeader>
  );
};

ModelCatalogHeader.displayName = "BI.ModelCatalogHeader";

export default ModelCatalogHeader;
