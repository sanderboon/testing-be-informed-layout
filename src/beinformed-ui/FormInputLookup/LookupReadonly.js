// @flow
import classNames from "classnames";
import styled from "styled-components";
import { spacer } from "beinformed/theme/utils";

import { LookupReadonlyOptions } from "_component-registry/lookup";

import { Icon } from "_component-registry/icon";
import { Button } from "_component-registry/buttons";

import type {
  LinkModel,
  ContentConfigurationElements,
  ChoiceAttributeOptionModel,
} from "beinformed/models";
export type Props = {
  +className?: string,
  +isMultiple: boolean,
  +lookupListLink: ?LinkModel,
  +lookupListLabel: string,
  +optionContentConfiguration?: ContentConfigurationElements,
  +activeOptions: Array<ChoiceAttributeOptionModel>,
  +onOpenLookupList: Function,
};

const StyledHeader = styled.div`
  display: flex;
`;

const StyledButton = styled(Button)`
  margin-left: ${spacer(0.25)};
`;

/**
 * Render lookup input
 */
const LookupReadonly = ({
  className,
  isMultiple,
  activeOptions,
  optionContentConfiguration,
  lookupListLink,
  lookupListLabel,
  onOpenLookupList,
}: Props) => (
  <StyledHeader className={classNames("lookup-readonly", className)}>
    <LookupReadonlyOptions
      activeOptions={activeOptions}
      isMultiple={isMultiple}
      optionContentConfiguration={optionContentConfiguration}
      placeholder={lookupListLabel}
      onClick={onOpenLookupList}
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

LookupReadonly.displayName = "BI.LookupReadonly";

export default LookupReadonly;
