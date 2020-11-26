// @flow
import RouterReducer from "beinformed/redux/reducers/RouterReducer";
import ModularUIReducer from "beinformed/redux/reducers/ModularUIReducer";
import ModalsReducer from "beinformed/redux/reducers/ModalsReducer";
import I18nReducer from "beinformed/redux/reducers/I18nReducer";
import AuthReducer from "beinformed/redux/reducers/AuthReducer";
import ErrorReducer from "beinformed/redux/reducers/ErrorReducer";
import NotificationReducer from "beinformed/redux/reducers/NotificationReducer";
import ProgressIndicatorReducer from "beinformed/redux/reducers/ProgressIndicatorReducer";
import PreferencesReducer from "beinformed/redux/reducers/PreferencesReducer";

const createReducer = () => ({
  router: RouterReducer,
  modularui: ModularUIReducer,
  i18n: I18nReducer,
  auth: AuthReducer,
  error: ErrorReducer,
  modals: ModalsReducer,
  notification: NotificationReducer,
  progressindicator: ProgressIndicatorReducer,
  preferences: PreferencesReducer,
});

export { createReducer };
