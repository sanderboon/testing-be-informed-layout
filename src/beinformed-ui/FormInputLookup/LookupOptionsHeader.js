// @flow
import classNames from "classnames";
import styled from "styled-components";
import { spacer } from "beinformed/theme/utils";

import { Button } from "_component-registry/buttons";
import { LookupOptionsActiveOptions } from "_component-registry/lookup";
import { Icon } from "_component-registry/icon";

import type {
  LinkModel,
  ContentConfigurationElements,
  ChoiceAttributeOptionModel,
} from "beinformed/models";
export type Props = {
  +className?: string,
  +activeOptions: Array<ChoiceAttributeOptionModel>,
  +isMultiple: boolean,
  +isReadOnly?: boolean,
  +isDisabled?: boolean,
  +optionContentConfiguration?: ContentConfigurationElements,
  +lookupListLink: ?LinkModel,
  +onOpenLookupList: Function,
  +onActiveOptionRemoval: Function,
  +onOpen: Function,
  +onFocus: Function,
  +onKeyDown: Function,
};

const StyledHeader = styled.div`
  display: flex;
`;

const StyledButton = styled(Button)`
  margin-left: ${spacer(0.25)};
`;

const LookupOptionsHeader = ({
  className,
  activeOptions,
  isMultiple,
  isReadOnly,
  isDisabled,
  optionContentConfiguration,
  lookupListLink,
  onOpenLookupList,
  onActiveOptionRemoval,
  onOpen,
  onFocus,
  onKeyDown,
}: Props) => (
  <StyledHeader className={classNames("lookup-options-header", className)}>
    <LookupOptionsActiveOptions
      activeOptions={activeOptions}
      isMultiple={isMultiple}
      isReadOnly={isReadOnly}
      isDisabled={isDisabled}
      optionContentConfiguration={optionContentConfiguration}
      onRemove={onActiveOptionRemoval}
      onOpen={onOpen}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
    />
    {lookupListLink && (
      <StyledButton
        className="btn-lookup-list-toggle"
        onClick={onOpenLookupList}
      >
        <Icon name="dots-horizontal" />
      </StyledButton>
    )}
  </StyledHeader>
);

LookupOptionsHeader.displayName = "BI.LookupOptionsHeader";

export default LookupOptionsHeader;
