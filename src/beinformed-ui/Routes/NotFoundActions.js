// @flow
import { useDispatch } from "react-redux";

import xhr from "beinformed/utils/fetch/xhr";

import { BASE, HTTP_METHODS } from "beinformed/constants/Constants";
import { handleError } from "beinformed/redux/actions/Error";

import type { Match } from "react-router";
export type Props = {
  +match: Match,
};

const NotFoundActions = ({ match }: Props) => {
  const dispatch = useDispatch();
  xhr({
    url: `${BASE}/${match.url}`,
    method: HTTP_METHODS.POST,
  }).catch((response) => {
    dispatch(handleError(response));
  });

  return null;
};

export default NotFoundActions;
