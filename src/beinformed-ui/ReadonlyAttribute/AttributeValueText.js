// @flow
import { Component } from "react";
import { escapeRegExp, get } from "lodash";

import classNames from "classnames";
import styled from "styled-components";
import { themeProp, spacers, spacer } from "beinformed/theme/utils";

import CompositeAttributeChildCollection from "beinformed/models/attributes/CompositeAttributeChildCollection";

import { DownloadLink } from "_component-registry/link";
import {
  TableWrapper,
  Table,
  TableHeaderRow,
  HeaderCell,
  TableRow,
  Cell,
} from "_component-registry/elements";

import { UNIT_AS_PREFIX } from "beinformed/constants/LayoutHints";
import textile from "textilejs";
import { Message } from "beinformed/i18n";

import {
  BooleanAttributeModel,
  ChoiceAttributeModel,
  CompositeAttributeModel,
  MoneyAttributeModel,
  NumberAttributeModel,
  PasswordAttributeModel,
} from "beinformed/models";

import type { Node } from "react";
import type { AttributeType } from "beinformed/models";
export type Props = {
  +className?: string,
  +attribute: AttributeType,
  +emptyValue?: any,
  +markText?: ?string,
};

const StyledValue = styled.span`
  padding: ${spacers(0.25, 0)};

  > p:last-child {
    margin-bottom: 0;
  }
`;
const StyledPrefix = styled.span`
  margin-right: ${spacer(0.25)};
`;
const StyledPostfix = styled.span`
  margin-left: ${spacer(0.25)};
`;
const StyledMark = styled.mark`
  padding: ${spacer(0.2)};
  background-color: ${themeProp("GREY_100", "#f8f9fa")};
`;

const StyledCompositeChild = styled.div`
  & > * {
    display: inline-block;
    white-space: nowrap;
  }
`;

const StyledWrappedValue = styled.span`
  & + &:before {
    content: "|";
    padding: 0 0.5em;
  }
`;

/**
 * Render readonly attribute values
 */
class AttributeValueText extends Component<Props> {
  static defaultProps = {
    emptyValue: "\u00A0",
  };

  getReadonlyValue(attribute: AttributeType) {
    const { markText } = this.props;

    if (!markText || markText.toString() === "") {
      return attribute.readonlyvalue;
    }

    const re = new RegExp(`(${escapeRegExp(markText)})`, "gi");
    const aLabel = attribute.readonlyvalue
      .replace(re, "[mark]$1[mark]")
      .split("[mark]")
      .filter((mark) => mark !== "");

    return aLabel.map((labelPart, i) => {
      if (labelPart.toLowerCase() === markText.toLowerCase()) {
        return <StyledMark key={`${labelPart}--${i}`}>{labelPart}</StyledMark>;
      }

      return labelPart;
    });
  }

  getEmptyValue(attribute: AttributeType) {
    if (this.props.emptyValue && this.props.emptyValue !== "") {
      return this.wrapValue(this.props.emptyValue, attribute.key);
    }

    return null;
  }

  getDownloadLink(attribute: AttributeType) {
    return this.wrapValue(
      <DownloadLink
        href={attribute.downloadLink.href}
        fileName={this.getReadonlyValue(attribute)}
      >
        {this.getReadonlyValue(attribute)}
      </DownloadLink>,
      attribute.key
    );
  }

  getPasswordAttribute(attribute: PasswordAttributeModel) {
    return this.wrapValue("*******", attribute.key);
  }

  getReadonlyDateTimeValue(attribute: CompositeAttributeModel) {
    const formatUtil = attribute.end.formatUtil;

    const isSameDayAsStart = formatUtil.isSameDay(
      attribute.start.value,
      attribute.end.value
    );

    const hasTimeInFormat = /[Hms]/gu.test(attribute.end.format || "");
    if (isSameDayAsStart && hasTimeInFormat) {
      // format end attribute value as time only
      return formatUtil.toFormat(
        attribute.end.value,
        attribute.end.timeInputFormat
      );
    }

    return this.getReadonlyValue(attribute.end);
  }

  getRangeAttribute(attribute: CompositeAttributeModel) {
    if (attribute.children.length === 1) {
      return this.renderValue(attribute.start);
    }

    const values = [];

    if (attribute.start.value) {
      values.push(this.getReadonlyValue(attribute.start));
    }

    if (attribute.end.value) {
      if (["datetime", "timestamp"].includes(attribute.end.type)) {
        values.push(this.getReadonlyDateTimeValue(attribute));
      } else {
        values.push(this.getReadonlyValue(attribute.end));
      }
    }

    const value = values.join(" - ");

    return this.wrapValue(this.addUnit(value, attribute.start), attribute.key);
  }

  getMoneyAttribute(attribute: MoneyAttributeModel) {
    return this.wrapValue(
      [
        <StyledPrefix key="currency-symbol">
          {attribute.currencySymbol}
        </StyledPrefix>,
        <span key="money-value">{this.getReadonlyValue(attribute)}</span>,
      ],
      attribute.key
    );
  }

