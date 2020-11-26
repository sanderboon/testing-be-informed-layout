// @flow
import { Component } from "react";

import classNames from "classnames";
import styled, { css } from "styled-components";
import { spacer, themeProp } from "beinformed/theme/utils";

import { withModularUI } from "beinformed/modularui";
import { BASE } from "beinformed/constants/Constants";

import type { Href, ContentTypeModel } from "beinformed/models";

const StyledSourceLabel = styled.h3`
  margin-bottom: 0;
  font-size: ${themeProp("FONT_SIZE_BASE")};
  font-weight: ${themeProp("FONT_WEIGHT_BASE")};
  color: ${themeProp("HEADER_COLOR")};
`;

const StyledContentIcon = styled.img`
  max-width: 100%;
  max-height: 100%;

  margin-right: ${spacer(0.4)};

  ${({ size }) =>
    size &&
    css`
      width: ${size};
      height: ${size};
    `}
`;

export type Props = {
  +className?: string,
  +sourceLabel: string,
  +contentTypeHref?: Href,
  +modularui: Function,
  +handleError: (err: Error) => void,
  +startProgress: () => void,
  +finishProgress: () => void,
};
type State = {
  isFetching: boolean,
  icon?: string,
};

class SourceLabel extends Component<Props, State> {
  state: State = {
    isFetching: false,
  };

  componentDidMount() {
    this.fetchContentType();
  }

  fetchContentType() {
    const { contentTypeHref } = this.props;

    if (!this.state.isFetching && contentTypeHref) {
      const {
        modularui,
        startProgress,
        finishProgress,
        handleError,
      } = this.props;

      startProgress();
      modularui(contentTypeHref)
        .fetchFromCache()
        .then((contentType: ContentTypeModel) => {
          if (contentType.iconSmall) {
            this.setState({
              icon: contentType.iconSmall,
            });
          }

          finishProgress();
        })
        .catch(handleError);
    }
  }

  render() {
    const { className, sourceLabel } = this.props;

    return (
      <StyledSourceLabel
        key="source-label"
        className={classNames(className, "source-label")}
      >
        {this.state.icon && (
          <StyledContentIcon
            className="content-icon"
            src={`${BASE}${this.state.icon}`}
            alt={`Icon of ${sourceLabel}`}
            size="16px"
          />
        )}
        {sourceLabel}
      </StyledSourceLabel>
    );
  }
}

SourceLabel.displayName = "BI.SourceLabel";

export default withModularUI(SourceLabel);
