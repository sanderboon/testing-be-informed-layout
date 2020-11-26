// @flow
import { Fragment, Component } from "react";

import styled from "styled-components";
import { themeProp, roundedCorners } from "beinformed/theme/utils";

import { TextInput } from "_component-registry/input";

export type Props = {
  +ariaLabel?: string,
  +ariaLabelledBy?: string,
  +className?: string,
  +disabled?: boolean,
  +id?: string,
  +inError?: boolean,
  +enableSuggestions?: boolean,
  +name: string,
  +placeholder?: string,
  +readOnly?: boolean,
  +value?: string,
  +onBlur?: (e: SyntheticEvent<HTMLInputElement>) => void,
  +onChange: (e: SyntheticEvent<HTMLInputElement>) => void,
  +onFocus?: (e: SyntheticEvent<HTMLInputElement>) => void,
  +onKeyDown?: (e: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  +onKeyUp?: (e: SyntheticKeyboardEvent<HTMLInputElement>) => void,
};

type State = {
  score: number,
  suggestions: [],
  warning: string,
};

const StyledInfo = styled.div`
  font-size: 80%;
  font-weight: 400;
`;

const StyledWarning = styled.div`
  color: ${themeProp("INPUT_ERROR_COLOR", "#dc3545")};
`;

const StyledSuggestions = styled.ul`
  margin-bottom: 0;
  padding-left: 0;
  list-style: none;
`;

const PASSWORD_STRENGTH3 = 3;
const PASSWORD_STRENGTH4 = 4;

const StyledStrength = styled.div`
  height: 3px;
  margin: 3px;
  ${roundedCorners("border-radius", "", "2px")};

  ${(props) => {
    switch (props.strength) {
      case 1:
        return `background: linear-gradient(to right, #ee7f4e 0%, #ee7f4e 25, transparent 50%);`;
      case 2:
        return `background: linear-gradient(to right, #f0ad4e 0%, #f0ad4e 50%, transparent 75%);`;
      case PASSWORD_STRENGTH3:
        return `background: linear-gradient(to right, #9db85a 0%, #9db85a 75%, transparent 100%);`;
      case PASSWORD_STRENGTH4:
        return `background: #5cb85c;`;
      default:
        return `background: linear-gradient(to right, #d9534f 0%, transparent 25%);`;
    }
  }}
`;

/**
 * Render password input
 */
class PasswordInput extends Component<Props, State> {
  _zxcvbn: null | Function;

  static defaultProps = {
    value: "",
    enableSuggestions: true,
  };

  state: State = {
    score: -1,
    suggestions: [],
    warning: "",
  };

  /**
   * Async load zxcvbn for password strength meter
   */
  componentDidMount() {
    if (this.props.enableSuggestions && !this._zxcvbn) {
      this._zxcvbn = null;

      /*
       * don't do anything when request of zxcvbn fails, just don't show password hints
       * this uses webpack dynamic imports: https://webpack.js.org/guides/code-splitting/#dynamic-imports
       */
      import(/* webpackChunkName: "zxcvbn" */ "zxcvbn").then((module) => {
        this._zxcvbn = module.default;

        return module;
      });
    }
  }

  /**
   * Set strength information on password change
   */
  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    if (this.props.enableSuggestions && this._zxcvbn) {
      const strength = this._zxcvbn(e.target.value);

      this.setState({
        score: strength.score,
        warning: strength.feedback.warning,
        suggestions: strength.feedback.suggestions,
      });
    }

    this.props.onChange(e);
  };

  renderPasswordInformation() {
    if (this.props.enableSuggestions && this.state.score > -1) {
      return (
        <StyledInfo key="suggestions" className="password-info">
          <StyledStrength
            strength={this.state.score}
            className={`password-strength strength-${this.state.score}`}
          >
            &nbsp;
          </StyledStrength>
          {this.state.score > -1 && (
            <StyledWarning className="password-explain">
              {this.state.warning}
            </StyledWarning>
          )}
          {this.state.suggestions.length > 0 && (
            <StyledSuggestions className="password-suggestions">
              {this.state.suggestions.map((suggestion) => (
                <li key={suggestion}>{suggestion}</li>
              ))}
            </StyledSuggestions>
          )}
        </StyledInfo>
      );
    }

    return null;
  }

  /**
   * render
   */
  render() {
    const {
      className,
      ariaLabel,
      ariaLabelledBy,
      disabled,
      id,
      inError,
      name,
      placeholder,
      readOnly,
      value,
      onBlur,
      onFocus,
      onKeyDown,
      onKeyUp,
    } = this.props;
    return (
      <Fragment>
        <TextInput
          className={className}
          type="password"
          autoComplete="new-password"
          ariaLabel={ariaLabel}
          ariaLabelledBy={ariaLabelledBy}
          disabled={disabled}
          id={id}
          name={name}
          inError={inError}
          placeholder={placeholder}
          readOnly={readOnly}
          value={value}
          onBlur={onBlur}
          onChange={this.handleChange}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
        />
        {this.renderPasswordInformation()}
      </Fragment>
    );
  }
}

PasswordInput.displayName = "BI.PasswordInput";

export default PasswordInput;
