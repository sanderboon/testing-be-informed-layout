// @flow
import { useState } from "react";

import classNames from "classnames";
import styled, { css } from "styled-components";
import { themeProp, spacer } from "beinformed/theme/utils";

import { BASE } from "beinformed/constants/Constants";
import { Icon } from "_component-registry/icon";
import { Link } from "_component-registry/link";

import { Href } from "beinformed/models";

import type { Node } from "react";
import type { ContentLinkModel } from "beinformed/models";
export type Props = {
  +children?: Node,
  +className?: string,
  +link: ContentLinkModel,
  +isActive?: boolean,
  +isTOC?: boolean,
};

const StyledItem = styled.li`
  ${(props) =>
    props.isTOC &&
    css`
      padding-left: ${spacer(1.25)};
      position: relative;

      > span {
        position: absolute;
        left: 0;
        top: 1px;
      }

      a {
        color: ${themeProp("PRIMARY_LINK_COLOR")};
      }
    `}
`;

const StyledContentIcon = styled.img`
  max-width: 100%;
  max-height: 100%;

  margin-right: ${spacer(0.4)};

  ${({ size }) =>
    size &&
    css`
      width: ${size};
      height: ${size};
    `}
`;

/**
 * Renders a link to content
 */
const ContentLink = ({ className, isActive, link, children, isTOC }: Props) => {
  const [visible, setVisible] = useState(false);

  const handleVisibility = (e) => {
    if (e.key && (e.key !== "Enter" || e.key !== " ")) {
      return;
    }

    const isVisible = visible || isActive;
    setVisible(!isVisible);
  };

  return (
    <StyledItem className={classNames("content-link", className)} isTOC={isTOC}>
      {children && (
        <span
          tabIndex="0"
          role="button"
          onClick={handleVisibility}
          onKeyDown={handleVisibility}
        >
          <Icon name={visible ? "minus-box-outline" : "plus-box-outline"} />
        </span>
      )}
      <Link
        className="content-link"
        dataId={link.key || link.label}
        href={new Href(`/modelcatalog${link.encodedHref.toString()}`)}
        isActive={isActive}
      >
        {link.contentType && link.contentType.icon && (
          <StyledContentIcon
            className="content-icon"
            src={`${BASE}${link.contentType.icon}`}
            alt={`Icon of ${link.contentType.label}`}
            size="16px"
          />
        )}
        {link.sourceLabel && `${link.sourceLabel}: `}
        {link.label}
      </Link>
      {visible && children}
    </StyledItem>
  );
};

ContentLink.displayName = "BI.ContentLink";

export default ContentLink;
