// @flow
import classNames from "classnames";
import styled from "styled-components";
import { spacer } from "beinformed/theme/utils";

import { ConceptLink, ConceptRelationLabel } from "_component-registry/concept";
import { IconPopover } from "_component-registry/popover";

import type { ConceptRelationCollection } from "beinformed/models";
export type Props = {
  className?: string,
  label: string,
  relations: ConceptRelationCollection,
};

const StyledList = styled.ul`
  margin-bottom: ${spacer(2)};
  padding-left: 0;
  list-style: none;
`;

const ConceptRelation = ({ className, label, relations }: Props) => (
  <div className={classNames(className, "relation-concepts")}>
    <ConceptRelationLabel label={label} />

    <StyledList>
      {relations.map((relation) => (
        <li key={`${relation.concept.key}`} className="relation-concept">
          <ConceptLink concept={relation.concept} />
          {relation.textfragments && (
            <IconPopover>
              {relation.textfragments.map((textFragment) => (
                <div key={textFragment.type}>{textFragment.text}</div>
              ))}
            </IconPopover>
          )}
        </li>
      ))}
    </StyledList>
  </div>
);

ConceptRelation.displayName = "BI.ConceptRelation";

export default ConceptRelation;
