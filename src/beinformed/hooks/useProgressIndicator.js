// @flow
import { useDispatch } from "react-redux";
import {
  startProgress,
  finishProgress,
  resetProgress,
  updateProgress,
} from "beinformed/redux/actions/ProgressIndicator";

const useProgressIndicator = () => {
  const dispatch = useDispatch();

  return {
    start: () => dispatch(startProgress()),
    finish: () => dispatch(finishProgress()),
    reset: () => dispatch(resetProgress()),
    update: (percentComplete: number) =>
      dispatch(updateProgress(percentComplete)),
  };
};

export default useProgressIndicator;
