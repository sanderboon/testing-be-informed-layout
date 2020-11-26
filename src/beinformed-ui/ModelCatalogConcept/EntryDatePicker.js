// @flow
import { useState } from "react";
import { parseISO } from "date-fns";

import styled from "styled-components";
import { themeProp } from "beinformed/theme/utils";

import { useMessage } from "beinformed/i18n";

import { mdiCalendar } from "@mdi/js";
import { Icon } from "_component-registry/icon";

import { DatetimePicker } from "_component-registry/datetimepicker";
import { Tooltip } from "_component-registry/tooltip";

export type Props = {
  +className?: string,
  +entryDate: ?string,
  +onChange: Function,
};

const StyledEntryDatePicker = styled.div`
  position: relative;
  cursor: pointer;
  top: -2px;

  svg {
    color: ${themeProp("GREY_300")};

    &:focus,
    &:hover {
      color: ${themeProp("PRIMARY_COLOR")};
    }
  }
`;
const StyledDatetimePicker = styled(DatetimePicker)`
  position: absolute;
  right: 0;
  top: calc(100% + 12px);
`;

const EntryDatePicker = ({ className, entryDate, onChange }: Props) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const readableEntryDate = entryDate
    ? parseISO(entryDate).toLocaleDateString()
    : "";

  return (
    <StyledEntryDatePicker className={className}>
      <Tooltip
        content={`${useMessage(
          "ModelCatalog.EntryDate",
          "Entry date"
        )}: ${readableEntryDate}`}
      >
        <Icon
          path={mdiCalendar}
          size="20px"
          onClick={() => setShowDatePicker(!showDatePicker)}
        />
      </Tooltip>

      {showDatePicker && (
        <StyledDatetimePicker
          date={entryDate}
          onSelect={(date) => {
            setShowDatePicker(false);
            return onChange(date);
          }}
        />
      )}
    </StyledEntryDatePicker>
  );
};

EntryDatePicker.displayName = "BI.EntryDatePicker";

export default EntryDatePicker;
