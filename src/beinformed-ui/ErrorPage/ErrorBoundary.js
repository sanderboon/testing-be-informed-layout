// @flow
import { Component } from "react";

import ErrorBoundaryFallback from "./ErrorBoundaryFallback";

import type { Node } from "react";
import type { ComponentType } from "react";
export type Props = {
  +children: Node,
  +FallbackComponent: ComponentType<any>,
};

type ErrorInfo = {
  componentStack: string,
  ...
};

type State = {
  error: ?Error,
  errorInfo: ?ErrorInfo,
};

class ErrorBoundary extends Component<Props, State> {
  static defaultProps = {
    FallbackComponent: ErrorBoundaryFallback,
  };

  state = {
    error: null,
    errorInfo: null,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ error, errorInfo });
  }

  render() {
    const { children, FallbackComponent } = this.props;
    const { error, errorInfo } = this.state;

    if (error !== null) {
      return (
        <FallbackComponent
          componentStack={errorInfo ? errorInfo.componentStack : ""}
          error={error}
        />
      );
    }

    return children;
  }
}
ErrorBoundary.displayName = "BI.ErrorBoundary";

export default ErrorBoundary;
