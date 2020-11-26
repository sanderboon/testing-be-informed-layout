// @flow
import classNames from "classnames";

import {
  ListMainHeader,
  ListMainBody,
  ListMainFooter,
} from "_component-registry/list";

import type { ListModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +list: ListModel,
  +availableViews: Array<{
    type: string,
    icon: any,
    label: string,
  }>,
  +viewType: string,
  +getView: (viewProps: Object) => any,
  +onViewTypeChange: Function,
  +onUpdate: Function,
};

const LookupListMain = ({
  className,
  list,
  availableViews,
  viewType,
  getView,
  onViewTypeChange,
  onUpdate,
}: Props) => (
  <div className={classNames(className, "lookuplist-list")} data-id={list.key}>
    <ListMainHeader
      list={list}
      availableViews={availableViews}
      viewType={viewType}
      showFilters={false}
      onViewTypeChange={onViewTypeChange}
      onSortChange={onUpdate}
    />
    <ListMainBody list={list} getView={getView} />
    <ListMainFooter
      list={list}
      onPageChange={onUpdate}
      onPagesizeChange={onUpdate}
    />
  </div>
);

LookupListMain.displayName = "BI.LookupListMain";

export default LookupListMain;
