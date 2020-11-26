// @flow
import { memo } from "react";
import { isNil } from "lodash";
import { Route } from "react-router-dom";

import { Column } from "_component-registry/grid";
import { ConnectedListDetail } from "_component-registry/listdetail";

import type { ListModel } from "beinformed/models";
export type Props = {
  +list: ListModel,
  +isLargeDetail: boolean,
  +shouldBeExact?: boolean,
};

const ListDetailRoute = memo<Props>(
  ({ list, isLargeDetail, shouldBeExact }: Props) => (
    <Route
      path={`${list.selfhref.path}/:id`}
      exact={shouldBeExact}
      render={({ match }) => {
        if (!isNil(match.params.id)) {
          const listitem = list.getListItemById(match.params.id);
          if (listitem) {
            return (
              <Column
                as={ConnectedListDetail}
                size={isLargeDetail ? 7 : 5}
                href={listitem.selfhref}
                parentHref={list.selfhref}
                listitem={listitem}
                largeDetail={isLargeDetail}
              />
            );
          }
        }
        return null;
      }}
    />
  )
);

ListDetailRoute.displayName = "BI.ListDetailRoute";

export default ListDetailRoute;
