// @flow
import { Message } from "beinformed/i18n";
import styled from "styled-components";

import { Button } from "_component-registry/buttons";
import { spacer } from "beinformed/theme/utils";

const StyledButton = styled(Button)`
  margin-left: ${spacer(0.25)};
`;

const QuickSearchButton = () => (
  <StyledButton
    key="search-button"
    name="button-search"
    className="btn-quick-search"
    buttonStyle="SECONDARY"
    type="submit"
    icon="magnify"
    isOutlineButton
    isIconButton
  >
    <Message
      id="QuickSearchInput.SearchLabel"
      defaultMessage="Search"
      screenreaderOnly
    />
  </StyledButton>
);
QuickSearchButton.displayName = "BI.QuickSearchButton";

export default QuickSearchButton;
