// @flow
import classNames from "classnames";
import styled from "styled-components";
import { spacers, spacer } from "beinformed/theme/utils";

import {
  Actor,
  ScenarioLine,
  Step,
  Connection,
} from "_component-registry/modelcatalog";
import { Heading } from "_component-registry/elements";
import { Row, Column } from "_component-registry/grid";

import { Message } from "beinformed/i18n";

import { Href } from "beinformed/models";

import type { BusinessScenarioModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +concept: BusinessScenarioModel,
};

const StyledWrapper = styled.div`
  margin-bottom: ${spacer()};
`;

const StyledSteps = styled(Column)`
  width: 100%;
  margin: ${spacers(0, 1)};
  overflow: auto;
`;

const MARGIN_LEFT = 80;
const MARGIN_TOP = 13;
const HORIZONTAL_DISTANCE = 150;
const VERTICAL_DISTANCE = 80;

const BusinessScenario = ({ className, concept }: Props) => {
  const { actors } = concept;
  let hasScenarioWithoutActors = false;

  const scenarioSteps = concept.scenarioSteps.map((scenarioStep, i) => {
    /*
     * Y coordinate of scenario step is the index number of the persona
     * that is related to the scenario step concept.
     */
    const stepY = actors.findIndex((actor) =>
      scenarioStep.relationsCollection.some(
        (relation) =>
          relation.direction === "outgoing" &&
          relation.concept.concepttypeHref.path ===
            "/concepttypes/Library/KMTs/Business scenarios.bixml/Persona" &&
          relation.concept.selfhref.equals(actor.selfhref)
      )
    );

    if (stepY === -1) {
      hasScenarioWithoutActors = true;
    }

    return {
      X: i,
      Y: stepY === -1 ? actors.length : stepY,
      key: scenarioStep.key,
      label: scenarioStep.label,
      href: new Href(`/modelcatalog${scenarioStep.selfhref.toString()}`),
    };
  });

  if (scenarioSteps.length === 0) {
    return null;
  }

  const nrOfActors = hasScenarioWithoutActors
    ? actors.length + 1
    : actors.length;
  const svgWidth = scenarioSteps.length * HORIZONTAL_DISTANCE + MARGIN_LEFT;
  const svgHeight = nrOfActors * VERTICAL_DISTANCE + MARGIN_TOP;

  return (
    <StyledWrapper className={classNames("business-scenario", className)}>
      <Heading as="h3">
        <Message
          id="BusinessScenario.Header"
          defaultMessage="Business scenario"
        />
      </Heading>
      <Row>
        {actors.length > 0 && (
          <Column size={1}>
            {actors.map((actor, i) => (
              <Actor
                key={`actor-${actor.key}-${i}`}
                Y={i}
                label={actor.label}
                href={new Href(`/modelcatalog${actor.selfhref.toString()}`)}
              />
            ))}
          </Column>
        )}
        <StyledSteps className="business-scenario-steps">
          <svg width={svgWidth} height={svgHeight}>
            <g>
              {actors.map((actor, i) => (
                <ScenarioLine key={`${actor.key}-${i}`} Y={i} />
              ))}
            </g>

            <g>
              {scenarioSteps.map(
                (scenarioStep, i) =>
                  i < concept.scenarioSteps.length - 1 && (
                    <Connection
                      key={`conn-${scenarioStep.key}-${i}`}
                      X={scenarioStep.X}
                      Y={scenarioStep.Y}
                      nextY={scenarioSteps[i + 1].Y}
                    />
                  )
              )}
            </g>

            <g>
              {scenarioSteps.map((scenarioStep, i) => (
                <Step
                  key={`step-${scenarioStep.key}-${i}`}
                  X={scenarioStep.X}
                  Y={scenarioStep.Y}
                  label={scenarioStep.label}
                  href={scenarioStep.href}
                />
              ))}
            </g>
          </svg>
        </StyledSteps>
      </Row>
    </StyledWrapper>
  );
};

BusinessScenario.displayName = "BI.BusinessScenario";

export default BusinessScenario;
