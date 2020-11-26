// @flow
import styled, { css } from "styled-components";
import { themeProp, spacers } from "beinformed/theme/utils";

import { ActionChooser } from "_component-registry/actions";
import { PanelFooter } from "_component-registry/panel";
import { CaseViewButton } from "_component-registry/buttons";

import type { ListItemModel, ListDetailModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +listitem: ListItemModel,
  +detail: ListDetailModel,
};

const StyledPanelFooter = styled(PanelFooter)`
  padding: ${spacers(0.75, 1.25)};
  background-color: rgba(0, 0, 0, 0.03);
  border-top: 1px solid rgba(0, 0, 0, 0.125);

  &:last-child {
    ${({ theme }) =>
      theme.ROUNDED_CORNERS &&
      css`
        border-radius: 0 0 calc(${themeProp("BORDER_RADIUS", "0.25rem")} - 1px)
          calc(${themeProp("BORDER_RADIUS", "0.25rem")} - 1px);
      `};
  }
`;

/**
 * Render detail footer with actions and to caseview action
 */
const ListDetailFooter = ({ className, listitem, detail }: Props) => (
  <StyledPanelFooter className={className}>
    {listitem.actionCollection.hasItems && (
      <ActionChooser actions={listitem.actionCollection.all} direction="up" />
    )}

    {detail.isCase && <CaseViewButton caseview={detail} />}
  </StyledPanelFooter>
);

ListDetailFooter.displayName = "BI.ListDetailFooter";

export default ListDetailFooter;
