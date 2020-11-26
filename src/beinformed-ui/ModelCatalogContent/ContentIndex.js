// @flow
import styled from "styled-components";
import { themeProp, spacer } from "beinformed/theme/utils";

import { useLocation } from "react-router";

import { useModularUI } from "beinformed/modularui/modularuiUtils";
import { Href } from "beinformed/models";
import classNames from "classnames";
import {
  ContentIndexFilterResults,
  ContentIndexFilters,
} from "_component-registry/modelcatalog";

export type Props = {
  +className?: string,
};

const StyledWrapper = styled.div`
  margin-top: ${spacer()};
  padding-top: ${spacer()};
  border-top: ${themeProp("BORDER_WIDTH", "1px")} solid
    ${themeProp("BORDER_COLOR", "#ced4da")};
`;

const ContentIndex = ({ className }: Props) => {
  const location = useLocation();

  const searchUrl = new Href(`/content${location.search}`).toString();
  const modelEntry = useModularUI("contentIndex", searchUrl);

  if (modelEntry && modelEntry.model) {
    const contentIndex = modelEntry.model;

    return (
      <StyledWrapper className={classNames("content-index", className)}>
        <ContentIndexFilters contentIndex={contentIndex} />
        <ContentIndexFilterResults contentIndex={contentIndex} />
      </StyledWrapper>
    );
  }

  return null;
};

ContentIndex.displayName = "BI.ContentIndex";

export default ContentIndex;
