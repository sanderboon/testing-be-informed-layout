// @flow
import classNames from "classnames";

import { ListHref } from "beinformed/models";

import { PagingButton } from "_component-registry/paging";
import { Link } from "_component-registry/link";

import { useMessage } from "beinformed/i18n";

import type { Href } from "beinformed/models";
export type Props = {
  +className?: string,
  +baseHref: Href,
  +page: number,
  +isActive: boolean,
  +onClick?: Function,
};

/**
 * Paging item
 */
const PagingItem = ({
  className,
  baseHref,
  page,
  isActive,
  onClick,
}: Props) => {
  const pageHref = new ListHref(baseHref);
  pageHref.page = page;

  return (
    <PagingButton
      as={Link}
      size="SMALL"
      className={classNames("page-link", className)}
      href={pageHref}
      ariaLabel={useMessage(
        "PagingItem.AriaLabel.GotoPage",
        "Go to page {PAGE_NUMBER}",
        {
          PAGE_NUMBER: page,
        }
      )}
      isActive={isActive}
      isOutlineButton
      onClick={onClick}
    >
      {page}
    </PagingButton>
  );
};

PagingItem.displayName = "BI.PagingItem";

export default PagingItem;
