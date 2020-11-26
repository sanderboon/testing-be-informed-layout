// @flow
import { useState, useEffect } from "react";

export type Props = { +load: Function };

const DynamicImport = ({ load, ...props }: Props) => {
  const [component, setComponent] = useState(null);

  useEffect(() => {
    load().then((comp) => {
      setComponent(comp.default ? comp.default : comp);
    });
  }, [load]);

  if (component) {
    const Comp = component;
    return <Comp {...props} />;
  }

  return null;
};

DynamicImport.displayName = "BI.DynamicImport";

export default DynamicImport;
