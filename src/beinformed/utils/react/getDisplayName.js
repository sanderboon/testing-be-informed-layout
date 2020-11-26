// @flow
import type { ComponentType } from "react";

const getDisplayName = (
  WrappedComponent: ComponentType<any>,
  defaultName: string = "Component"
) => WrappedComponent.displayName || WrappedComponent.name || defaultName;

export default getDisplayName;
