// @flow
import classNames from "classnames";

import { DetailPanel } from "_component-registry/detailpanel";
import {
  ListHeader,
  ListMain,
  ListDetailRoute,
  ListFilters,
} from "_component-registry/list";
import { Row, Column } from "_component-registry/grid";
import { FormRoute } from "_component-registry/routes";

import { ListModel } from "beinformed/models";

import { SHOW_ONE_RESULT_AS_DETAIL } from "beinformed/constants/LayoutHints";

export type Props = {
  +list: ListModel,
  +className?: string,
  +viewType?: string,
  +isRoot?: boolean,
};

/**
 * Body of a list
 */
const ListBody = ({ className, list, viewType, isRoot }: Props) => {
  const SMALL_AMOUNT_OF_COLUMNS_NUMBER = 4;
  const largeDetail = list.headers.length < SMALL_AMOUNT_OF_COLUMNS_NUMBER;

  const showAsDetail =
    list.layouthint.has(SHOW_ONE_RESULT_AS_DETAIL) &&
    list.listItemCollection.length === 1;

  const showFilters =
    list.type === "CaseSearch" ||
    (list.filterCollection.hasItems &&
      (list.hasResults() || list.isFiltered()));

  return (
    <div className={classNames("list", className)} data-id={list.key}>
      <ListHeader list={list} isRoot={isRoot} />
      {showAsDetail && list.detail ? (
        <DetailPanel className="list-detail" detail={list.detail} />
      ) : (
        <Row className="list-body" nowrap>
          {showFilters && <Column as={ListFilters} size={2} list={list} />}

          <ListMain list={list} viewType={viewType} />

          <FormRoute model={list} />
          <ListDetailRoute list={list} isLargeDetail={largeDetail} />
        </Row>
      )}
    </div>
  );
};

ListBody.displayName = "BI.ListBody";

export default ListBody;
