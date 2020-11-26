// @flow
import { Component } from "react";
import ContentEditable from "react-contenteditable";

import classNames from "classnames";
import styled from "styled-components";
import { themeProp, spacers, spacer } from "beinformed/theme/utils";

import { removeUnwantedHtml } from "beinformed/utils/helpers/sanitizeHtml";

import { Icon } from "_component-registry/icon";
import { Button } from "_component-registry/buttons";
import { StyledInput } from "_component-registry/elements";

import { KEYCODES } from "beinformed/constants/Constants";

export type Props = {
  +ariaLabel?: string,
  +ariaLabelledBy?: string,
  +className?: string,
  +disabled?: boolean,
  +id?: string,
  +name: string,
  +readOnly?: boolean,
  +rows?: number,
  +value?: string,
  +allowedTags?: Array<string>,
  +onBlur?: (e: SyntheticEvent<HTMLTextAreaElement>) => void,
  +onValueChange: (value: any) => void,
  +onFocus?: (e: SyntheticEvent<HTMLTextAreaElement>) => void,
};

type State = {
  boldActive: boolean,
  italicActive: boolean,
  underlineActive: boolean,
  strikethroughActive: boolean,
  value: any,
};

const StyledWrapper = styled(StyledInput)`
  height: auto;
  padding: 0;
  width: 100%;
`;

const StyledButtonBar = styled.div`
  background-color: ${themeProp("GREY_100", "#f8f9fa")};
  padding: ${spacer(0.25)};
`;

const StyledButton = styled(Button)`
  padding: ${spacers(0.1, 0.375)};
  margin-right: 1px;
`;

const StyledEraserButton = styled(StyledButton)`
  margin-left: ${spacer(0.5)};
`;

const StyledHidden = styled.textarea`
  display: none;
`;

const ROW_HEIGHT = 1.5;

const StyledContent = styled(ContentEditable)`
  padding: ${spacers(0.375, 0.75)};
  overflow: auto;
  height: ${({ rows }) => `${rows * ROW_HEIGHT}em`};

  p {
    min-height: 1em;
  }
`;

/**
 * Render default wysiwyg input
 *
 * Sidenote: Maybe we should implement the Draft component from facebook: https://facebook.github.io/draft-js/
 */
class WysiwygInput extends Component<Props, State> {
  _par: ?boolean;
  _content: ?HTMLDivElement;
  _buttonBold: ?HTMLButtonElement;
  _buttonItalic: ?HTMLButtonElement;
  _buttonUnderline: ?HTMLButtonElement;
  _buttonStrikethrough: ?HTMLButtonElement;

  static defaultProps = {
    rows: 5,
    value: "",
    allowedTags: ["p", "br", "b", "i", "u", "strike"],
  };

  state: State = {
    boldActive: false,
    italicActive: false,
    underlineActive: false,
    strikethroughActive: false,
    value: this.props.value,
  };

  constructor(props: Props) {
    super(props);

    document.execCommand("defaultParagraphSeparator", false, "p");
  }

  /**
   * Process change event
   */
  handleChange = (e: SyntheticInputEvent<*>) => {
    if (this.state.value === "" && !this._par) {
      this._par = true;
      document.execCommand("formatBlock", false, "p");
    } else {
      this.setState({
        value: e.target.value,
      });
    }
  };

  handleBlur = (e: SyntheticInputEvent<*>) => {
    this.setState((prevState) => ({
      value: removeUnwantedHtml(prevState.value, {
        allowedTags: this.props.allowedTags,
      }),
    }));

    const sanitizedHTML = removeUnwantedHtml(this.state.value, {
      allowedTags: this.props.allowedTags,
    });
    this.props.onValueChange(sanitizedHTML);

    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  };

  handleCommandClick = (
    e: SyntheticMouseEvent<HTMLButtonElement>,
    command: string,
    value: any = null
  ) => {
    e.preventDefault();

    document.execCommand(command, false, value);
  };

  /**
   * Make selected text bold
   */
  handleBoldClick = (e: SyntheticMouseEvent<HTMLButtonElement>) =>
    this.handleCommandClick(e, "bold");

  /**
   * Make selected text italic
   */
  handleItalicClick = (e: SyntheticMouseEvent<HTMLButtonElement>) =>
    this.handleCommandClick(e, "italic");

  /**
   * Make selected text underline
   */
  handleUnderlineClick = (e: SyntheticMouseEvent<HTMLButtonElement>) =>
    this.handleCommandClick(e, "underline");

  /**
   * Make selected text strikethrough
   */
  handleStrikethroughClick = (e: SyntheticMouseEvent<HTMLButtonElement>) =>
    this.handleCommandClick(e, "strikethrough");

  /**
   * Reset selected text to unformatted text
   */
  handleEraseClick = (e: SyntheticMouseEvent<HTMLButtonElement>) =>
    this.handleCommandClick(e, "removeFormat");

  /**
   * Process a keypress
   * @param  {SyntheticEvent<*>} e - event data
   */
  handleKeyDown = (e: SyntheticKeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === KEYCODES.ENTER && !e.shiftKey) {
      document.execCommand("formatBlock", false, "p");
    }
  };

  render() {
    const {
      className,
      id,
      name,
      rows,
      readOnly,
      disabled,
      ariaLabel,
      ariaLabelledBy,
      onFocus,
    } = this.props;

    let ariaLabelBy = null;

    if (!ariaLabel) {
      ariaLabelBy = ariaLabelledBy || `${id || name}-label`;
    }

    return (
      <StyledWrapper as="div" className={classNames("form-control", className)}>
        <StyledHidden
          id={id || name}
          name={name}
          defaultValue={this.state.value}
          readOnly={readOnly}
          disabled={disabled}
          aria-hidden="true"
          tabIndex="-1"
        />
        <StyledButtonBar className="btn-toolbar wysiwyg-toolbar" role="toolbar">
          <StyledButton
            ref={(c) => {
              this._buttonBold = c;
            }}
            type="button"
            aria-label="Bold"
            isActive={this.state.boldActive}
            onMouseDown={this.handleBoldClick}
          >
            <Icon name="format-bold" />
          </StyledButton>
          <StyledButton
            ref={(c) => {
              this._buttonItalic = c;
            }}
            type="button"
            isActive={this.state.italicActive}
            aria-label="Italic"
            onMouseDown={this.handleItalicClick}
          >
            <Icon name="format-italic" />
          </StyledButton>
          <StyledButton
            ref={(c) => {
              this._buttonUnderline = c;
            }}
            type="button"
            isActive={this.state.underlineActive}
            aria-label="Underline"
            onMouseDown={this.handleUnderlineClick}
          >
            <Icon name="format-underline" />
          </StyledButton>
          <StyledButton
            ref={(c) => {
              this._buttonStrikethrough = c;
            }}
            type="button"
            isActive={this.state.strikethroughActive}
            aria-label="Strikethrough"
            onMouseDown={this.handleStrikethroughClick}
          >
            <Icon name="format-strikethrough" />
          </StyledButton>

          <StyledEraserButton
            type="button"
            aria-label="Erase"
            onMouseDown={this.handleEraseClick}
          >
            <Icon name="eraser" />
          </StyledEraserButton>
        </StyledButtonBar>

        <StyledContent
          role="textbox"
          spellCheck={false}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelBy}
          aria-multiline="true"
          tabIndex="0"
          rows={rows}
          html={this.state.value}
          disabled={readOnly || disabled}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          onFocus={onFocus}
        />
      </StyledWrapper>
    );
  }
}

WysiwygInput.displayName = "BI.WysiwygInput";

export default WysiwygInput;
