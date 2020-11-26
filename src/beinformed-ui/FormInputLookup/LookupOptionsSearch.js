// @flow
import { forwardRef } from "react";

import classNames from "classnames";
import styled from "styled-components";
import { spacers, spacer } from "beinformed/theme/utils";

import { TextInput } from "_component-registry/input";
import { Button } from "_component-registry/buttons";
import { Icon } from "_component-registry/icon";

import { Message } from "beinformed/i18n";

export type Props = {
  +className?: string,
  +name: string,
  +filterInput: string,
  +inProgress: boolean,
  +onLookup: Function,
  +onInputKeyDown: Function,
  +onLookupButton: Function,
  +onLookupButtonKeyDown: Function,
};

const StyledTextInput = styled(TextInput)`
  padding: ${spacers(0, 0.25, 0.25)};
`;

const StyledButton = styled(Button)`
  margin-left: ${spacer(0.25)};
`;

const LookupOptionsSearch = forwardRef<Props, typeof StyledTextInput>(
  (
    {
      className,
      name,
      filterInput,
      inProgress,
      onLookup,
      onInputKeyDown,
      onLookupButton,
      onLookupButtonKeyDown,
    }: Props,
    ref
  ) => (
    <StyledTextInput
      ref={ref}
      className={classNames("lookup-search is-lookup", className)}
      name={`${name}_lookupInput`}
      value={filterInput}
      autoComplete="off"
      onChange={onLookup}
      onKeyDown={onInputKeyDown}
      append={
        <StyledButton
          key="lookupButton"
          name="lookup"
          onClick={onLookupButton}
          onKeyDown={onLookupButtonKeyDown}
        >
          {inProgress ? <Icon name="loading" spin /> : <Icon name="magnify" />}
          <Message
            id="LookupInput.Button.Lookup"
            defaultMessage="Lookup"
            screenreaderOnly
          />
        </StyledButton>
      }
    />
  )
);

LookupOptionsSearch.displayName = "BI.LookupOptionsSearch";

export default LookupOptionsSearch;
