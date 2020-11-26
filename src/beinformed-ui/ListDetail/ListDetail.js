// @flow
import classNames from "classnames";
import styled from "styled-components";
import { roundedCorners, spacer } from "beinformed/theme/utils";

import {
  AttributeList,
  AttributeValueText,
} from "_component-registry/attributes-readonly";
import { Panel, PanelBody, PanelTitle } from "_component-registry/panel";
import { FormRoute } from "_component-registry/routes";
import {
  ListDetailInstrumentResult,
  ListDetailEventData,
  ListDetailFooter,
} from "_component-registry/listdetail";
import { ConnectedPanelRenderer } from "_component-registry/panelrenderer";

import type { ListItemModel, ListDetailModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +listitem: ListItemModel,
  +detail: ListDetailModel,
};

const StyledDetail = styled.div`
  z-index: 1;
`;

const StyledPanel = styled(Panel)`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  ${roundedCorners()};
`;
const StyledPanelBody = styled(PanelBody)`
  flex: 1 1 auto;
  padding: ${spacer(1.25)};
`;

/**
 * Render detail of a list link item
 */
const ListDetail = ({ className, listitem, detail }: Props) => {
  if (detail) {
    return (
      <StyledDetail
        className={classNames("list-detail", className)}
        data-id={detail.id}
      >
        <StyledPanel className="list-detail-main">
          <StyledPanelBody>
            {detail.titleAttribute && (
              <PanelTitle>
                <AttributeValueText attribute={detail.titleAttribute} />
              </PanelTitle>
            )}
            <AttributeList attributes={detail.attributeCollection.all} />

            {detail.hasResults && (
              <ListDetailInstrumentResult detail={detail} />
            )}

            {detail.hasEventData && <ListDetailEventData detail={detail} />}
          </StyledPanelBody>
          {(listitem.actionCollection.length > 0 || detail.isCase) && (
            <ListDetailFooter listitem={listitem} detail={detail} />
          )}
        </StyledPanel>

        {listitem.panelLinks.hasItems &&
          listitem.panelLinks.map((listitemLink) => (
            <ConnectedPanelRenderer
              key={listitemLink.key}
              href={listitemLink.href}
            />
          ))}

        <FormRoute model={listitem} />
      </StyledDetail>
    );
  }

  return null;
};

ListDetail.displayName = "BI.ListDetail";

export default ListDetail;
