// @flow
import styled from "styled-components";
import { themeProp, spacer, roundedCorners } from "beinformed/theme/utils";

import { Message } from "beinformed/i18n";

import { IS_DEVELOPMENT } from "beinformed/constants/Constants";

import { Heading, StyledButton } from "_component-registry/elements";

import type { DismissNotificationAction } from "beinformed/redux";
import type { ErrorResponse } from "beinformed/models";
export type Props = {
  +className?: string,
  +message: Object,
  +error: ErrorResponse,
  +onDismiss: () => DismissNotificationAction,
};

const StyledErrorOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;

  background: ${themeProp("GREY_200")};
  z-index: 9999;

  overflow: auto;
`;

const StyledErrorNotification = styled.div`
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translate(-50%);
  width: 800px;

  background: #fff;
  padding: ${spacer(2)};

  ${roundedCorners()};
  box-shadow: ${themeProp("PANEL_SHADOW")};
`;

const StyledErrorMessage = styled.h3`
  font-size: ${themeProp("FONT_SIZE_BASE")};
  font-weight: ${themeProp("FONT_WEIGHT_BASE")};
`;

const StyledTrace = styled.div`
  overflow: auto;
  max-height: 150px;
  background: #fff;
  padding: ${spacer(0.5)};
  border: 1px solid ${themeProp("GREY_300")};
  ${roundedCorners()};
  font-size: 85%;
  line-height: 1.45;

  > pre {
    overflow: visible;
    margin-bottom: 0;
  }
`;

const StyledMessage = styled(StyledTrace)`
  margin-bottom: ${spacer()};
`;

const StyledMessageLabel = styled.div`
  font-style: italic;
`;

const StyledInformation = styled.div`
  margin-bottom: ${spacer()};
`;

const ErrorNotification = ({ className, message, error, onDismiss }: Props) => {
  const isDevelopment =
    IS_DEVELOPMENT ||
    location.hostname === "localhost" ||
    location.hostname === "127.0.0.1" ||
    location.hostname.startsWith("buildlane");

  return (
    <StyledErrorOverlay className={className}>
      <StyledErrorNotification className="error-notification">
        <Heading as="h2" className="error-message">
          <Message
            className="msg"
            id={message.id}
            defaultMessage={message.defaultMessage}
            data={message.properties}
          />
        </Heading>
        <StyledInformation>
          {isDevelopment && (
            <StyledErrorMessage>
              {error.status} - {error.id}
            </StyledErrorMessage>
          )}
          {error.properties.message && <p>{error.properties.message}</p>}
          {isDevelopment && error.response && (
            <div>
              {error.error.requestOptions && (
                <StyledMessageLabel>
                  {`${error.error.requestOptions.method} - ${error.error.requestOptions.url}`}
                </StyledMessageLabel>
              )}
              <StyledMessage>
                <pre>{JSON.stringify(error.response, null, 4)}</pre>
              </StyledMessage>
            </div>
          )}
          {isDevelopment && (
            <StyledTrace>
              <pre>{error.error.stack}</pre>
            </StyledTrace>
          )}
        </StyledInformation>
        <StyledButton onClick={onDismiss} className="btn-close-error">
          Close
        </StyledButton>
      </StyledErrorNotification>
    </StyledErrorOverlay>
  );
};

ErrorNotification.displayName = "BI.ErrorNotification";

export default ErrorNotification;
