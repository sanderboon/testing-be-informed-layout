// @flow
import { Message } from "beinformed/i18n";
import { memoize } from "lodash";

import {
  Dropdown,
  DropdownButton,
  DropdownChildren,
  DropdownLink,
} from "_component-registry/dropdown";

import { ListHref } from "beinformed/models";

import classNames from "classnames";

import type { ListModel } from "beinformed/models";
export type Props = {
  +align: "left" | "right",
  +className: string,
  +direction: "down" | "up",
  +list: ListModel,
  +size: "small" | "large" | "default",
  +onChange?: Function,
};

const getMessageData = memoize((pagesize: number) => ({ PAGESIZE: pagesize }));

/**
 * Render pagesize chooser
 */
const PagesizeChooser = ({
  list,
  className,
  align,
  direction,
  size,
  onChange,
}: Props) => {
  const maxPageSize = list.paging.totalResults;
  const sizeOptions = list.paging.pagesize.options.filter(
    (option, i, arr) =>
      maxPageSize === -1 || option < maxPageSize || arr[i - 1] < maxPageSize
  );

  return (
    <Dropdown
      className={classNames("pagesizechooser", className)}
      direction={direction}
      activeValue={list.paging.pagesize.value.toString()}
    >
      <DropdownButton size={size}>
        <Message
          id="PagesizeChooser.PageSize"
          defaultMessage="Page size: {PAGESIZE}"
          data={getMessageData(list.paging.pagesize.value)}
        />
      </DropdownButton>
      <DropdownChildren align={align}>
        {sizeOptions.map((option) => {
          const pagesizeHref: ListHref = new ListHref(list.selfhref);

          pagesizeHref.pagesize = option;
          pagesizeHref.page = 1;

          return (
            <DropdownLink
              key={option.toString()}
              value={option.toString()}
              href={pagesizeHref}
              isActive={list.paging.pagesize.value === option}
              onClick={onChange}
            >
              {option.toString()}
            </DropdownLink>
          );
        })}
      </DropdownChildren>
    </Dropdown>
  );
};

PagesizeChooser.displayName = "BI.PagesizeChooser";

export default PagesizeChooser;
