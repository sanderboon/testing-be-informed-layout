// @flow
import classNames from "classnames";
import styled from "styled-components";

import LinkButton from "beinformed-ui/Button/LinkButton";

import { useMessage } from "beinformed/i18n";

import type { DetailModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +caseview: DetailModel,
};

const RightLinkButton = styled(LinkButton)`
  float: right;
`;

const CaseViewButton = ({ className, caseview }: Props) => {
  const openCaseLabel = useMessage("CaseViewButton.label", "Open case");

  return (
    <RightLinkButton
      href={caseview.selfhref}
      className={classNames("btn-opencase", className)}
      buttonStyle="PRIMARY"
      icon="folder-open"
    >
      {caseview.titleAttribute
        ? caseview.titleAttribute.readonlyvalue
        : openCaseLabel}
    </RightLinkButton>
  );
};

CaseViewButton.displayName = "BI.CaseViewButton";

export default CaseViewButton;
