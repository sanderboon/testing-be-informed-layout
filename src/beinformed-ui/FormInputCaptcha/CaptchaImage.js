// @flow
import classNames from "classnames";

import styled from "styled-components";
import { themeProp, roundedCorners, spacer } from "beinformed/theme/utils";

import { Icon } from "_component-registry/icon";
import { Button } from "_component-registry/buttons";

export type Props = {
  +className?: string,
  +image?: string | null,
  +onRefresh: Function,
};

const StyledWrapper = styled.div`
  position: relative;
  padding: ${spacer()};
  margin-bottom: ${spacer(0.25)};
  border: 1px solid #ccc;
  ${roundedCorners()};
`;
const StyledImage = styled.img`
  min-height: 50px;
`;
const StyledButton = styled(Button)`
  position: absolute;
  top: ${spacer(0.5)};
  right: ${spacer(0.5)};
  font-size: ${themeProp("FONT_SIZE_SMALL", "0.875rem")};
`;

const CaptchaImage = ({ image, onRefresh, className }: Props) => {
  if (image) {
    return (
      <StyledWrapper className={classNames("captcha-image", className)}>
        <StyledImage alt="Captcha" src={`data:image/png;base64,${image}`} />
        <StyledButton
          className="btn-captcha-refresh"
          aria-label="Refresh captcha"
          onClick={onRefresh}
        >
          <Icon name="refresh" />
        </StyledButton>
      </StyledWrapper>
    );
  }

  return null;
};

CaptchaImage.displayName = "BI.CaptchaImage";

export default CaptchaImage;
