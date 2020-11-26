// @flow
import classNames from "classnames";
import styled from "styled-components";
import { roundedCorners } from "beinformed/theme/utils";

import { useMessage } from "beinformed/i18n";

import {
  PagingItem,
  PagingItemArrow,
  Paging,
} from "_component-registry/paging";

import type { ListModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +list: ListModel,
  +maxPagesToShow: number,
  +onChange: Function,
};

const StyledList = styled.ul`
  display: flex;
  padding-left: 0;
  list-style: none;
  ${roundedCorners()};
`;

/**
 * Generate array of page numbers to show to the end user, based on current page,
 * maximum number of pages and the number of pagenumbers we want to show
 */
export const getPageNumbers = (
  currentPage: number,
  maxPages: number,
  maxPagesToShow: number
) => {
  let startNumber = currentPage - Math.floor(maxPagesToShow / 2);

  if (startNumber <= 0) {
    startNumber = 1;
  }

  let endNumber = startNumber + maxPagesToShow - 1;

  if (endNumber > maxPages) {
    const diff = endNumber - maxPages;
    endNumber = maxPages;

    startNumber = Math.max(1, startNumber - diff);
  }

  const pageNumbers = [];

  for (let i = startNumber; i <= endNumber; i++) {
    pageNumbers.push(i);
  }

  return pageNumbers;
};

const DEFAULT_PAGING_PAGES_TO_SHOW = 5;

const Pagination = ({
  className,
  list,
  maxPagesToShow = DEFAULT_PAGING_PAGES_TO_SHOW,
  onChange,
}: Props) => {
  const prevPage = list.paging.page - 1;
  const nextPage = list.hasResults() ? list.paging.page + 1 : -1;

  const gotoFirstPageMessage = useMessage(
    "PagingItem.AriaLabel.GotoFirstPage",
    "Go to the first page"
  );
  const gotoPreviousPageMessage = useMessage(
    "PagingItem.AriaLabel.GotoPreviousPage",
    "Go to the previous page, page number {PREVIOUS_PAGE_NUMBER}",
    {
      PREVIOUS_PAGE_NUMBER: prevPage,
    }
  );
  const gotoNextPageMessage = useMessage(
    "PagingItem.AriaLabel.GotoNextPage",
    "Go to the next page, page number {NEXT_PAGE_NUMBER}",
    {
      NEXT_PAGE_NUMBER: nextPage,
    }
  );
  const gotoLastPageMessage = useMessage(
    "PagingItem.AriaLabel.GotoLastPage",
    "Go to the last page, page number {LAST_PAGE_NUMBER}",
    {
      LAST_PAGE_NUMBER: list.paging.maxpages,
    }
  );

  if (!list.paging.maxpages) {
    return (
      <Paging
        className={className}
        prevPage={prevPage}
        nextPage={nextPage}
        baseHref={list.selfhref}
        onChange={onChange}
      />
    );
  }

  const pages = getPageNumbers(
    list.paging.page,
    list.paging.maxpages,
    maxPagesToShow
  );

  return (
    <StyledList className={classNames("pagination", className)}>
      <li
        className={classNames("page-item first-page", {
          disabled: list.paging.page <= 1,
        })}
      >
        <PagingItemArrow
          type="first"
          baseHref={list.selfhref}
          page={1}
          isEnabled={list.paging.page > 1}
          ariaLabel={gotoFirstPageMessage}
          onClick={onChange}
        />
      </li>
      <li
        className={classNames("page-item previous-page", {
          disabled: list.paging.page <= 1,
        })}
      >
        <PagingItemArrow
          type="previous"
          baseHref={list.selfhref}
          page={prevPage}
          isEnabled={list.paging.page > 1}
          ariaLabel={gotoPreviousPageMessage}
          onClick={onChange}
        />
      </li>

      {pages.map((number) => (
        <li
          key={number}
          className={classNames("page-item", `page-${number}`, {
            active: list.paging.page === number,
          })}
        >
          <PagingItem
            baseHref={list.selfhref}
            page={number}
            isActive={list.paging.page === number}
            onClick={onChange}
          />
        </li>
      ))}

      <li
        className={classNames("page-item next-page", {
          disabled: list.paging.page >= list.paging.maxpages,
        })}
      >
        <PagingItemArrow
          type="next"
          baseHref={list.selfhref}
          page={nextPage}
          isEnabled={list.paging.page < list.paging.maxpages}
          ariaLabel={gotoNextPageMessage}
          onClick={onChange}
        />
      </li>
      <li
        className={classNames("page-item last-page", {
          disabled: list.paging.page >= list.paging.maxpages,
        })}
      >
        <PagingItemArrow
          type="last"
          baseHref={list.selfhref}
          page={list.paging.maxpages}
          isEnabled={list.paging.page < list.paging.maxpages}
          ariaLabel={gotoLastPageMessage}
          onClick={onChange}
        />
      </li>
    </StyledList>
  );
};

Pagination.displayName = "BI.Pagination";

export default Pagination;
