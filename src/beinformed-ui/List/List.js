// @flow
import { Route, Switch } from "react-router-dom";

import classNames from "classnames";

import { SHOW_ONE_RESULT_AS_DETAIL } from "beinformed/constants/LayoutHints";

import { DetailPanel } from "_component-registry/detailpanel";
import {
  ListHeader,
  ListMain,
  ListDetailRoute,
  ListFilters,
} from "_component-registry/list";
import { ConnectedPanelRenderer } from "_component-registry/panelrenderer";
import { Row, Column } from "_component-registry/grid";
import { FormRoute } from "_component-registry/routes";

import { Href } from "beinformed/models";

import type { ListModel } from "beinformed/models";
export type Props = {
  +list: ListModel,
  +className?: string,
  +viewType?: string,
  +isRoot?: boolean,
  +showFilters?: boolean,
};

/**
 * Render a list
 */
const List = ({ className, list, viewType, isRoot }: Props) => {
  // this is arbitrary, but when a list has many attributes on the list,
  // make more room for them by creating a smaller detail
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
    <Switch>
      <Route
        path={list.listItemCollection.additionalDetailRoutePath}
        render={({ match, location }) => (
          <ConnectedPanelRenderer
            href={new Href(match.url)}
            querystring={location.search}
            match={match}
          />
        )}
      />

      <Route>
        <div
          className={classNames("list", className)}
          data-id={list.key}
          data-totalitems={list.paging.totalResults}
        >
          <ListHeader list={list} isRoot={isRoot} />
          {showAsDetail && list.detail ? (
            <DetailPanel className="list-detail" detail={list.detail} />
          ) : (
            <Row className="list-body" nowrap>
              {showFilters && <Column as={ListFilters} size={2} list={list} />}

              <ListMain list={list} viewType={viewType} isRoot={isRoot} />

              <FormRoute model={list} />
              <ListDetailRoute list={list} isLargeDetail={largeDetail} />
            </Row>
          )}
        </div>
      </Route>
    </Switch>
  );
};

List.displayName = "BI.List";

export default List;
