// @flow
import classNames from "classnames";
import styled from "styled-components";
import { spacer } from "beinformed/theme/utils";

import { Message } from "beinformed/i18n";

import { ChoiceAttributeOptionModel } from "beinformed/models";
import { ChoiceOption } from "_component-registry/input";

import type { ListItemModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +selectedItems: Array<ListItemModel>,
  +isMultiple?: boolean,
  +onItemSelect: Function,
};

const StyledSelected = styled.div`
  margin-bottom: ${spacer()};
`;

const LookupListSelected = ({
  className,
  selectedItems,
  isMultiple,
  onItemSelect,
}: Props) => (
  <StyledSelected className={classNames(className, "lookuplist-selected")}>
    <Message id="LookupListMain.SelectedLabel">Selected:</Message>
    <div className="lookuplist-selected-items">
      {selectedItems.length === 0 && "-"}
      {selectedItems.map((selectedItem) => {
        const option = ChoiceAttributeOptionModel.createFromListItemModel(
          selectedItem
        );
        return (
          <ChoiceOption
            key={selectedItem.id}
            option={option}
            isMultiple={isMultiple}
            isRemovable
            onRemove={() => onItemSelect(selectedItem)}
          />
        );
      })}
    </div>
  </StyledSelected>
);
LookupListSelected.displayName = "BI.LookupListSelected";

export default LookupListSelected;
