declare module "beinformed/redux" {
  import type { Store } from "redux";
  import type { Location, LocationShape, HistoryAction } from "react-router";

  import type { ModularUIModel } from "beinformed/models";
  import type Locales from "beinformed/i18n/Locales";
  import type { FetchException } from "beinformed/exceptions";
  import type {
    ModularUIStatus,
    NotificationTypes,
    AutosaveStatus,
  } from "beinformed/constants";

  declare export type SaveErrorAction = {|
    type: "SAVE_ERROR",
    +payload: Error | FetchException,
  |};

  declare export type ReceiveLocaleAction = {|
    type: "UPDATE_LOCALE",
    +payload: string,
  |};

  declare export type SetLocalesAction = {|
    type: "SET_LOCALES",
    +payload: {|
      +locales: Locales,
      +locale: ?string,
    |},
  |};

  declare export type ShowModalAction = {|
    type: "SHOW_MODAL",
    +payload: string,
  |};

  declare export type CloseModalAction = {|
    type: "CLOSE_MODAL",
    +payload: string,
  |};

  declare export type ModularUISuccessAction =
    | SetModelAction
    | UpdateModelAction
    | RemoveModelAction;

  declare export type SetModelAction = {|
    type: "MODULARUI/SET",
    +payload: {|
      +key: string,
      +model?: ModularUIModel,
    |},
  |};

  declare export type UpdateModelAction = {|
    type: "MODULARUI/UPDATE",
    +payload: ModularUIModel,
  |};

  declare export type ModularUIAction = {
    type: "MODULARUI/FETCH",
    payload: {
      href: Href,
      method?: $Keys<typeof HTTP_METHODS>,
      data?: string | { [key: string]: string },
      locale?: string,
      childmodels?: boolean,
      targetModel?: ModularUIModel,
      successAction: (
        model: ModularUIModel
      ) => UpdateModelAction | SetModelAction,
      errorAction?: (
        error: FetchException
      ) => UpdateStatusAction | ModularUIRemoveKeyAction | NoAction,
    },
  };

  declare export type ModularUIRemoveKeyAction = {|
    type: "MODULARUI/REMOVE_KEY",
    +payload: string,
  |};

  declare export type UpdateStatusAction = {|
    type: "MODULARUI/STATUS",
    +payload: {|
      +key: string,
      +status: ModularUIStatus,
    |},
  |};

  declare export type DismissNotificationAction = {|
    type: "DISMISS_NOTIFICATION",
  |};
  declare export type ShowNotificationAction = {|
    type: "SHOW_NOTIFICATION",
    +payload: {|
      +type: NotificationTypes,
      +message: messageObjectType,
      +error?: ErrorResponse,
    |},
  |};

  declare export type SetPreferenceAction = {|
    type: "SET_PREFERENCE",
    +payload: Object,
  |};

  declare export type StartProgressAction = {|
    type: "START_PROGRESS",
  |};
  declare export type FinishProgressAction = {|
    type: "FINISH_PROGRESS",
  |};
  declare export type ResetProgressAction = {|
    type: "RESET_PROGRESS",
  |};
  declare export type UpdateProgressAction = {|
    type: "UPDATE_PROGRESS",
    +percentComplete: number,
  |};

  declare export type LoginFailedAction = {|
    type: "AUTHENTICATION_ERROR",
    +payload: string,
  |};

  declare export type LoginSuccessAction = {|
    type: "AUTHENTICATION_SUCCESS",
  |};

  declare export type ChangePasswordAction = {|
    type: "CHANGE_PASSWORD",
  |};

  declare export type LogoutSuccessAction = {|
    type: "AUTHENTICATION_LOGOUT",
  |};

  declare export type UpdateAutosaveAction = {|
    type: "UPDATE_AUTOSAVE_STATUS",
    payload: {
      status: AutosaveStatus,
      model: FormModel,
    },
  |};

