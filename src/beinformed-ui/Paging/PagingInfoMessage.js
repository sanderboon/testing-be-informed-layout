// @flow
import { Message } from "beinformed/i18n";

export type Props = {
  +hasPage: boolean,
  +totalResults: number,
  +firstItem: number,
  +lastItem: number,
};

const PagingInfoMessage = ({
  hasPage,
  totalResults,
  firstItem,
  lastItem,
}: Props) => {
  const messageData = {
    FIRSTITEM: firstItem,
    LASTITEM: lastItem,
    TOTALRESULTS: totalResults,
  };

  if (hasPage) {
    return (
      <Message
        id="PagingInfo.Information"
        data={messageData}
        defaultMessage="{FIRSTITEM} - {LASTITEM} of {TOTALRESULTS} results"
      />
    );
  }

  if (totalResults === 0) {
    return <Message id="PagingInfo.NoResults" defaultMessage="No results" />;
  }

  if (totalResults === 1) {
    return <Message id="PagingInfo.OneResult" defaultMessage="1 result" />;
  }

  return (
    <Message
      id="PagingInfo.TotalResults"
      data={messageData}
      defaultMessage="{TOTALRESULTS} results"
    />
  );
};
PagingInfoMessage.displayName = "BI.PagingInfoMessage";

export default PagingInfoMessage;
