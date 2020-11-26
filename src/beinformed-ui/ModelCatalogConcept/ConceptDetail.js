// @flow
import { Helmet } from "react-helmet-async";
import { get } from "lodash";

import { useSelector } from "react-redux";

import {
  ConceptHeader,
  ConceptRelations,
  ConceptLabels,
  ConceptFormula,
  ConceptProperties,
  ConceptTextFragments,
  ConceptSourceReferences,
} from "_component-registry/concept";
import { BusinessScenario } from "_component-registry/modelcatalog";

import { Row, Column } from "_component-registry/grid";

import classNames from "classnames";

import BusinessScenarioModel from "beinformed/models/concepts/BusinessScenarioModel";
import type { ConceptDetailModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +conceptDetail: ConceptDetailModel,
};

const BUSINESS_SCENARIO_CONCEPT_TYPE =
  "/concepttypes/Library/KMTs/Business scenarios.bixml/BusinessScenario";

const ConceptDetail = ({ className, conceptDetail }: Props) => {
  const availableLocales = useSelector(
    (state) => state.i18n.locales.availableLocaleCodes
  );

  if (!conceptDetail) {
    return null;
  }

  const sourceReferences = conceptDetail.getSourceReferenceCollection(
    availableLocales
  );

  const hasBusinessScenario =
    get(conceptDetail, "conceptType.selfhref.path", "") ===
    BUSINESS_SCENARIO_CONCEPT_TYPE;

  return (
    <div className={classNames("concept-detail", className)}>
      <Helmet>
        <title>{conceptDetail.label}</title>
      </Helmet>

      <ConceptHeader concept={conceptDetail} />

      <Row>
        {conceptDetail.relationsCollection.hasItems && (
          <Column size={3}>
            <ConceptRelations
              relations={conceptDetail.relationsCollection.outgoing}
              direction="outgoing"
            />
            <ConceptRelations
              relations={conceptDetail.relationsCollection.incoming}
              direction="incoming"
            />
          </Column>
        )}

        <Column size={9}>
          {conceptDetail instanceof BusinessScenarioModel &&
            hasBusinessScenario && <BusinessScenario concept={conceptDetail} />}
          {conceptDetail.labels.length > 0 && (
            <ConceptLabels labels={conceptDetail.labels} />
          )}
          {conceptDetail.formula && (
            <ConceptFormula formula={conceptDetail.formula} />
          )}
          {conceptDetail.conceptProperties.length > 0 && (
            <ConceptProperties properties={conceptDetail.conceptProperties} />
          )}
          {conceptDetail.textfragments.length > 0 && (
            <ConceptTextFragments textfragments={conceptDetail.textfragments} />
          )}
          {sourceReferences.hasItems && (
            <ConceptSourceReferences sourceReferences={sourceReferences} />
          )}
        </Column>
      </Row>
    </div>
  );
};

ConceptDetail.displayName = "BI.ConceptDetail";

export default ConceptDetail;
