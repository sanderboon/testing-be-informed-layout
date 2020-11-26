// @flow
import { ICON } from "beinformed/constants/LayoutHints";

import { Icon } from "_component-registry/icon";

export type Props = {
  +model: any,
  +defaultIcon?: string,
};

const IconFromHint = ({ model, defaultIcon, ...iconProps }: Props) => {
  const icon = model.layouthint.getLayoutHintValue(ICON) || defaultIcon;

  if (icon) {
    return <Icon name={icon} textAfter {...iconProps} />;
  }

  return null;
};

IconFromHint.displayName = "BI.IconFromHint";

export default IconFromHint;
