// @flow
import styled from "styled-components";
import { themeProp, spacer } from "beinformed/theme/utils";

import { Href } from "beinformed/models";

import { CharIndex } from "_component-registry/modelcatalog";

import type { ContentIndexModel } from "beinformed/models";
export type Props = {
  +contentIndex: ContentIndexModel,
};

const StyledFilters = styled.div`
  display: flex;
`;

const StyledFilterColumn = styled.div`
  &:not(:last-child) {
    margin-right: ${spacer()};
  }

  align-self: flex-end;

  a {
    border-color: ${themeProp("PANEL_BORDER_COLOR")};
    color: ${themeProp("PRIMARY_LINK_COLOR")};

    &:focus,
    &:hover,
    &[aria-current="true"] {
      background-color: ${themeProp("PRIMARY_COLOR")};
      color: ${themeProp("WHITE")};
    }
  }

  button:disabled {
    background-color: #f5f5f5;
    border-color: ${themeProp("PANEL_BORDER_COLOR")};
    color: ${themeProp("GREY_300")};
    opacity: 1;
  }
`;

const ContentIndexFilters = ({ contentIndex }: Props) => {
  const indexAttribute = contentIndex.indexfilter.attribute;
  const indexHref = new Href(`/modelcatalog/content`);

  return (
    <StyledFilters>
      {indexAttribute && (
        <StyledFilterColumn>
          <CharIndex
            active={indexAttribute.selected}
            enabled={indexAttribute.options.map((option) => option.code)}
            href={indexHref}
          />
        </StyledFilterColumn>
      )}
    </StyledFilters>
  );
};

ContentIndexFilters.displayName = "BI.ContentIndexFilters";

export default ContentIndexFilters;
