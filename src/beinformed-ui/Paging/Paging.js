// @flow
import styled from "styled-components";
import classNames from "classnames";
import { roundedCorners } from "beinformed/theme/utils";

import { Message } from "beinformed/i18n";

import { PagingItemArrow } from "_component-registry/paging";

import type { ListHref } from "beinformed/models";
export type Props = {
  +className?: string,
  +prevPage: number,
  +nextPage: number,
  +baseHref: ListHref,
  +onChange: Function,
};

const StyledList = styled.ul`
  display: flex;
  padding-left: 0;
  list-style: none;
  ${roundedCorners()};
`;

const Paging = ({
  className,
  prevPage,
  nextPage,
  baseHref,
  onChange,
}: Props) => (
  <StyledList className={classNames("pagination", className)}>
    <li
      className={classNames("page-item previous-page", {
        disabled: prevPage < 1,
      })}
    >
      <PagingItemArrow
        type="previous"
        baseHref={baseHref}
        page={prevPage}
        isEnabled={prevPage > 0}
        onClick={onChange}
      >
        <Message id="Paging.PreviousPage">Previous page</Message>
      </PagingItemArrow>
    </li>
    <li
      className={classNames("page-item next-page", {
        disabled: nextPage === -1,
      })}
    >
      <PagingItemArrow
        type="next"
        baseHref={baseHref}
        page={nextPage}
        isEnabled={nextPage > 0}
        onClick={onChange}
      >
        <Message id="Paging.NextPage">Next page</Message>
      </PagingItemArrow>
    </li>
  </StyledList>
);

Paging.displayName = "BI.Paging";

export default Paging;
