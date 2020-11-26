// @flow
import { createRef, PureComponent } from "react";

import { MissingPropertyException } from "beinformed/exceptions";
import { withModularUI } from "beinformed/modularui";

import { KEYCODES } from "beinformed/constants/Constants";

import { LookupOptionsView } from "_component-registry/lookup";

import { Href } from "beinformed/models";

import type {
  LinkModel,
  ContentConfigurationElements,
  ChoiceAttributeOptionModel,
  LookupOptionsModel,
} from "beinformed/models";
export type Props = {
  +disabled?: boolean,
  +isMultiple: boolean,
  +lookupLink: LinkModel,
  +lookupListLink: LinkModel,
  +name: string,
  +optionContentConfiguration?: ContentConfigurationElements,
  +options?: Array<ChoiceAttributeOptionModel>,
  +activeOptions: Array<ChoiceAttributeOptionModel>,
  +readOnly?: boolean,
  +handleError: (err: Error) => void,
  +finishProgress: () => void,
  +startProgress: () => void,
  +onOpenLookupList: Function,
  +onSelect: (option: ChoiceAttributeOptionModel) => void,
  +modularui: Function,
};

type State = {
  filterInput: string,
  lookupOptions: ?LookupOptionsModel,
  showOptions: boolean,
  inProgress: boolean,
  highlightedOption: ChoiceAttributeOptionModel | null,
};

/**
 * Render lookup input
 */
class LookupOptions extends PureComponent<Props, State> {
  _timeout: TimeoutID;
  _focusedElementBeforeOpen: ?HTMLElement;

  _lookup = createRef<any>();

  static defaultProps = {
    options: [],
  };

  state: State = {
    filterInput: "",
    lookupOptions: null,
    showOptions: false,
    inProgress: false,
    highlightedOption: null,
  };

  /**
   * componentWillUnmount, removes document wide click event observer
   */
  componentWillUnmount() {
    window.removeEventListener("mousedown", this.hideDropdown);
  }

  setShowOptions(showOptions: boolean) {
    if (this.state.showOptions !== showOptions) {
      this.setState({
        showOptions,
      });

      if (showOptions) {
        window.addEventListener("mousedown", this.hideDropdown);
      } else {
        window.removeEventListener("mousedown", this.hideDropdown);
      }
    }
  }

  /**
   * Handles a click on the lookup search button
   */
  handleLookupButton = (e: SyntheticEvent<*>) => {
    e.preventDefault();

    this.doLookup(this.state.filterInput);
  };

  /**
   * Handles typing in the filter input
   */
  handleLookup = ({
    target: { value },
  }: SyntheticInputEvent<HTMLInputElement>) => {
    const LOOKUP_TIMEOUT = 120;

    this.setState({
      filterInput: value,
      inProgress: true,
    });

    this.setShowOptions(true);

    clearTimeout(this._timeout);
    this._timeout = setTimeout(() => {
      this.doLookup(value);
    }, LOOKUP_TIMEOUT);
  };

  /**
   * Handle keydown on lookup button, when escape or tab hide drodown
   */
  handleLookupButtonKeyDown = (e: SyntheticKeyboardEvent<*>) => {
    if (e.keyCode === KEYCODES.ESCAPE || e.keyCode === KEYCODES.TAB) {
      this.hideDropdown();
    }
  };

  /**
   * Handles a click on one of the found options
   * @param  {Object} option - Code being clicked
   */
  handleOptionClick = (option) => {
    if (!option) {
      return;
    }

    this.props.onSelect(option);

    if (this.props.isMultiple) {
      this.setState({
        filterInput: "",
        lookupOptions: null,
      });

      if (this._lookup.current) {
        this._lookup.current.focus();
      }
    } else {
      this.hideDropdown();
    }
  };

  handleUpDownKeys({ keyCode }) {
    if (!this.state.lookupOptions) {
      return;
    }

    const { options } = this.state.lookupOptions;

    if (
      (keyCode === KEYCODES.ARROW_UP || keyCode === KEYCODES.ARROW_DOWN) &&
      options.hasItems
    ) {
      let newHighlightedOptionIndex = 0;

      if (this.state.highlightedOption !== null) {
        const highlightedOptionIndex = options.all.findIndex(
          (option) =>
            this.state.highlightedOption !== null &&
            option.equals(this.state.highlightedOption)
        );

        if (
          keyCode === KEYCODES.ARROW_DOWN &&
          highlightedOptionIndex < options.length - 1
        ) {
          newHighlightedOptionIndex = highlightedOptionIndex + 1;
        } else if (
          keyCode === KEYCODES.ARROW_UP &&
          highlightedOptionIndex > 0
        ) {
          newHighlightedOptionIndex = highlightedOptionIndex - 1;
        } else if (keyCode === KEYCODES.ARROW_UP) {
          newHighlightedOptionIndex = options.length - 1;
        }
      }

      this.setState({
        highlightedOption: options.all[newHighlightedOptionIndex],
      });
    }
  }

