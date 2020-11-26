// @flow
import { MissingPropertyException } from "beinformed/exceptions";
import { Routes, MainRoutes, ModalRoutes } from "_component-registry/routes";

import type { Node } from "react";
import type { ApplicationModel } from "beinformed/models";
export type Props = {
  +application: ApplicationModel,
  +mainRoutes?: Array<Node>,
  +modalRoutes?: Array<Node>,
};

const DefaultRoutes = ({ application, mainRoutes, modalRoutes }: Props) => {
  if (!application) {
    throw new MissingPropertyException(
      "DefaultRoutes is missing application property"
    );
  }

  return (
    <Routes application={application}>
      <MainRoutes>{mainRoutes}</MainRoutes>
      <ModalRoutes>{modalRoutes}</ModalRoutes>
    </Routes>
  );
};

DefaultRoutes.displayName = "BI.DefaultRoutes";

export default DefaultRoutes;
