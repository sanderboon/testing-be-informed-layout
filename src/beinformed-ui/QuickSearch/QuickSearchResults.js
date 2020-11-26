// @flow
import { Component } from "react";

import classNames from "classnames";
import styled from "styled-components";
import { roundedCorners, spacer } from "beinformed/theme/utils";

import { Message } from "beinformed/i18n";

import { ListView } from "_component-registry/list";

import type { CaseSearchModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +search: CaseSearchModel,
  +onDocumentClick: (e: SyntheticInputEvent<*>) => void,
};

const StyledResults = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1000;

  min-width: 600px;
  max-height: 50vh;

  overflow: auto;

  background-color: #fff;

  border: 1px solid rgba(0, 0, 0, 0.125);
  border-left: 0;
  border-right: 0;

  ${roundedCorners("top-left")};

  > div > div:first-child {
    border-top: 0;
    border-radius: 0;
  }
`;

const StyledNoResults = styled(StyledResults)`
  padding: ${spacer(0.75)};
  border: 1px solid rgba(0, 0, 0, 0.125);

  ${roundedCorners("bottom-left")};
  ${roundedCorners("bottom-right")};
`;

/**
 * Render default text field
 */
class QuickSearchResults extends Component<Props> {
  /**
   * componentDidMount, sets a click handler on the document to hide search results when document is clicked
   */
  componentDidMount() {
    window.addEventListener("click", this.onDocumentClick);
  }

  /**
   * Hide search results when document is clicked
   * @param  {SyntheticEvent<*>} e - event data
   */
  onDocumentClick = (e: SyntheticInputEvent<*>) => {
    this.props.onDocumentClick(e);
  };

  render() {
    if (this.props.search.hasResults()) {
      return (
        <StyledResults
          className={classNames("quicksearch-results", this.props.className)}
        >
          <ListView list={this.props.search} openListItemInCaseView />
        </StyledResults>
      );
    }

    return (
      <StyledNoResults
        className={classNames("quicksearch-results", this.props.className)}
      >
        <Message
          id="QuickSearchResuls.Msg.NoResults"
          defaultMessage="No search results"
        />
      </StyledNoResults>
    );
  }

  /**
   * componentWillUnmount, removes document wide click event observer
   */
  componentWillUnmount() {
    window.removeEventListener("click", this.onDocumentClick);
  }
}

QuickSearchResults.displayName = "BI.QuickSearchResults";

export default QuickSearchResults;
