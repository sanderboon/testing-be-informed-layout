// @flow
import { capitalize } from "lodash";

import classNames from "classnames";
import styled from "styled-components";
import { spacer, themeProp } from "beinformed/theme/utils";

import { Message } from "beinformed/i18n";

import { ConceptRelation } from "_component-registry/concept";

import type { ConceptRelationCollection } from "beinformed/models";
export type Props = {
  +className?: string,
  +relations: ConceptRelationCollection,
  +direction: string,
};

const StyledWrapper = styled.div`
  margin-bottom: ${spacer(2)};
`;

const StyledDirectionHeader = styled.h2`
  font-size: ${themeProp("FONT_SIZE_H2")};
  font-weight: ${themeProp("HEADING_FONT_WEIGHT")};
  color: ${themeProp("HEADER_COLOR")};
`;

/**
 * Concept relations
 */
const ConceptRelations = ({ className, relations, direction }: Props) => {
  if (relations.length > 0) {
    return (
      <StyledWrapper
        className={classNames("concept-relations", direction, className)}
      >
        <StyledDirectionHeader>
          <Message id={`ConceptRelations.${direction}`}>
            {capitalize(direction)}
          </Message>
        </StyledDirectionHeader>

        {relations.types.map(({ key, label }) => {
          return (
            <ConceptRelation
              key={key}
              label={label}
              relations={relations.byType(key)}
            />
          );
        })}
      </StyledWrapper>
    );
  }

  return null;
};
ConceptRelations.displayName = "BI.ConceptRelations";

export default ConceptRelations;
