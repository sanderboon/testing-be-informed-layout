// @flow
import { useDispatch } from "react-redux";
import { reloadModel } from "beinformed/redux/actions/ModularUI";

import type { ModularUIModel } from "beinformed/models";

const useModels = () => {
  const dispatch = useDispatch();
  return {
    reload: (model: ModularUIModel, options?: Object) => {
      dispatch(reloadModel(model, options));
    },
  };
};

export default useModels;
