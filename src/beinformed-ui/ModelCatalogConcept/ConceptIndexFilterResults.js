// @flow
import styled, { css } from "styled-components";
import { roundedCorners, spacer, themeProp } from "beinformed/theme/utils";

import { ConceptLink } from "_component-registry/concept";

import type { ConceptIndexModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +conceptIndex: ConceptIndexModel,
};

const StyledResults = styled.div`
  margin: ${({ isSearch }) =>
    isSearch
      ? css`
          ${spacer()} 57px ${spacer()} 0
        `
      : css`
          ${spacer()} 54px ${spacer()} 311px
        `};

  padding: ${spacer()};
  background: ${themeProp("WHITE")};
  ${roundedCorners()};
  border: ${themeProp("INPUT_BORDER_WIDTH", "1px")} solid
    ${themeProp("INPUT_BORDER_COLOR", "#ced4da")};
`;

const StyledList = styled.ul`
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
  max-height: 350px;
  overflow: auto;
`;

const StyledResultPlaceholder = styled.div`
  max-height: 350px;
`;

const ConceptIndexFilterResults = ({ className, conceptIndex }: Props) => {
  const isSearch = conceptIndex.searchtermfilter.attribute.inputvalue !== "";

  if (conceptIndex.items.hasItems) {
    return (
      <StyledResults className={className} isSearch={isSearch}>
        <StyledList className="catalog-index">
          {conceptIndex.items.map((concept) => (
            <li key={`${concept.key}-${concept.concepttypeHref.toString()}`}>
              <ConceptLink concept={concept} />
            </li>
          ))}
        </StyledList>
      </StyledResults>
    );
  }

  if (isSearch) {
    return (
      <StyledResults className={className} isSearch={isSearch}>
        <StyledList>
          <li>No results</li>
        </StyledList>
      </StyledResults>
    );
  }

  return (
    <StyledResultPlaceholder className={className}>
      &nbsp;
    </StyledResultPlaceholder>
  );
};

ConceptIndexFilterResults.displayName = "BI.ConceptIndexFilterResults";

export default ConceptIndexFilterResults;
