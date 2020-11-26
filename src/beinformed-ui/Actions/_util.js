// @flow
import { ICON, GOTO_CASEVIEW_TASK } from "beinformed/constants/LayoutHints";

import type { ActionModel } from "beinformed/models";

export const getProcessTaskIcon = (
  transition: string = "",
  concequenceType: string = ""
) => {
  switch (transition) {
    case "associates":
      if (concequenceType.toLowerCase() === "compoundprocess") {
        return "associates-compound-process";
      }
      return "associates-object";
    case "creates":
      switch (concequenceType.toLowerCase()) {
        case "caseobject":
          return "creates-case-object";
        case "compoundprocess":
          return "creates-compound-process";
        case "document":
          return "adds";
        case "note":
          return "creates-note";
        default:
          return "creates";
      }
    case "performs":
      if (concequenceType.toLowerCase() === "compoundprocess") {
        return "performs-compound-process";
      }
      return "performs-compound-process-element";
    case "ends":
      return "expires";
    default:
      return transition;
  }
};

const iconObject = (name: string, type: string = "font") => ({
  type,
  name,
});

export const getIconFromAction = (
  action: ActionModel,
  isProcessTaskGroup: boolean = false,
  isCompleteTaskGroup: boolean = false
) => {
  const iconFromHint = action.layouthint.getLayoutHintValue(ICON);

  if (iconFromHint) {
    return iconObject(iconFromHint);
  }

  if (action.layouthint.has(GOTO_CASEVIEW_TASK)) {
    return iconObject("folder-open");
  }

  if (isCompleteTaskGroup) {
    return iconObject("check", "process");
  }

  if (isProcessTaskGroup && action.isProcessTask && action.processStatus) {
    if (action.processStatus.isCompleted) {
      return iconObject("check", "process");
    }

    const processTaskIcon = getProcessTaskIcon(
      action.processStatus.transition,
      action.processStatus.concequenceType
    );

    return iconObject(processTaskIcon, "process");
  }

  switch (action.type) {
    case "create":
      return iconObject("plus");
    case "update":
      return iconObject("pencil");
    case "delete":
      return iconObject("delete");
    default:
      return iconObject("cog");
  }
};
