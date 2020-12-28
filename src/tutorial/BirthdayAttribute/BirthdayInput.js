// @flow
import React, { useState, useEffect, useCallback } from "react";
 
import styled from "styled-components";
import { themeProp, roundedCorners } from "beinformed/theme/utils";
 
import { mdiCalendarBlank } from "@mdi/js";
import { Icon } from "_component-registry/icon";
 
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "_component-registry/input";
import { StyledInput } from "_component-registry/elements";
 
const StyledInputGroup = styled(InputGroup)`
  input {
    border-radius: 0;
    border: 0;
    border-left: 1px solid ${themeProp("BORDER_COLOR")};
    background: transparent;
  }
 
  .input-group-addon span {
    border: 0;
  }
 
  ${roundedCorners()};
  border: 1px solid ${themeProp("BORDER_COLOR")};
`;
 
type Props = {|
  +name: string,
  +onValueChange: Function
|};
 
const BirthdayInput = ({ name, onValueChange }: Props) => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
 
  useEffect(() => {
    if (day !== "" && month !== "" && year !== "") {
      onValueChange(`${day}-${month}-${year}`);
    }
  }, [day, month, year]);
 
  return (
    <StyledInputGroup>
      <InputGroupAddon isPrepend>
        <InputGroupText>
          <Icon path={mdiCalendarBlank} />
        </InputGroupText>
      </InputGroupAddon>
      <StyledInput
        type="text"
        maxLength="2"
        name={`${name}_month`}
        placeholder="Month"
        value={month}
        onChange={e => setMonth(e.target.value)}
      />
      <StyledInput
        type="text"
        maxLength="2"
        name={`${name}_day`}
        placeholder="Day"
        value={day}
        onChange={e => setDay(e.target.value)}
      />
      <StyledInput
        type="text"
        maxLength="4"
        name={`${name}_year`}
        placeholder="Year"
        value={year}
        onChange={e => setYear(e.target.value)}
      />
    </StyledInputGroup>
  );
};
 
BirthdayInput.displayName = "Tutorial.BirthdayInput";
 
export default BirthdayInput;