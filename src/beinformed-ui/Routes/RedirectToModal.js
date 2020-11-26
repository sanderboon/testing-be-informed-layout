// @flow
import { Route, Redirect } from "react-router-dom";

export type Props = {
  +path: string | Array<string>,
};

const RedirectToModal = ({ path }: Props) => (
  <Route
    exact
    path={path}
    render={({ location }) => {
      const toLocation = {
        ...location,
        state: {
          ...location.state,
          modal: true,
        },
      };

      return <Redirect to={toLocation} />;
    }}
  />
);

RedirectToModal.displayName = "BI.RedirectToModal";

export default RedirectToModal;
