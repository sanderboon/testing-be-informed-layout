// @flow
import classNames from "classnames";
import styled from "styled-components";

import { FormRoute } from "_component-registry/routes";

import {
  AttributeList,
  AttributeValueText,
} from "_component-registry/attributes-readonly";
import { Panel, PanelBody, PanelTitle } from "_component-registry/panel";
import { DetailPanelFooter } from "_component-registry/detailpanel";

import type { DetailModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +detail: DetailModel,
};

const StyledAttributeList = styled(AttributeList)`
  max-width: 800px;
`;

/**
 * Render detail of a list link item
 */
const DetailPanel = ({ className, detail }: Props) =>
  detail ? (
    <div className={classNames("detailpanel", className)} data-id={detail.id}>
      <Panel>
        <PanelBody>
          {detail.titleAttribute && (
            <PanelTitle>
              <AttributeValueText attribute={detail.titleAttribute} />
            </PanelTitle>
          )}

          <StyledAttributeList attributes={detail.attributeCollection.all} />
        </PanelBody>
        {detail.actionCollection.length > 0 && (
          <DetailPanelFooter detail={detail} />
        )}
      </Panel>

      <FormRoute model={detail} />
    </div>
  ) : null;

DetailPanel.displayName = "BI.DetailPanel";

export default DetailPanel;
