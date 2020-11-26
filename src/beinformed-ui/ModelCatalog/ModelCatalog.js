// @flow
import { get } from "lodash";

import classNames from "classnames";
import styled from "styled-components";
import { spacers } from "beinformed/theme/utils";

import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { Href } from "beinformed/models";

import {
  ModelCatalogHeader,
  ModelCatalogConcepts,
  ModelCatalogContents,
  ConnectedConceptDetail,
  ConnectedContentDetail,
} from "_component-registry/modelcatalog";
import { Container } from "_component-registry/grid";
import { ConnectedBreadcrumb } from "_component-registry/breadcrumb";

import type { ModelCatalogModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +modelcatalog: ModelCatalogModel,
};

const StyledCatalog = styled(Container)`
  position: relative;
  padding: ${spacers(1.5, 1, 1)};
`;

const ModelCatalog = ({ className, modelcatalog }: Props) => {
  const location = useLocation();
  if (modelcatalog) {
    const conceptIndexHref = new Href(
      `/modelcatalog${modelcatalog.conceptIndexLink.href.toString()}`
    );

    return (
      <StyledCatalog className={classNames("modelcatalog", className)}>
        <Helmet>
          <title>{modelcatalog.label}</title>
        </Helmet>

        <ConnectedBreadcrumb />

        <ModelCatalogHeader modelcatalog={modelcatalog} />

        <Switch>
          {location.pathname === "/modelcatalog" && (
            <Redirect to={conceptIndexHref.toString()} />
          )}
          <Route
            path="/modelcatalog/concepts"
            exact
            component={ModelCatalogConcepts}
          />
          <Route
            path="/modelcatalog/content"
            exact
            component={ModelCatalogContents}
          />
          <Route
            path="/modelcatalog/concepts/:concept+"
            render={({ match }) => (
              <ConnectedConceptDetail
                concept={get(match, "params.concept", null)}
              />
            )}
          />
          <Route
            path="/modelcatalog/content/:content"
            render={({ match }) => (
              <ConnectedContentDetail
                content={get(match, "params.content", null)}
              />
            )}
          />
        </Switch>
      </StyledCatalog>
    );
  }

  return null;
};

ModelCatalog.displayName = "BI.ModelCatalog";

export default ModelCatalog;
