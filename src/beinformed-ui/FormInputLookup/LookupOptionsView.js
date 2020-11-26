// @flow
import { forwardRef, createRef, useEffect } from "react";

import classNames from "classnames";
import styled from "styled-components";

import {
  LookupOptionsHeader,
  LookupOptionsSearch,
  LookupOptionsDropdown,
  LookupOptionsFoundOptions,
} from "_component-registry/lookup";

import type {
  LinkModel,
  ContentConfigurationElements,
  ChoiceAttributeOptionModel,
  LookupOptionsModel,
} from "beinformed/models";
export type Props = {
  +className?: string,
  +name: string,
  +disabled?: boolean,
  +isMultiple: boolean,
  +lookupLink: LinkModel,
  +lookupListLink: ?LinkModel,
  +optionContentConfiguration?: ContentConfigurationElements,
  +readOnly?: boolean,

  +filterInput: string,
  +lookupOptions: ?LookupOptionsModel,
  +showOptions: boolean,
  +inProgress: boolean,
  +highlightedOption: ChoiceAttributeOptionModel | null,
  +activeOptions: Array<ChoiceAttributeOptionModel>,

  +onActiveOptionRemoval: Function,
  +onOpen: Function,
  +onFocus: Function,
  +onKeyDown: Function,

  +onLookup: Function,
  +onInputKeyDown: Function,
  +onLookupButton: Function,
  +onLookupButtonKeyDown: Function,

  +onOptionClick: Function,

  +onOpenLookupList: Function,
};

const StyledDropdown = styled.div`
  position: relative;
`;

/**
 * Render lookup input
 */
const LookupOptionsView = forwardRef<Props, typeof LookupOptionsSearch>(
  (
    {
      className,
      name,
      showOptions,
      isMultiple,
      activeOptions,
      readOnly,
      disabled,
      optionContentConfiguration,

      filterInput,
      inProgress,

      lookupOptions,
      lookupLink,
      lookupListLink,
      highlightedOption,

      onActiveOptionRemoval,
      onOpen,
      onFocus,
      onKeyDown,

      onLookup,
      onInputKeyDown,
      onLookupButton,
      onLookupButtonKeyDown,

      onOptionClick,

      onOpenLookupList,
    }: Props,
    ref
  ) => {
    const _input = createRef<HTMLInputElement>();

    useEffect(() => {
      if (_input.current) {
        _input.current.focus();
      }
    }, [_input]);

    return (
      <StyledDropdown
        ref={ref}
        className={classNames("lookup-options", className)}
      >
        <LookupOptionsHeader
          activeOptions={activeOptions}
          isMultiple={isMultiple}
          isReadOnly={readOnly}
          isDisabled={disabled}
          lookupListLink={lookupListLink}
          optionContentConfiguration={optionContentConfiguration}
          onOpenLookupList={onOpenLookupList}
          onActiveOptionRemoval={onActiveOptionRemoval}
          onOpen={onOpen}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
        />
        {showOptions && (
          <LookupOptionsDropdown show={showOptions}>
            <LookupOptionsSearch
              ref={_input}
              name={name}
              filterInput={filterInput}
              inProgress={inProgress}
              onLookup={onLookup}
              onInputKeyDown={onInputKeyDown}
              onLookupButton={onLookupButton}
              onLookupButtonKeyDown={onLookupButtonKeyDown}
            />
            <LookupOptionsFoundOptions
              hasResults={
                lookupOptions ? lookupOptions.options.hasItems : false
              }
              foundOptions={lookupOptions ? lookupOptions.options : null}
              inProgress={inProgress}
              filterName={lookupLink.filterName}
              filterInput={filterInput}
              highlightedOption={highlightedOption}
              optionContentConfiguration={optionContentConfiguration}
              onOptionClick={onOptionClick}
            />
          </LookupOptionsDropdown>
        )}
      </StyledDropdown>
    );
  }
);

LookupOptionsView.displayName = "BI.LookupOptionsView";

export default LookupOptionsView;