  addUnit(readonlyValue: any, attribute: AttributeType) {
    if (attribute.unit) {
      const StyledUnit = attribute.layouthint.has(UNIT_AS_PREFIX)
        ? StyledPrefix
        : StyledPostfix;

      const unit = attribute.unit ? (
        <StyledUnit key="number-unit">{attribute.unit}</StyledUnit>
      ) : null;

      const value = <span key="number-value">{readonlyValue}</span>;

      if (attribute.layouthint.has(UNIT_AS_PREFIX)) {
        return [unit, value];
      }

      return [value, unit];
    }

    return readonlyValue;
  }

  getNumberAttribute(attribute: AttributeType) {
    const readonlyValue = this.getReadonlyValue(attribute);

    return this.wrapValue(
      this.addUnit(readonlyValue, attribute),
      attribute.key
    );
  }

  getCompositeAttribute(children: Array<AttributeType>) {
    return children
      .filter((childAttribute) => childAttribute.value)
      .map<Node>((childAttribute, i) =>
        childAttribute instanceof CompositeAttributeChildCollection ? (
          <StyledCompositeChild key={`${this.props.attribute.key}-${i}`}>
            {this.getCompositeAttribute(childAttribute.all)}
          </StyledCompositeChild>
        ) : (
          this.renderValue(childAttribute)
        )
      );
  }

  renderPrefix(attribute: AttributeType) {
    if (attribute.prefix) {
      return <StyledPrefix key="attr-prefix">{attribute.prefix}</StyledPrefix>;
    }

    return null;
  }

  renderPostfix(attribute: AttributeType) {
    if (attribute.postfix) {
      return (
        <StyledPostfix key="attr-postfix">{attribute.postfix}</StyledPostfix>
      );
    }

    return null;
  }

  renderFormattedValue(attribute: AttributeType) {
    return this.wrapValue(
      <StyledValue
        dangerouslySetInnerHTML={{
          __html: textile(attribute.readonlyvalue),
        }}
      />,
      attribute.key
    );
  }

  renderTable(attribute: ChoiceAttributeModel) {
    return (
      <TableWrapper>
        <Table>
          <thead>
            <TableHeaderRow>
              {attribute.options.headers.map((header) => (
                <HeaderCell key={header.key}>{header.label}</HeaderCell>
              ))}
            </TableHeaderRow>
          </thead>
          <tbody>
            {attribute.options.map((option) => (
              <TableRow key={option.code}>
                {option.attributeCollection.map((item) => (
                  <Cell key={item.key}>{this.renderValue(item)}</Cell>
                ))}
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    );
  }

  renderBoolean(attribute: BooleanAttributeModel) {
    const selectedOption = attribute.options.find((option) => option.selected);

    if (selectedOption && !selectedOption.hasAlternativeLabel) {
      return this.wrapValue(
        <Message
          id={
            selectedOption.code === "true"
              ? "Choice.Boolean.True"
              : "Choice.Boolean.False"
          }
        >
          {selectedOption.label}
        </Message>,
        attribute.key
      );
    }

    return this.renderReadonlyValue(attribute);
  }

  renderReadonlyValue(attribute: AttributeType) {
    const prefix = this.renderPrefix(attribute);
    const postfix = this.renderPostfix(attribute);
    const value = this.getReadonlyValue(attribute);

    if (prefix || postfix) {
      return this.wrapValue(
        [prefix, <StyledValue key="attr-value">{value}</StyledValue>, postfix],
        attribute.key
      );
    }

    return this.wrapValue(value, attribute.key);
  }

  wrapValue(children?: Node, key: string) {
    return (
      <StyledWrappedValue
        key={key}
        className={classNames("value", this.props.className)}
      >
        {children}
      </StyledWrappedValue>
    );
  }

  isEmpty(attribute: AttributeType) {
    return (
      !attribute ||
      (!attribute.readonlyvalue && get(attribute, "choicetype", "") !== "table")
    );
  }

  renderValue(attribute: AttributeType) {
    if (this.isEmpty(attribute)) {
      return this.getEmptyValue(attribute);
    }

    if (attribute.readonlyvalue && attribute.downloadLink) {
      return this.getDownloadLink(attribute);
    }

    if (attribute instanceof PasswordAttributeModel) {
      return this.getPasswordAttribute(attribute);
    }
    if (
      attribute instanceof CompositeAttributeModel &&
      attribute.type === "range"
    ) {
      return this.getRangeAttribute(attribute);
    }

    if (attribute instanceof CompositeAttributeModel) {
      return this.getCompositeAttribute(attribute.children.all);
    }

    if (attribute instanceof MoneyAttributeModel) {
      return this.getMoneyAttribute(attribute);
    }

    if (attribute instanceof NumberAttributeModel) {
      return this.getNumberAttribute(attribute);
    }

    if (attribute.type === "memo" && attribute.formatted) {
      return this.renderFormattedValue(attribute);
    }

    if (
      attribute instanceof ChoiceAttributeModel &&
      attribute.choicetype === "table"
    ) {
      return this.renderTable(attribute);
    }

    if (attribute instanceof BooleanAttributeModel) {
      return this.renderBoolean(attribute);
    }

    if (attribute.readonlyvalue) {
      return this.renderReadonlyValue(attribute);
    }

    return this.wrapValue("Unknown value type", attribute.key);
  }

  render() {
    const { attribute } = this.props;
    if (attribute) {
      return this.renderValue(attribute);
    }

    return null;
  }
}

AttributeValueText.displayName = "BI.AttributeValueText";

export default AttributeValueText;
