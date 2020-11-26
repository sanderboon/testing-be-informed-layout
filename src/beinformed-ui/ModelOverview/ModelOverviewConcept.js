// @flow
import styled from "styled-components";
import { roundedCorners, spacers, spacer } from "beinformed/theme/utils";

import { Href } from "beinformed/models";
import { BASE } from "beinformed/constants/Constants";
import { useMessage } from "beinformed/i18n";

import { Link } from "_component-registry/link";

import type { ConceptLinkModel } from "beinformed/models";
export type Props = {
  +concept: ConceptLinkModel,
};

const StyledConcept = styled(Link)`
  display: block;
  float: left;
  padding: ${spacers(0.5, 1)};
  margin-right: ${spacer(0.6)};
  margin-bottom: ${spacer(0.6)};
  border: none;
  ${roundedCorners()};
`;

const StyledIcon = styled.img`
  margin-right: ${spacer(0.5)};
`;

/**
 * Renders a concept that is part of a business model overview lane
 */
const ModelOverviewConcept = ({ concept }: Props) => {
  const conceptStyle = {
    backgroundColor: concept.conceptType.backgroundColor,
    color: concept.conceptType.textColor,
    borderColor: concept.conceptType.borderColor,
  };

  const altText = useMessage(
    "Concept.Icon.AltText",
    `Icon of ${concept.conceptType.label}`,
    { SUBJECT: concept.conceptType.label }
  );

  return (
    <StyledConcept
      style={conceptStyle}
      dataId={concept.key}
      href={new Href(`/modelcatalog${concept.selfhref.toString()}`)}
    >
      {concept.conceptType && concept.conceptType.icon && (
        <StyledIcon src={`${BASE}${concept.conceptType.icon}`} alt={altText} />
      )}
      <span>{concept.label}</span>
    </StyledConcept>
  );
};

ModelOverviewConcept.displayName = "BI.ModelOverviewConcept";

export default ModelOverviewConcept;
