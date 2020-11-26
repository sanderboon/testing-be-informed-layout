// @flow
import { Component } from "react";

import classNames from "classnames";
import styled from "styled-components";

import { HTMLForm } from "_component-registry/form";
import {
  QuickSearchChooser,
  QuickSearchInput,
  QuickSearchResults,
} from "_component-registry/quicksearch";

import type { CaseSearchModel, Href, FilterModel } from "beinformed/models";
import type { ModularUIOptions } from "beinformed/modularui";
export type Props = {
  +className?: string,
  +search: CaseSearchModel,
  +fetchModularUI: (
    url: string | Href,
    fetchOptions?: ModularUIOptions
  ) => void,
  +push: Function,
};

type State = {
  showResults: boolean,
  searching: boolean,
  searchOption: FilterModel | null,
  searchValue: string,
  currentFilterName: string,
};

const StyledQuickSearch = styled.div`
  position: relative;
  float: right;
  margin-left: auto;
`;

const StyledForm = styled(HTMLForm)`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`;

const StyledGroup = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-flow: row wrap;
  align-items: center;
  margin-bottom: 0;
`;

/**
 * Render default text field
 */
class QuickSearch extends Component<Props, State> {
  _inputGroupClick: boolean;
  _timeout: TimeoutID;

  state: State = {
    showResults: false,
    searching: false,
    searchOption: this.getCurrentOption(),
    searchValue: "",
    currentFilterName: "",
  };

  getCurrentOption() {
    const currentFilters = this.props.search
      ? this.props.search.getQuickSearchFilters()
      : [];

    return currentFilters.length > 0 ? currentFilters[0] : null;
  }

  /**
   * When component receives props, check if this is a new search form. In that case reset searchOption
   */
  static getDerivedStateFromProps(props: Props, state: State) {
    const nextFilters = props.search
      ? props.search.getQuickSearchFilters()
      : [];
    const nextFilterName = nextFilters.length > 0 ? nextFilters[0].name : "";

    if (nextFilterName !== state.currentFilterName) {
      return {
        searchOption: nextFilters.length > 0 ? nextFilters[0] : null,
        searchValue: "",
        currentFilterName: nextFilterName,
      };
    } else if (state.searching) {
      return {
        searching: false,
      };
    }

    return null;
  }

  /**
   * Hide search results when document is clicked
   * @param  {SyntheticEvent<*>} e - event data
   */
  handleDocumentClick = (e: SyntheticInputEvent<*>) => {
    if (
      this.state.searching ||
      this._inputGroupClick ||
      (e.target.nodeName === "input" &&
        e.target.className.includes("quicksearch-input"))
    ) {
      return;
    }

    this.setState({
      showResults: false,
    });
  };

  /**
   * Don't hide results when search input is clicked
   */
  handleMouseUp = () => {
    this._inputGroupClick = false;
  };

  /**
   * Don't hide results when search input is clicked
   */
  handleMouseDown = () => {
    this._inputGroupClick = false;
  };

  /**
   * Change the term being searched for
   */
  handleTermChange = (inputvalue: string) => {
    const QUICKSEARCH_TIMEOUT = 120;

    this.setState({
      searchValue: inputvalue,
      showResults: true,
      searching: true,
    });

    clearTimeout(this._timeout);
    this._timeout = setTimeout(() => {
      this.quicksearch();
    }, QUICKSEARCH_TIMEOUT);
  };

  /**
   * Handle changed search option
   */
  handleSearchOptionChange = (option: FilterModel) => {
    const newState = {};

    if (
      this.state.searchOption !== null &&
      option.type !== this.state.searchOption.type
    ) {
      newState.searchValue = "";
    }
    newState.searchOption = this.props.search.filterCollection.getFilterByAttributeKey(
      option.attribute.key
    );
    this.setState(newState);

    if (this.state.searchValue !== "") {
      this.quicksearch();
    }
  };

  renderSearchChooser() {
    const { searchOption } = this.state;
    if (
      searchOption !== null &&
      this.props.search.getQuickSearchFilters().length > 1
    ) {
      return (
        <div className="quick-search-field">
          <QuickSearchChooser
            options={this.props.search.getQuickSearchFilters()}
            active={searchOption}
            onChange={this.handleSearchOptionChange}
          />
        </div>
      );
    }
    return null;
  }

  createSearchHref = () => {
    const newSearch = this.props.search.clone();

    newSearch.filterCollection.reset();
    if (this.state.searchOption) {
      newSearch.filterCollection.update(
        this.state.searchOption.attribute,
        this.state.searchValue
      );
    }

    if (!newSearch.filterCollection.isValid) {
      return null;
    }

    const searchHref = newSearch.selfhref;

    searchHref.page = 1;
    searchHref.filterCollection = newSearch.filterCollection;

    return searchHref;
  };

  quicksearch = () => {
    const searchHref = this.createSearchHref();

    if (searchHref) {
      return this.props.fetchModularUI(searchHref, { propName: "search" });
    }

    return false;
  };

  handleSubmit = () => {
    const searchHref = this.createSearchHref();

    if (searchHref) {
      return this.props.push(searchHref.toString());
    }

    return false;
  };

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const { className, search } = this.props;

    if (search && search.hasQuickSearchFilters()) {
      return (
        <StyledQuickSearch className={classNames("quicksearch", className)}>
          <StyledForm
            method="get"
            name="quicksearch"
            action={this.props.search.selfhref}
            onSubmit={this.handleSubmit}
          >
            {this.renderSearchChooser()}
            <StyledGroup>
              <QuickSearchInput
                searchOption={this.state.searchOption}
                value={this.state.searchValue}
                onChange={this.handleTermChange}
              />
            </StyledGroup>
            {this.state.showResults && (
              <QuickSearchResults
                search={this.props.search}
                onDocumentClick={this.handleDocumentClick}
              />
            )}
          </StyledForm>
        </StyledQuickSearch>
      );
    }
    return null;
  }
}

QuickSearch.displayName = "BI.QuickSearch";

export default QuickSearch;
