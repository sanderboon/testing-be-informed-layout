// @flow
import { Component } from "react";
import classNames from "classnames";

import { connector } from "beinformed/connectors/Progress";
import { LookupList } from "_component-registry/lookup-list";

import { LookupOptions, LookupReadonly } from "_component-registry/lookup";

import { ChoiceAttributeOptionModel, ListItemModel } from "beinformed/models";

import type {
  LinkModel,
  ContentConfigurationElements,
} from "beinformed/models";
export type Props = {
  +className?: string,
  +disabled?: boolean,
  +isMultiple: boolean,
  +lookupLink: LinkModel,
  +lookupList: $Shape<{
    link: LinkModel,
    label: string,
    isTable: boolean,
  }>,
  +name: string,
  +optionContentConfiguration?: ContentConfigurationElements,
  +options: Array<ChoiceAttributeOptionModel>,
  +readOnly?: boolean,
  +onValueChange: (value: any) => void,
};

type State = {
  activeOptions: Array<ChoiceAttributeOptionModel>,
  showLookupList: boolean,
};

/**
 * Render lookup input
 */
class LookupInput extends Component<Props, State> {
  _timeout: TimeoutID;
  _focusedElementBeforeOpen: ?HTMLElement;

  static defaultProps = {
    options: [],
    lookupList: {},
  };

  state: State = {
    activeOptions: this.props.options,
    showLookupList: false,
  };

  handleSelectLookupOption = (option: ChoiceAttributeOptionModel) => {
    if (!option) {
      return;
    }

    const options = Array.isArray(this.state.activeOptions)
      ? this.state.activeOptions
      : this.state.activeOptions.all;

    this.setState({
      activeOptions: [...options, option],
    });

    this.props.onValueChange(option);
  };

  handleOpenLookupList = (e: SyntheticMouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    this.setState({
      showLookupList: true,
    });
  };

  handleCloseLookupList = () => {
    this.setState({
      showLookupList: false,
    });
  };

  handleSelectLookupList = (selectedItems: Array<ListItemModel>) => {
    const activeOptions = selectedItems.map((selectedItem) =>
      ChoiceAttributeOptionModel.createFromListItemModel(selectedItem)
    );

    // first deselect all existing options
    this.state.activeOptions.forEach((activeOption) => {
      this.props.onValueChange(activeOption);
    });

    activeOptions.forEach((activeOption) => {
      this.props.onValueChange(activeOption);
    });

    this.setState({
      showLookupList: false,
      activeOptions,
    });
  };

  render() {
    /**
     * Combine options available in component state with the options available in the attribute model,
     * where the options in the attribute model are leading, because these are the configured options retrieved from the modular ui
     */
    const activeOptions = [];
    this.props.options
      .filter((option) => option.selected)
      .forEach((option) => {
        const foundOption = this.state.activeOptions.find(
          (activeOption) => activeOption && activeOption.equals(option)
        );

        if (foundOption) {
          activeOptions.push(foundOption);
        }
      });

    return (
      <div className={classNames("lookup-input", this.props.className)}>
        {this.props.lookupLink ? (
          <LookupOptions
            name={this.props.name}
            isMultiple={this.props.isMultiple}
            activeOptions={activeOptions}
            readOnly={this.props.readOnly}
            disabled={this.props.disabled}
            optionContentConfiguration={this.props.optionContentConfiguration}
            lookupLink={this.props.lookupLink}
            lookupListLink={this.props.lookupList.link}
            onSelect={this.handleSelectLookupOption}
            onOpenLookupList={this.handleOpenLookupList}
          />
        ) : (
          <LookupReadonly
            isMultiple={this.props.isMultiple}
            activeOptions={activeOptions}
            optionContentConfiguration={this.props.optionContentConfiguration}
            lookupListLink={this.props.lookupList.link}
            lookupListLabel={this.props.lookupList.label}
            onOpenLookupList={this.handleOpenLookupList}
          />
        )}
        {this.state.showLookupList && (
          <LookupList
            label={this.props.lookupList.label}
            link={this.props.lookupList.link}
            activeOptions={activeOptions}
            isMultiple={this.props.isMultiple}
            isTable={this.props.lookupList.isTable}
            onClose={this.handleCloseLookupList}
            onSelect={this.handleSelectLookupList}
          />
        )}
      </div>
    );
  }
}

LookupInput.displayName = "BI.LookupInput";

export default connector(LookupInput);
