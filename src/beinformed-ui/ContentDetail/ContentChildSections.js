// @flow
import classNames from "classnames";
import styled from "styled-components";
import { spacer } from "beinformed/theme/utils";

import { ContentBody } from "_component-registry/content";

import type { ContentModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +childSections: Array<ContentModel>,
  +renderSectionLabel?: boolean,
};

const StyledList = styled.ul`
  padding-left: 0;
  list-style: none;
  margin-bottom: ${spacer()};
`;

const ContentChildSections = ({
  className,
  childSections,
  renderSectionLabel,
}: Props) => (
  <StyledList className={classNames("content-childsections", className)}>
    {childSections.map((childSection) => (
      <li key={childSection.key}>
        {(childSection.body || childSection.label || childSection.number) && (
          <ContentBody
            body={childSection.body}
            label={childSection.label}
            number={childSection.number}
            sourceHref={childSection.selfhref}
            renderSectionLabel={renderSectionLabel}
          />
        )}

        {childSection.childSections.length > 0 && (
          <ContentChildSections childSections={childSection.childSections} />
        )}
      </li>
    ))}
  </StyledList>
);

ContentChildSections.displayName = "BI.ContentChildSections";

export default ContentChildSections;