  declare export type NoAction = {|
    type: "NO_ACTION",
  |};

  declare export type LocationChangeAction = {
    type: "ROUTER/LOCATION_CHANGE",
    payload: {
      location: Location,
      action: HistoryAction,
    },
  };

  declare export type PushAction = {
    type: "ROUTER/PUSH",
    payload: {
      location: string | LocationShape,
      state?: { ... },
    },
  };

  declare export type ReplaceAction = {
    type: "ROUTER/REPLACE",
    payload: {
      location: string | LocationShape,
      state?: { ... },
    },
  };

  declare export type GoAction = {
    type: "ROUTER/GO",
    payload: {
      delta: number,
    },
  };

  declare export type GoBackAction = {
    type: "ROUTER/GOBACK",
  };

  declare export type GoForwardAction = {
    type: "ROUTER/GOFORWARD",
  };

  declare export type ReduxAction =
    | UpdateStatusAction
    | ModularUISuccessAction
    | ModularUIRemoveKeyAction
    | SaveErrorAction
    | ReceiveLocaleAction
    | SetLocalesAction
    | ShowModalAction
    | CloseModalAction
    | DismissNotificationAction
    | ShowNotificationAction
    | SetPreferenceAction
    | StartProgressAction
    | FinishProgressAction
    | ResetProgressAction
    | UpdateProgressAction
    | LoginFailedAction
    | LoginSuccessAction
    | ChangePasswordAction
    | LogoutSuccessAction
    | UpdateAutosaveAction
    | LocationChangeAction
    | PushAction
    | ReplaceAction
    | GoAction
    | GoBackAction
    | GoForwardAction
    | NoAction
    | ModularUIAction;

  // Redux state
  declare export type RouterState = {
    +location: Location,
    +action: HistoryAction,
  };

  declare export type AuthState = {|
    isAuthenticated: boolean,
    mustChangePassword: boolean,
    error: ?string,
  |};

  declare export type ErrorState = null | ErrorResponse;

  declare export type I18nState = {|
    locales: Locales,
    locale: string,
  |};

  declare export type ModalState = {|
    key: string,
    visible: boolean,
    size?: string,
  |};

  declare export type ModalsState = {|
    modals: Array<ModalState>,
  |};

  declare export type ModularUIState = {
    [string]: {
      status: string,
      model: ModularUIModel,
    },
  };

  declare export type NotificationState = {|
    render: boolean,
    messageType: string | null,
    message: MessageObjectType,
    error?: ErrorResponse | null,
  |};

  declare export type PreferencesState = {
    [name: string]: string,
  };

  declare export type ProgressIndicatorState = {|
    count: number,
    timestamp: number,
    percentComplete: number,
  |};

  declare export type ReduxState = {|
    +router: RouterState,
    +modularui: ModularUIState,
    +i18n: I18nState,
    +auth: AuthState,
    +error: ErrorState,
    +modals: ModalsState,
    +notification: NotificationState,
    +progressindicator: ProgressIndicatorState,
    +preferences: PreferencesState,
  |};

  declare export type Dispatch = DispatchAPI<PossibleAction>;
  declare export type GetState = () => ReduxState;
  declare export type ThunkAction = (
    dispatch: Dispatch,
    getState: GetState
  ) => any;
  declare export type PromiseAction = Promise<PossibleAction>;
  declare export type PossibleAction = ReduxAction | ReduxThunk | PromiseAction;
  declare export type ReduxStore = Store<ReduxState, ReduxAction, Dispatch>;
}

// export type GetState = () => State;
// export type Thunk = (dispatch: Dispatch, getState: GetState) => any;
// export type PromiseAction = Promise<PossibleAction>;
// export type Dispatch = DispatchAPI<PossibleAction>;
// export type Store = ReduxStore<State, Action, Dispatch>;
//
// export type PossibleAction = Action | Thunk | PromiseAction;
//
// export type CustomReducers = { [reducerKey: string]: any };
