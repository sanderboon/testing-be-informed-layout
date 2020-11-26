// @flow
import classNames from "classnames";

import { Message } from "beinformed/i18n";
import { Icon } from "_component-registry/icon";

export type Props = {
  +className?: string,
  +label: string,
  +isSearch: boolean,
};

const getMessageData = (label) => ({
  LABEL: label.toLowerCase(),
});

/**
 * Render No results text
 */
const ListNoResults = ({ className, label, isSearch }: Props) => (
  <div className={classNames("list-noresults", className)}>
    <Icon name="information-outline" textAfter />
    {isSearch ? (
      <Message
        id="ListNoResults.Msg.EnterSearchTerm"
        defaultMessage="Enter a search term to search"
      />
    ) : (
      <Message
        id="ListNoResults.Msg.NoResults"
        defaultMessage="No {LABEL} available"
        data={getMessageData(label)}
      />
    )}
  </div>
);

ListNoResults.displayName = "BI.ListNoResults";

export default ListNoResults;
