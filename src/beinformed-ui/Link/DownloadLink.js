// @flow
import download from "downloadjs";

import xhr from "beinformed/utils/fetch/xhr";

import classNames from "classnames";
import styled from "styled-components";

import type { Node } from "react";
import type { Href } from "beinformed/models";
export type Props = {
  +ariaLabel?: string,
  +children?: Node,
  +className?: string,
  +dataId?: string | number,
  +href: Href,
  +title?: string,
  +isDisabled?: boolean,
  +style?: Object,
  +fileName: string,
  +onBlur?: (e: SyntheticEvent<*>) => void,
  +onEnter?: (e: SyntheticEvent<*>) => void,
  +onFocus?: (e: SyntheticEvent<*>) => void,
  +onLeave?: (e: SyntheticEvent<*>) => void,
};

const StyledLink = styled.span`
  cursor: pointer;
  text-decoration: underline;
`;

const DownloadLink = ({
  className,
  href,
  style,
  dataId,
  isDisabled,
  ariaLabel,
  title,
  children,
  fileName,
  onEnter,
  onLeave,
  onBlur,
  onFocus,
}: Props) => {
  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();

    xhr({
      url: href.absolutehref,
      responseType: "blob",
    }).then((response) => {
      download(response, fileName, response.type);
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleClick(e);
    }
  };

  return (
    <StyledLink
      className={classNames(className, "download-link")}
      style={style}
      data-href={href.absolutehref}
      data-id={dataId}
      disabled={isDisabled}
      aria-label={ariaLabel}
      tabIndex={0}
      role="link"
      title={title}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onBlur={onBlur}
      onFocus={onFocus}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </StyledLink>
  );
};

DownloadLink.displayName = "BI.DownloadLink";

export default DownloadLink;
