// @flow
import { Component } from "react";

import classNames from "classnames";
import styled from "styled-components";
import { themeProp, spacer } from "beinformed/theme/utils";

import { BASE, KEYCODES } from "beinformed/constants/Constants";
import { Href } from "beinformed/models";

export type Props = {
  +className?: string,
  +body: string,
  +label: string,
  +number: string,
  +renderSectionLabel?: boolean,
  +sourceHref: Href,
  +onContentClick?: (href: Href, tocOnly: boolean) => void,
};

const StyledBody = styled.div`
  table {
    margin-bottom: ${spacer()};
  }

  h2 {
    margin-bottom: ${themeProp("HEADING_MARGIN_BOTTOM", "0.5rem")};
    color: ${themeProp("HEADING_COLOR", "0.5rem")};

    font-family: ${themeProp("HEADING_FONT_FAMILY")};
    font-weight: ${themeProp("HEADING_FONT_WEIGHT", "500")};
    font-size: ${themeProp("FONT_SIZE_H2", "1.5rem")};
    line-height: ${themeProp("HEADING_LINE_HEIGHT", "1.2")};
  }

  h4.label {
    font-size: ${themeProp("FONT_SIZE_H4")};
    font-weight: ${themeProp("HEADING_FONT_WEIGHT")};
    color: ${themeProp("HEADER_COLOR")};
  }
`;

/**
 * Content body
 */
class ContentBody extends Component<Props> {
  /**
   * Handle click on body
   */
  handleClick = (e: SyntheticEvent<*>) => {
    const element = e.target;

    if (
      element instanceof HTMLAnchorElement &&
      element.href &&
      location.hostname === element.hostname
    ) {
      e.preventDefault();

      const elementHref = new Href(element.href);

      if (
        this.props.sourceHref.equals(elementHref) &&
        elementHref.hash !== ""
      ) {
        const scrollTo = document.querySelector(`#${elementHref.hash}`);
        if (scrollTo) {
          scrollTo.scrollIntoView();
        }
      } else if (elementHref.isContent && this.props.onContentClick) {
        return this.props.onContentClick(elementHref, true);
      }
    }

    return true;
  };

  /**
   * Handle key down
   */
  handleKeyDown = (e: SyntheticKeyboardEvent<*>) => {
    if ([KEYCODES.SPACE, KEYCODES.ENTER].includes(e.keyCode)) {
      this.handleClick(e);
    }
  };

  removeEmptyLinks(body: string) {
    return body
      ? body.replace(/<a href="".*?>(?<text>.*?)<\/a>/giu, "$<text>")
      : "";
  }

  correctEmptyLinks(body: string) {
    return body.replace(
      /\s(?<attribute>src|href)="\/(?<urlStart>resource|content|concept)/giu,
      ` $<attribute>="${BASE}/$<urlStart>`
    );
  }

  addTableClass(body: string) {
    return body.replace(/<table>/giu, '<table class="table">');
  }

  renderNumberInTitle(body: string, label: string, number: string) {
    if (this.props.renderSectionLabel && label) {
      return `<h4 class="label">${
        number ? `${number} ` : ""
      }${label}</h4>${body}`;
    } else if (number) {
      /*
       * when body starts with html tag, then put number after first > of html tag,
       * so that <p>text</p> becomes <p>number. text</p> or <h2>title</h2> becomes <h2>number. title</h2>
       */
      return body.startsWith("<")
        ? body.replace(">", `>${number} `)
        : `${number} ${body}`;
    }

    return body;
  }

  /**
   * Rewrite links inside body text
   */
  createBody = () => {
    const { body, label, number } = this.props;

    let newBody = body;

    newBody = this.removeEmptyLinks(newBody);
    newBody = this.correctEmptyLinks(newBody);
    newBody = this.addTableClass(newBody);
    newBody = this.renderNumberInTitle(newBody, label, number);

    return {
      __html: newBody,
    };
  };

  render() {
    const { className } = this.props;

    return (
      <StyledBody
        className={classNames("content-body", className)}
        dangerouslySetInnerHTML={this.createBody()}
        role="article"
        tabIndex="-1"
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}

ContentBody.displayName = "BI.ContentBody";

export default ContentBody;
