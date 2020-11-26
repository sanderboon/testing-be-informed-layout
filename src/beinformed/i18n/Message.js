// @flow
import { memo } from "react";
import styled from "styled-components";

import useMessage from "./useMessage";

type MessageProps = {
  +className?: string,
  +id?: string | null,
  +defaultMessage?: string | null,
  +children?: string,
  +data?: Object | null,
  +screenreaderOnly?: boolean,
  +allowHTML?: boolean,
};

const StyledScreenreaderMessage = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

/**
 * Message React component
 */
const Message = memo<MessageProps>(
  ({
    className,
    id,
    defaultMessage,
    children,
    data,
    screenreaderOnly = false,
    allowHTML = false,
  }: MessageProps) => {
    const translatedMessage = useMessage(id, defaultMessage || children, data);

    if (screenreaderOnly) {
      return (
        <StyledScreenreaderMessage className={className}>
          {translatedMessage}
        </StyledScreenreaderMessage>
      );
    }

    if (allowHTML) {
      return (
        <span
          className={className}
          dangerouslySetInnerHTML={{
            __html: translatedMessage,
          }}
        />
      );
    }

    return <span className={className}>{translatedMessage}</span>;
  }
);

Message.displayName = "BI.Message";

export default Message;
