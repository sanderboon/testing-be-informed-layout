// @flow
import classNames from "classnames";
import styled from "styled-components";
import { themeProp } from "beinformed/theme/utils";

import { LinkModel } from "beinformed/models";

import { useMessage } from "beinformed/i18n";

import { UserMenu } from "_component-registry/user";
import { LanguageSelector } from "_component-registry/languageselector";

import {
  Navigation,
  NavigationItem,
  NavigationBar,
} from "_component-registry/navigation";

import { getSetting } from "beinformed/constants/Settings";

import type { ApplicationModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +application: ApplicationModel,
};

const StyledHeader = styled.header`
  background: ${themeProp("APPLICATION_HEADER_BG", "#f8f9fa")};

  a {
    color: ${themeProp("APPLICATION_HEADER_COLOR", "#212529")};
  }
`;

const StyledList = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  align-self: flex-start;
  margin-bottom: 0;
  margin-left: auto;
  padding-left: 0;
  font-size: ${themeProp("FONT_SIZE_SMALL", "0.875rem")};
  white-space: nowrap;
  list-style: none;
`;

const ApplicationHeader = ({ className, application }: Props) => {
  const modelCatalogLink = LinkModel.create(
    "modelcatalog",
    "/modelcatalog",
    useMessage("ModelCatalog.Menu", "Model catalog")
  );
  modelCatalogLink.icon = "share-variant";

  return (
    <StyledHeader className={classNames(className, "application-header")}>
      <NavigationBar>
        <Navigation items={application.tabs} className="application-menu" />

        <StyledList className="nav ml-auto generic-menu">
          <NavigationItem
            link={modelCatalogLink}
            className="modelcatalog-link"
          />

          <li>
            <UserMenu userServices={application.userServices} />
          </li>

          {getSetting("ENABLED_LOCALES").length > 1 && (
            <li>
              <LanguageSelector />
            </li>
          )}
        </StyledList>
      </NavigationBar>
    </StyledHeader>
  );
};

ApplicationHeader.displayName = "BI.ApplicationHeader";

export default ApplicationHeader;
