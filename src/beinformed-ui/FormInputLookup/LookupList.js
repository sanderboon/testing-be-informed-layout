// @flow
import { Component } from "react";
import { createPortal } from "react-dom";

import { ListView, TableView } from "_component-registry/list";
import { LookupListView } from "_component-registry/lookup-list";

import { withModularUI } from "beinformed/modularui";

import { ListItemModel } from "beinformed/models";
import type {
  LinkModel,
  ChoiceAttributeOptionModel,
  ListModel,
  Href,
} from "beinformed/models";
export type Props = {
  +link: LinkModel,
  +label: string,
  +activeOptions: Array<ChoiceAttributeOptionModel>,
  +isMultiple: boolean,
  +isTable?: boolean,
  +onClose: Function,
  +onSelect: Function,
  +modularui: Function,
  +handleError: (err: Error) => void,
  +finishProgress: () => void,
  +startProgress: () => void,
};

type State = {
  list: ?ListModel,
  viewType: string,
  selectedItems: Array<ListItemModel>,
};

class LookupList extends Component<Props, State> {
  _portal: any;

  state: State = {
    list: null,
    viewType: this.props.isTable ? "TableView" : "ListView",
    selectedItems: [],
  };

  get token() {
    return this.props.link.href.getParameter("lookupToken").value;
  }

  componentDidMount() {
    this._portal = document.querySelector("#portal");

    const selectedItems = this.props.activeOptions.map((activeOption) =>
      ListItemModel.createFromChoiceAttributeOption(activeOption)
    );

    this.setState({
      selectedItems,
    });

    this.fetchList(this.props.link.href);
  }

  handleUpdateList = (href) => {
    this.fetchList(href);
  };

  fetchList(lookupHref: Href) {
    const {
      modularui,
      startProgress,
      finishProgress,
      handleError,
    } = this.props;

    startProgress();

    lookupHref.setParameter("lookupToken", this.token);

    modularui(lookupHref)
      .fetch()
      .then((list) => {
        this.setState({
          list,
        });

        finishProgress();
      })
      .catch((error) => handleError(error));
  }

  handleItemSelect = (item: ListItemModel) => {
    const { selectedItems } = this.state;

    if (this.props.isMultiple) {
      if (selectedItems.some((selectedItem) => selectedItem.equals(item))) {
        this.setState({
          selectedItems: selectedItems.filter(
            (selectedItem) => !selectedItem.equals(item)
          ),
        });
      } else {
        this.setState({
          selectedItems: [...selectedItems, item],
        });
      }
    } else if (
      selectedItems.some((selectedItem) => selectedItem.equals(item))
    ) {
      this.setState({
        selectedItems: [],
      });
    } else {
      this.setState({
        selectedItems: [item],
      });
    }
  };

  getAvailableViews() {
    return [
      {
        icon: "view-list",
        label: "list",
        type: "ListView",
        component: ListView,
      },
      {
        icon: "table-large",
        label: "table",
        type: "TableView",
        component: TableView,
      },
    ];
  }

  getViewComponent() {
    const activeView =
      this.getAvailableViews().find(
        (view) => view.type === this.state.viewType
      ) || this.getAvailableViews()[0];

    const View = activeView.component;

    if (!View) {
      throw new Error(`View component not found for ${this.state.viewType}`);
    }

    return (viewProps: Object) => (
      <View
        selectType={this.props.isMultiple ? "multi" : "single"}
        selectedItems={this.state.selectedItems}
        onItemSelect={this.handleItemSelect}
        onSortChange={this.handleUpdateList}
        {...viewProps}
        isLookup
      />
    );
  }

  handleViewTypeChange = (viewType: string) => {
    this.setState({
      viewType,
    });
  };

  handleFilterSubmit = (list: ListModel) => {
    const href = list.selfhref;

    href.page = 1;
    href.filterCollection = list.filterCollection;

    this.fetchList(href);
  };

  handleClose = () => {
    this.props.onClose();
  };

  handleSelect = () => {
    this.props.onSelect(this.state.selectedItems);
  };

  render() {
    if (this._portal && this.state.list) {
      return createPortal(
        <LookupListView
          list={this.state.list}
          label={this.props.label}
          selectedItems={this.state.selectedItems}
          isMultiple={this.props.isMultiple}
          availableViews={this.getAvailableViews()}
          viewType={this.state.viewType}
          getView={this.getViewComponent()}
          onClose={this.handleClose}
          onSelect={this.handleSelect}
          onViewTypeChange={this.handleViewTypeChange}
          onFilterSubmit={this.handleFilterSubmit}
          onUpdate={this.handleUpdateList}
          onItemSelect={this.handleItemSelect}
        />,
        this._portal
      );
    }

    return null;
  }
}

LookupList.displayName = "BI.LookupList";

export default withModularUI(LookupList);
