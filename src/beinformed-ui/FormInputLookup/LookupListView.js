// @flow
import classNames from "classnames";
import styled from "styled-components";

import {
  ConnectedModal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "_component-registry/modal";

import { Button } from "_component-registry/buttons";
import { Heading } from "_component-registry/elements";
import {
  LookupListFilters,
  LookupListMain,
  LookupListSelected,
} from "_component-registry/lookup-list";
import { Row, Column } from "_component-registry/grid";

import { Message } from "beinformed/i18n";

import type { ListModel, ListItemModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +list: ListModel,
  +label: string,
  +selectedItems: Array<ListItemModel>,
  +isMultiple: boolean,
  +viewType: string,
  +availableViews: Array<{
    type: string,
    icon: any,
    label: string,
    component: any,
  }>,
  +getView: (viewProps: Object) => any,
  +onClose: Function,
  +onUpdate: Function,
  +onSelect: Function,
  +onViewTypeChange: Function,
  +onFilterSubmit: Function,
  +onItemSelect: Function,
};

const StyledTitle = styled(Heading)`
  margin-bottom: 0;
  line-height: 1.5;
`;

const LookupListView = ({
  className,
  list,
  label,
  selectedItems,
  isMultiple,
  availableViews,
  viewType,
  getView,
  onClose,
  onSelect,
  onUpdate,
  onViewTypeChange,
  onFilterSubmit,
  onItemSelect,
}: Props) => (
  <ConnectedModal
    className={classNames("lookuplist-modal", className)}
    size="max"
  >
    <ModalHeader showClose onClose={() => onClose()}>
      <StyledTitle as="h2">{label}</StyledTitle>
    </ModalHeader>
    <ModalBody className="lookuplist" dataId={list.key}>
      <Row nowrap>
        <Column
          as={LookupListSelected}
          offset={3}
          selectedItems={selectedItems}
          isMultiple={isMultiple}
          onItemSelect={onItemSelect}
        />
      </Row>
      <Row nowrap>
        <Column
          as={LookupListFilters}
          size={3}
          list={list}
          onSubmit={onFilterSubmit}
        />
        <Column
          as={LookupListMain}
          list={list}
          availableViews={availableViews}
          viewType={viewType}
          getView={getView}
          onViewTypeChange={onViewTypeChange}
          onUpdate={onUpdate}
        />
      </Row>
    </ModalBody>
    <ModalFooter>
      <Button
        type="button"
        name="close"
        buttonStyle="LINK"
        className="btn-close"
        onClick={() => onClose()}
      >
        <Message id="LookupList.CloseButton">Close</Message>
      </Button>
      <Button
        className="btn-select"
        type="button"
        name="select"
        buttonStyle="PRIMARY"
        disabled={selectedItems.length === 0}
        onClick={() => onSelect()}
      >
        <Message id="LookupList.SelectButton">Select</Message>
      </Button>
    </ModalFooter>
  </ConnectedModal>
);

LookupListView.displayName = "BI.LookupListView";

export default LookupListView;
