// @flow
import { Helmet } from "react-helmet-async";

import classNames from "classnames";
import styled from "styled-components";
import { themeProp, spacers, spacer } from "beinformed/theme/utils";

import { withPathname } from "beinformed/connectors/Router";

import { Href } from "beinformed/models";

import { ConnectedBreadcrumb } from "_component-registry/breadcrumb";
import { FoldoutTaskMenu } from "_component-registry/taskmenu";
import { NavigationDropdown } from "_component-registry/navigation";
import { ConnectedQuickSearch } from "_component-registry/quicksearch";
import { TabRoutes } from "_component-registry/routes";

import type { TabModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +tab?: TabModel,
  +pathname: string,
};

const StyledTab = styled.div`
  position: relative;
`;

const Navbar = styled.nav`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: ${spacers(0.5, 1)};
  background-color: ${themeProp("GREY_100", "#f8f9fa")};
  ${(props) => props.hasTaskGroups && `padding-right: 3em;`};
`;

const Main = styled.main`
  padding: ${spacer()};
`;



const Tab = ({ className, tab, pathname }: Props) => {
  if (tab) {
    const tabComponents = [
      ...tab.components.filter((component) => component.group === "component"),
      ...tab.components.filter((component) => component.group === "search"),
    ];

    const activeComponent = tabComponents.find((component) =>
      new Href(pathname).startsWith(component.href)
    );

    return (
      <StyledTab className={classNames("tab", className)}>
        <Helmet>
          <title>{tab.label}</title>
        </Helmet>

        {(tab.hasTaskGroups() || tab.hasActions()) && (
          <FoldoutTaskMenu
            taskgroups={tab.taskGroupCollection}
            actions={tab.actionCollection}
            label={tab.label}
          />
        )}
        {tabComponents.length > 0 && activeComponent && (
          <Navbar
            className="tab-header"
            hasTaskGroups={tab.hasTaskGroups()}
            hasSearch={Boolean(tab.searchLink)}
          >
            <NavigationDropdown
              className="component-chooser"
              toggleLabel={activeComponent ? activeComponent.label : ""}
              items={tabComponents}
            />
            {tab.searchLink && (
              <ConnectedQuickSearch href={tab.searchLink.href} />
            )}
          </Navbar>
        )}

        <Main role="main">
          <ConnectedBreadcrumb />

          <TabRoutes tab={tab} />
          
        </Main>
      </StyledTab>
    );
  }

  return null;
};

Tab.displayName = "BI.Tab";

export default withPathname(Tab);
