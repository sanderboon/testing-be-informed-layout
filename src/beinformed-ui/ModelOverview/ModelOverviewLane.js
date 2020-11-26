// @flow
import classNames from "classnames";
import styled from "styled-components";
import { themeProp, spacers, spacer } from "beinformed/theme/utils";

import { ModelOverviewConcept } from "_component-registry/modelcatalog";
import { Heading } from "_component-registry/elements";

import type { ConceptIndexModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +lane: Object,
  +conceptIndex: ConceptIndexModel,
};

const StyledLane = styled.div`
  overflow: auto;
  padding: ${spacers(0.7, 0, 0.3)};
  padding-left: 175px;
`;

const StyledTitle = styled(Heading)`
  display: block;
  float: left;
  max-width: 175px;
  margin-left: -175px;
  padding-top: ${spacer(0.7)};

  font-size: ${themeProp("FONT_SIZE_BASE")};
  font-size: ${themeProp("HEADER_COLOR")};
  font-weight: 500;
`;

const CONCEPTTYPE_PATH = "/concepttypes";

const ModelOverviewLane = ({ className, lane, conceptIndex }: Props) => {
  const concepts = conceptIndex.items.filter((item) => {
    const conceptTypePath = item.concepttypeHref.path.replace(
      CONCEPTTYPE_PATH,
      ""
    );

    return lane.conceptTypes.includes(conceptTypePath);
  });

  if (concepts.length > 0) {
    return (
      <StyledLane className={classNames("model-overview-lane", className)}>
        <StyledTitle as="h3" className="lane-title" data-id={lane.key}>
          {lane.label}
        </StyledTitle>
        {concepts.map((concept) => (
          <ModelOverviewConcept
            key={`${lane.key}-${concept.key}`}
            concept={concept}
          />
        ))}
      </StyledLane>
    );
  }

  return null;
};

ModelOverviewLane.displayName = "BI.ModelOverviewLane";

export default ModelOverviewLane;
