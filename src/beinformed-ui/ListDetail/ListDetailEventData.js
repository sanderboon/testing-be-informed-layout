// @flow
import classNames from "classnames";
import styled from "styled-components";
import { spacers } from "beinformed/theme/utils";

import { AttributeList } from "_component-registry/attributes-readonly";
import { Heading } from "_component-registry/elements";

import { SHOW_ATTRIBUTE_SET_LABELS_IN_DETAILS } from "beinformed/constants/LayoutHints";

import type { ListDetailModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +detail: ListDetailModel,
};

const StyledAttributeset = styled.div`
  margin: ${spacers(0.5, 0)};
`;

const ListDetailEventData = ({ className, detail }: Props) => (
  <div className={classNames("list-detail-eventdata", className)}>
    {detail.eventdata.map((attributeset) => (
      <StyledAttributeset
        key={attributeset.key}
        className="attributeset"
        data-id={attributeset.key}
      >
        {detail.layouthint.has(SHOW_ATTRIBUTE_SET_LABELS_IN_DETAILS) && (
          <Heading as="h5">{attributeset.label}</Heading>
        )}
        <AttributeList attributes={attributeset.attributeCollection.all} />
      </StyledAttributeset>
    ))}
  </div>
);

ListDetailEventData.displayName = "BI.ListDetailEventData";

export default ListDetailEventData;
