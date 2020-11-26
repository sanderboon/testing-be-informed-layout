// @flow
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { get } from "lodash";

import {
  loadModularUI,
  removeModelByKey,
  reloadModel,
} from "beinformed/redux/actions/ModularUI";
import { Href } from "beinformed/models";
import getDisplayName from "beinformed/utils/react/getDisplayName";

import { useUrl, getKey, useReload, useModularUI } from "./modularuiUtils";

import type { ComponentType } from "react";
import type { Location } from "react-router";
import type { HttpMethods } from "beinformed/constants";
import type { ModularUIModel } from "beinformed/models";
export type ModularUIOptions = {
  propName?: string,
  method?: HttpMethods,
  updateModel?: ModularUIModel,
  targetModel?: ModularUIModel,
};

export type InjectedProps = {
  +modelKey: string,
  +location: Location,
  +status: string | null,
  +lastModification: number | null,
  +hasModel: boolean,
  +locale: string,
  +fetchModularUI: (href: string | Href, fetchOptions: Object) => void,
  +reloadModel: (model: ModularUIModel, options: Object) => void,
};

const modularui = (
  name: string,
  resource: string | Function,
  options?: ModularUIOptions
) => {
  const propName = get(options, "propName", "data");

  return (Component: ComponentType<any>) => {
    const WrappedComponent = (props: any) => {
      const dispatch = useDispatch();
      const location = useLocation();

      const url = useUrl(resource, { location, ...props });
      const modelKey = getKey(Component, name, url);

      // Load the model through the useModUI hook
      const modelEntry = useModularUI(modelKey, url, options);

      // handle manual reload of model
      const handleManualReload = (
        model: ModularUIModel,
        reloadOptions?: Object
      ) => {
        dispatch(reloadModel(model, reloadOptions));
      };

      // Provide connected models with a fetchModularUI method to be able
      // to run the loadModularUI action from a handler / callback in the component
      const handleFetch = (href: string | Href, fetchOptions: Object) => {
        dispatch(loadModularUI(modelKey, href, fetchOptions));
      };

      // Check if current model needs a reload
      const reload = get(location, "state.reload", 0);
      const doReload = useReload(modelEntry, reload);
      useEffect(() => {
        if (doReload) {
          dispatch(
            loadModularUI(modelKey, url, { ...options, isReload: true })
          );
        }
      }, [dispatch, doReload, url, modelKey]);

      // Remove model when hoc unloads
      useEffect(() => {
        return () => dispatch(removeModelByKey(modelKey));
      }, [dispatch, modelKey]);

      // Create new properties object to inject modularui properties to own props
      const locale = useSelector((state) => state.i18n.locale);
      const newProps: InjectedProps = {
        modelKey,
        [propName]: modelEntry ? modelEntry.model : null,
        location,
        status: modelEntry ? modelEntry.status : null,
        lastModification: modelEntry ? modelEntry.lastModification : null,
        hasModel: Boolean(modelEntry),
        locale,
        fetchModularUI: handleFetch,
        reloadModel: handleManualReload,
      };

      return <Component {...props} {...newProps} />;
    };

    WrappedComponent.displayName = `BI.modularui(${getDisplayName(
      WrappedComponent,
      name
    )}`;

    return WrappedComponent;
  };
};

export default modularui;