  handleEnterKey({ keyCode }) {
    if (!this.state.lookupOptions) {
      return;
    }

    const { options } = this.state.lookupOptions;

    if (
      keyCode === KEYCODES.ENTER &&
      (options.hasItems || this.state.highlightedOption !== null)
    ) {
      const highlightedOption =
        this.state.highlightedOption === null
          ? options.first
          : this.state.highlightedOption;

      this.handleOptionClick(highlightedOption);

      this.handleFocus();
    }
  }

  handleEscapeKey(e) {
    if (e.keyCode === KEYCODES.ESCAPE) {
      e.preventDefault();
      this.hideDropdown();

      this.handleFocus();
    }
  }

  /**
   * Handles arrow key down and up
   */
  handleInputKeyDown = (e: SyntheticKeyboardEvent<HTMLInputElement>) => {
    this.handleUpDownKeys(e);
    this.handleEnterKey(e);
    this.handleEscapeKey(e);
  };

  /**
   * Handles click on 'input'
   */
  handleOpen = () => {
    if (this.props.readOnly || this.props.disabled || this.state.showOptions) {
      return;
    }

    this._focusedElementBeforeOpen = document.activeElement;
    this.setShowOptions(true);

    const FOCUS_TIMEOUT = 10;

    setTimeout(() => {
      if (this._lookup.current) {
        this._lookup.current.focus();
      }
    }, FOCUS_TIMEOUT);
  };

  /**
   * Handle focus on list of selected items, open list of options when an option is selected
   */
  handleFocus = () => {
    if (
      this.props.options &&
      this.props.options.some((option) => option.selected)
    ) {
      this.handleOpen();
    }
  };

  /**
   * Handle keydown on list of selected items
   * @param  {SytheticEvent} e - event data
   */
  handleKeyDown = (e) => {
    if (e.keyCode === KEYCODES.SPACE && !this.state.showOptions) {
      e.preventDefault();
      this.handleOpen();
    }
  };

  /**
   * Handles removal of previously selected options
   * @param  {Object} option - Code of option to remove
   */
  handleActiveOptionRemoval = (option) => {
    this.props.onSelect(option);
  };

  /**
   * Hide children of dropdown, removes document wide click event observer
   * @param  {SytheticEvent} e - event data
   */
  hideDropdown = (e) => {
    if (e && this._lookup.current && this._lookup.current.contains(e.target)) {
      return;
    }

    this.setState({
      filterInput: "",
      lookupOptions: null,
    });

    this.setShowOptions(false);
  };

  /**
   * Handles the actual lookup
   * @param  {string} filterInput - input to search for
   */
  doLookup(filterInput) {
    const {
      startProgress,
      finishProgress,
      handleError,
      modularui,
      lookupLink,
    } = this.props;

    if (lookupLink === null) {
      throw new MissingPropertyException(
        "No lookup link specified, this is required to do a lookup"
      );
    }

    startProgress();

    if (filterInput.trim() === "") {
      this.setState({
        filterInput: "",
        lookupOptions: null,
        inProgress: false,
      });
      finishProgress();
    } else {
      const lookupHref = new Href(lookupLink.href);
      lookupHref.addParameter(lookupLink.filterName, filterInput);

      modularui(lookupHref)
        .fetch()
        .then((lookupOptions) => {
          this.setState({
            lookupOptions,
            inProgress: false,
          });

          finishProgress();
        })
        .catch((error) => handleError(error));

      this.setState({
        filterInput,
      });
    }
  }

  render() {
    return (
      <LookupOptionsView
        ref={this._lookup}
        name={this.props.name}
        showOptions={this.state.showOptions}
        isMultiple={this.props.isMultiple}
        activeOptions={this.props.activeOptions}
        readOnly={this.props.readOnly}
        disabled={this.props.disabled}
        optionContentConfiguration={this.props.optionContentConfiguration}
        filterInput={this.state.filterInput}
        inProgress={this.state.inProgress}
        lookupOptions={this.state.lookupOptions}
        lookupLink={this.props.lookupLink}
        lookupListLink={this.props.lookupListLink}
        highlightedOption={this.state.highlightedOption}
        onActiveOptionRemoval={this.handleActiveOptionRemoval}
        onOpen={this.handleOpen}
        onFocus={this.handleFocus}
        onKeyDown={this.handleKeyDown}
        onLookup={this.handleLookup}
        onInputKeyDown={this.handleInputKeyDown}
        onLookupButton={this.handleLookupButton}
        onLookupButtonKeyDown={this.handleLookupButtonKeyDown}
        onOptionClick={this.handleOptionClick}
        onOpenLookupList={this.props.onOpenLookupList}
      />
    );
  }
}

LookupOptions.displayName = "BI.LookupOptions";

export default withModularUI(LookupOptions);
