// @flow
import { Component } from "react";

import classNames from "classnames";

import { AttributeValueText } from "_component-registry/attributes-readonly";
import { RadioInput, CheckboxInput } from "_component-registry/input";
import {
  TableWrapper,
  Table,
  HeaderCell,
  Cell,
} from "_component-registry/elements";

import { flattenOptions } from "./_util";

import type { ChoiceAttributeOptionModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +disabled?: boolean,
  +id?: string,
  +name: string,
  +isMultiple?: boolean,
  +headers?: Array<Object> | null,
  +options: Array<ChoiceAttributeOptionModel>,
  +readOnly?: boolean,
  +inError?: boolean,
  +onBlur?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  +onChange: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  +onFocus?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
};

/**
 * Render a html select
 */
class TableInput extends Component<Props> {
  renderHeader() {
    const { headers } = this.props;

    if (headers) {
      return (
        <thead>
          <tr>
            <HeaderCell />
            {headers.map((header) => (
              <HeaderCell key={header.key}>{header.label}</HeaderCell>
            ))}
          </tr>
        </thead>
      );
    }

    return null;
  }

  renderRows(options: Array<ChoiceAttributeOptionModel>) {
    const {
      disabled,
      id,
      name,
      readOnly,
      inError,
      onBlur,
      onChange,
      onFocus,
      isMultiple,
    } = this.props;

    const ChoiceInputType = isMultiple ? CheckboxInput : RadioInput;

    return (
      <tbody>
        {options.map((option) => {
          const isSelected =
            !option.selected || option.selected === null
              ? false
              : option.selected;
          return (
            <tr key={option.code}>
              <Cell>
                <ChoiceInputType
                  name={name}
                  id={id}
                  value={option.code}
                  isChecked={isSelected}
                  disabled={disabled || readOnly}
                  inError={inError}
                  onChange={onChange}
                  onBlur={onBlur}
                  onFocus={onFocus}
                  count={option.count}
                />
              </Cell>

              {option.attributeCollection.map((child) => (
                <Cell key={child.key}>
                  <AttributeValueText attribute={child} />
                </Cell>
              ))}
            </tr>
          );
        })}
      </tbody>
    );
  }

  renderTable(options: Array<ChoiceAttributeOptionModel>) {
    return (
      <TableWrapper className={classNames("table-input", this.props.className)}>
        <Table>
          {this.renderHeader()}
          {this.renderRows(options)}
        </Table>
      </TableWrapper>
    );
  }

  /**
   * Render
   */
  render() {
    const options = flattenOptions(this.props.options);

    return this.renderTable(options);
  }
}

TableInput.displayName = "BI.TableInput";

export default TableInput;
