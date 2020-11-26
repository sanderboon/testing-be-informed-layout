// @flow
import classNames from "classnames";

import { FormattedText } from "_component-registry/text";
import { IconFromHint } from "_component-registry/icon";

import type { ListModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +list: ListModel,
  +isRoot?: boolean,
};

/**
 * Render List list
 */
const ListHeader = ({ className, list, isRoot }: Props) => {
  const TitleElement = isRoot ? "h1" : "h3";
  return (
    <div className={classNames("list-header", className)}>
      <TitleElement className="list-label">
        <IconFromHint model={list} />
        {list.label}
      </TitleElement>

      {list.introtext && (
        <FormattedText className="introtext" text={list.introtext} />
      )}
    </div>
  );
};

ListHeader.displayName = "BI.ListHeader";

export default ListHeader;
