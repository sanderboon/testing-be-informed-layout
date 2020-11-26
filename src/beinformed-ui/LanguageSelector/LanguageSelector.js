// @flow
import { useSelector, useDispatch } from "react-redux";

import classNames from "classnames";
import styled from "styled-components";
import { spacers } from "beinformed/theme/utils";

import { Icon } from "_component-registry/icon";

import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownChildren,
} from "_component-registry/dropdown";

import { updateLocale } from "beinformed/redux/actions/Locales";

import type { ReduxState } from "beinformed/redux";
export type Props = {
  +className?: string,
};

const StyledDropdownButton = styled(DropdownButton)`
  padding: ${spacers(0.5, 1)};
`;

/**
 * Renders dropdown language selector
 */
const LanguageSelector = ({ className }: Props) => {
  const activeLocale = useSelector((state: ReduxState) => state.i18n.locale);
  const locales = useSelector((state: ReduxState) => state.i18n.locales);
  const dispatch = useDispatch();

  return (
    <div
      className={classNames(className, "languageselector")}
      data-language={activeLocale}
    >
      <Dropdown>
        <StyledDropdownButton buttonStyle="LINK" size="SMALL">
          <Icon name="earth" textAfter />
          <span className="link-text locale">{activeLocale}</span>
        </StyledDropdownButton>
        <DropdownChildren align="right">
          {locales.map((locale) => (
            <DropdownItem
              key={locale.code}
              id={`language-${locale.code}`}
              onClick={() => dispatch(updateLocale(locale.code))}
            >
              {locale.code === activeLocale ? (
                <Icon name="checkbox-marked-circle-outline" textAfter />
              ) : (
                <Icon name="checkbox-blank-circle-outline" textAfter />
              )}

              <span className="link-text">{locale.nativeName}</span>
            </DropdownItem>
          ))}
        </DropdownChildren>
      </Dropdown>
    </div>
  );
};

LanguageSelector.displayName = "BI.LanguageSelector";

export default LanguageSelector;
