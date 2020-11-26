// @flow
import { useSelector } from "react-redux";
import { Main } from "_component-registry/main";

import { ApplicationHeader } from "_component-registry/application";
import { ConnectedNotification } from "_component-registry/notification";

import { DefaultRoutes } from "_component-registry/routes";

import type { Node } from "react";
import type { ApplicationModel } from "beinformed/models";
export type Props = {
  +application?: ApplicationModel,
  +children?: Node,
};

const Application = ({ application, children }: Props) => {
  const locale = useSelector((state) => state.i18n.locale);

  return application ? (
    <Main title={application.label} locale={locale}>
      <ConnectedNotification />
      <ApplicationHeader application={application} />
      <DefaultRoutes application={application} />
      {children}
    </Main>
  ) : (
    <Main title="" locale={locale}>
      <ConnectedNotification />
      {children}
    </Main>
  );
};

Application.displayName = "BI.Application";

export default Application;
