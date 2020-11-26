// @flow
import styled from "styled-components";
import { themeProp, spacer } from "beinformed/theme/utils";

import { useLocation, useHistory } from "react-router";

import { useModularUI } from "beinformed/modularui/modularuiUtils";
import { Href } from "beinformed/models";
import classNames from "classnames";
import {
  ConceptIndexFilterResults,
  ConceptIndexFilters,
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

const ConceptIndex = ({ className }: Props) => {
  const location = useLocation();
  const history = useHistory();

  const searchUrl = new Href(`/concepts${location.search}`).toString();
  const modelEntry = useModularUI("conceptIndex", searchUrl);

  if (modelEntry && modelEntry.model) {
    const conceptIndex = modelEntry.model;

    let _timeoutID = null;
    const handleSearch = (value: string) => {
      clearTimeout(_timeoutID);
      _timeoutID = setTimeout(() => {
        const entryDate = conceptIndex.entryDate
          ? `&entryDate=${conceptIndex.entryDate}`
          : "";

        const searchAttribute = conceptIndex.searchtermfilter.attribute;

        history.push(
          `/modelcatalog/concepts?${searchAttribute.name}=${value}${entryDate}`
        );
      }, 500);
    };
    const handleChange = (date: string) => {
      history.push(`/modelcatalog/concepts?entryDate=${date}`);
    };

    return (
      <StyledWrapper className={classNames("concept-index", className)}>
        <ConceptIndexFilters
          conceptIndex={conceptIndex}
          onSearch={handleSearch}
          onDateChange={handleChange}
        />
        <ConceptIndexFilterResults conceptIndex={conceptIndex} />
      </StyledWrapper>
    );
  }

  return null;
};

ConceptIndex.displayName = "BI.ConceptIndex";

export default ConceptIndex;
