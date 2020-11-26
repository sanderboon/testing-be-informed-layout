// @flow
import { useState } from "react";

import styled from "styled-components";
import { themeProp, spacer } from "beinformed/theme/utils";

import { Message } from "beinformed/i18n";
import { Href } from "beinformed/models";

import { CharIndex, EntryDatePicker } from "_component-registry/modelcatalog";
import { TextInput } from "_component-registry/input";

import type { ConceptIndexModel } from "beinformed/models";
export type Props = {
  +conceptIndex: ConceptIndexModel,
  +onSearch: Function,
  +onDateChange: Function,
};

const StyledFilters = styled.div`
  display: flex;
`;

const StyledFilterColumn = styled.div`
  &:not(:last-child) {
    margin-right: ${spacer(2)};
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

const StyledLabel = styled.label`
  margin-bottom: 2px;
`;
const StyledTextInput = styled(TextInput)`
  width: 285px;
`;

const ConceptIndexFilters = ({
  conceptIndex,
  onSearch,
  onDateChange,
}: Props) => {
  const searchAttribute = conceptIndex.searchtermfilter.attribute;
  const [searchTerm, setSearchTerm] = useState(searchAttribute.inputvalue);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);

    onSearch(e.target.value);
  };

  const indexAttribute = conceptIndex.indexfilter.attribute;

  const entryDate = conceptIndex.entryDate
    ? `?entryDate=${conceptIndex.entryDate}`
    : "";
  const indexHref = new Href(`/modelcatalog/concepts${entryDate}`);

  return (
    <StyledFilters>
      {searchAttribute && (
        <StyledFilterColumn>
          <StyledLabel>
            <Message id="ModelCatalogSearch.Placeholder">
              Search by label
            </Message>
          </StyledLabel>
          <StyledTextInput
            name="searchTerm"
            value={searchTerm}
            onChange={handleChange}
          />
        </StyledFilterColumn>
      )}
      {indexAttribute && (
        <StyledFilterColumn>
          <CharIndex
            active={indexAttribute.selected}
            enabled={indexAttribute.options.map((option) => option.code)}
            href={indexHref}
          />
        </StyledFilterColumn>
      )}
      <StyledFilterColumn>
        <EntryDatePicker
          entryDate={conceptIndex.entryDate}
          onChange={onDateChange}
        />
      </StyledFilterColumn>
    </StyledFilters>
  );
};

ConceptIndexFilters.displayName = "BI.ConceptIndexFilters";

export default ConceptIndexFilters;
