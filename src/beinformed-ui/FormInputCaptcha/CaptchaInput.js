// @flow
import { Component } from "react";

import xhr from "beinformed/utils/fetch/xhr";

import { connector } from "beinformed/connectors/Progress";

import { CAPTCHA_PATH, HTTP_METHODS } from "beinformed/constants/Constants";

import {
  CaptchaImage,
  CaptchaAnswer,
  CaptchaError,
} from "_component-registry/input";

export type Props = {
  +ariaLabel?: string,
  +ariaLabelledBy?: string,
  +className?: string,
  +id?: string,
  +inError?: boolean,
  +name: string,
  +placeholder?: string,
  +value: string,
  +onValueChange: (value: any) => void,
  +onStartProgress: () => void,
  +onFinishProgress: () => void,
};

type State = {
  isValidated: boolean,
  tokenId: string | null,
  image: string | null,
  validated: boolean,
  valid: boolean,
  answer: string,
};

class CaptchaInput extends Component<Props, State> {
  state: State = {
    tokenId: null,
    image: null,
    validated: false,
    valid: false,
    answer: "",
    isValidated: false,
  };

  componentDidMount() {
    this.requestCaptcha();
  }

  requestCaptcha() {
    this.props.onStartProgress();
    xhr({ url: CAPTCHA_PATH }).then((captchaResponse) => {
      if (this.props.value !== "") {
        this.props.onValueChange("");
      }

      this.setState({
        tokenId: captchaResponse.tokenId,
        image: captchaResponse.image,
        validated: false,
        valid: captchaResponse.valid,
        answer: "",
      });

      this.props.onFinishProgress();
    });
  }

  sendCaptcha() {
    this.props.onStartProgress();

    xhr({
      url: CAPTCHA_PATH,
      method: HTTP_METHODS.POST,
      data: {
        tokenId: this.state.tokenId,
        answer: this.state.answer,
      },
    })
      .then((captchaResponse) => {
        this.setState({
          validated: true,
          valid: captchaResponse.valid,
        });

        // on valid answer set the value of the captcha model to the token
        this.props.onValueChange(this.state.tokenId || "");

        this.props.onFinishProgress();
      })
      .catch((error) => {
        this.setState({
          tokenId: error.response.tokenId,
          image: error.response.image,
          validated: true,
          valid: error.response.valid,
          answer: "",
        });

        // on invalid token, remove value from model
        this.props.onValueChange("");

        this.props.onFinishProgress();
      });
  }

  handleRefresh = (e: SyntheticMouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.requestCaptcha();
  };

  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({
      answer: e.target.value,
    });
  };

  handleBlur = () => {
    if (this.state.answer !== "") {
      this.sendCaptcha();
    }
  };

  handleClick = (e: SyntheticMouseEvent<HTMLButtonElement>) => {
    if (!this.state.validated && this.state.answer !== "") {
      e.preventDefault();

      this.sendCaptcha();
    }
  };

  render() {
    const {
      id,
      ariaLabel,
      ariaLabelledBy,
      placeholder,
      className,
      inError,
      name,
    } = this.props;

    return (
      <div className={className}>
        <CaptchaImage image={this.state.image} onRefresh={this.handleRefresh} />
        <CaptchaAnswer
          id={id || name}
          name={name}
          answer={this.state.answer}
          ariaLabel={ariaLabel}
          ariaLabelledBy={ariaLabelledBy}
          placeholder={placeholder}
          isValid={this.state.valid && !inError}
          isValidated={this.state.isValidated}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          onClick={this.handleClick}
        />
        <CaptchaError inError={this.state.validated && !this.state.valid} />
      </div>
    );
  }
}

CaptchaInput.displayName = "BI.CaptchaInput";

export default connector(CaptchaInput);
