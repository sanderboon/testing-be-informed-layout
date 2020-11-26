// @flow
import classNames from "classnames";
import styled from "styled-components";
import { spacer } from "beinformed/theme/utils";

import { Message } from "beinformed/i18n";

import { AttributeList } from "_component-registry/attributes-readonly";
import { EndResult } from "_component-registry/results";
import { Heading } from "_component-registry/elements";

import type { ListDetailModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +detail: ListDetailModel,
};

const StyledEndResult = styled(EndResult)`
  margin-top: ${spacer(1)};
  margin-bottom: 0;
`;

const StyledGivenAswers = styled.div`
  margin-top: ${spacer(1)};
`;

const ListDetailInstrumentResult = ({ className, detail }: Props) => {
  if (detail.results || detail.givenAnswers) {
    return (
      <div className={classNames(className, "list-detail-instrument-result")}>
        {detail.results && (
          <StyledEndResult
            id={`result-${detail.key}-${detail.id}`}
            attributes={detail.results.children.all}
            contentConfiguration={detail.contentConfiguration}
          />
        )}
        {detail.givenAnswers && (
          <StyledGivenAswers className="instrument-result-given-answers">
            <Heading as="h5">
              <Message
                id="ListDetailInstrumentResult.GivenAnswerTitle"
                defaultMessage="Given answers"
              />
            </Heading>
            <AttributeList attributes={detail.givenAnswers.children.all} />
          </StyledGivenAswers>
        )}
      </div>
    );
  }

  return null;
};

ListDetailInstrumentResult.displayName = "BI.ListDetailInstrumentResult";

export default ListDetailInstrumentResult;
