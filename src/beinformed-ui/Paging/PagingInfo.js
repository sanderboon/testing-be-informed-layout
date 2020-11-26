// @flow
import { isNil } from "lodash";

import classNames from "classnames";
import styled from "styled-components";

import { PagingInfoMessage } from "_component-registry/paging";

import type { ListModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +list: ListModel,
};

const StyledPagingInfo = styled.div`
  font-size: 80%;
  font-weight: 400;
`;

/**
 * Render paging information
 */
const PagingInfo = ({ className, list }: Props) => {
  const { totalResults, page, pagesize } = list.paging;

  const firstItem = page === 1 ? 1 : pagesize.value * (page - 1) + 1;
  const last = firstItem + pagesize.value - 1;
  const lastItem = last > totalResults ? totalResults : last;
  return (
    <StyledPagingInfo className={classNames("paginginfo", className)}>
      <PagingInfoMessage
        hasPage={!isNil(page) && totalResults > pagesize.value}
        totalResults={totalResults}
        firstItem={firstItem}
        lastItem={lastItem}
      />
    </StyledPagingInfo>
  );
};

PagingInfo.displayName = "BI.PagingInfo";

export default PagingInfo;
