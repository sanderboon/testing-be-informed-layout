// @flow
import classNames from "classnames";
import styled from "styled-components";
import { spacers } from "beinformed/theme/utils";

import { Message } from "beinformed/i18n";

import { LookupOptionsFoundOption } from "_component-registry/lookup";

import type {
  LookupOptionCollection,
  ContentConfigurationElements,
  ChoiceAttributeOptionModel,
} from "beinformed/models";
export type Props = {
  +className?: string,
  +hasResults: boolean,
  +foundOptions: LookupOptionCollection | null,
  +inProgress: boolean,
  +filterName: string,
  +filterInput: string,
  +highlightedOption: ChoiceAttributeOptionModel | null,
  +optionContentConfiguration?: ContentConfigurationElements,
  +onOptionClick: Function,
};

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
`;

const StyledNoResults = styled.li`
  position: relative;
  display: block;
  margin-bottom: -1px;
  background-color: #fff;
  padding: ${spacers(0.75, 0.75, 0.25)};
`;

const LookupOptionsFoundOptions = ({
  className,
  hasResults,
  foundOptions,
  inProgress,
  filterName,
  filterInput,
  highlightedOption,
  optionContentConfiguration,
  onOptionClick,
}: Props) => (
  <StyledList
    className={classNames("lookup-found-options", className)}
    role="listbox"
  >
    {!hasResults && (
      <StyledNoResults>
        {filterInput.length > 0 && !inProgress ? (
          <Message
            id="LookupInput.Msg.NoOptions"
            defaultMessage="No options found"
          />
        ) : (
          <Message
            id="LookupInput.Placeholder"
            defaultMessage="Enter one or more characters"
          />
        )}
      </StyledNoResults>
    )}

    {foundOptions &&
      foundOptions.map((option) => (
        <LookupOptionsFoundOption
          key={option.code}
          highlightedOption={highlightedOption}
          filterName={filterName}
          filterInput={filterInput}
          option={option}
          onClick={onOptionClick}
          optionContentConfiguration={optionContentConfiguration}
        />
      ))}
  </StyledList>
);

LookupOptionsFoundOptions.displayName = "BI.LookupOptionsFoundOptions";

export default LookupOptionsFoundOptions;
