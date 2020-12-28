// @flow
import classNames from "classnames";

import { Helmet } from "react-helmet-async";

import { Row, Column } from "_component-registry/grid";
import { FormattedText } from "_component-registry/text";
import { CaseHeader, CaseViewPanels } from "_component-registry/caseview";
import { TaskGroupPanels } from "_component-registry/actions";
import { FormRoute } from "_component-registry/routes";

import type { CaseViewModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +caseview?: CaseViewModel,
};

const CaseView = ({ className, caseview }: Props) => {
  if (caseview) {
    const caseName = caseview.casename ? caseview.casename.value : "";

    const hasTaskGroup = caseview.taskGroupCollection.hasItems;
    
    return (
      <div className={classNames("caseview", className)}>
        <Helmet>
          <title>{caseName}</title>
        </Helmet>
        <CaseHeader
          name={caseview.casename}
          properties={caseview.attributeCollection.all}
        />
        <Row>
          <Column size={hasTaskGroup ? 9 : 12}>  
            {caseview.introtext && <FormattedText text={caseview.introtext} />}
            
            {caseview.panelLinks.hasItems && (
              <CaseViewPanels caseview={caseview} />
            )}
          
          </Column>
          
          {hasTaskGroup && (
            <Column
              as={TaskGroupPanels}
              size={3}
              taskGroupPanels={caseview.taskGroupCollection}
            />
          )}
          
        </Row>
        <FormRoute model={caseview} />
      </div>
    );
  }

  return null;
};

CaseView.displayName = "BI.CaseView";

export default CaseView;
