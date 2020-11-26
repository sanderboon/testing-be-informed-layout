// @flow
import LayoutHintConfiguration from "beinformed/constants/LayoutHintConfig.json";

/**
 * Retrieve layout hint by id from the layout hint configuration
 */
const getHint = (hint: string) => {
  if (LayoutHintConfiguration[hint]) {
    return LayoutHintConfiguration[hint].hint;
  }

  return "";
};

export const MANDATORY = getHint("MANDATORY");

/*
 * --------------------------------
 * ICON
 * --------------------------------
 */
export const ICON = getHint("ICON");

/*
 * --------------------------------
 * INLINE EDIT
 * --------------------------------
 */

/**
 * Renders a list as an editable list
 * @type {string}
 */
export const INLINE_EDIT_LIST = getHint("INLINE_EDIT_LIST");

/**
 * Inidicates that the inline edit list can duplicate rows. Needs a create task present
 * @type {string}
 */
export const INLINE_EDIT_CAN_DUPLICATE = getHint("INLINE_EDIT_CAN_DUPLICATE");

/*
 * --------------------------------
 * INBOX
 * --------------------------------
 */
export const INBOX_HIGHLIGHT = "highlight-flag";
export const GOTO_CASEVIEW_TASK = "go-to-case-view-task";
/*
 * --------------------------------
 * PROCESS TASKS
 * --------------------------------
 */
export const COMPLETETASK_TASKGROUP = getHint("COMPLETETASK_TASKGROUP");
export const PROCESSTASKS_TASKGROUP = getHint("PROCESSTASKS_TASKGROUP");

/*
 * --------------------------------
 * SELECT DEPENDENT ATTRIBUTES
 * --------------------------------
 */
export const DEPENDENT_ATTRIBUTE_CONTROL = "dependent-control";
export const DEPENDENT_ATTRIBUTE = "dependent-attribute:";
export const DEPENDENT_ATTRIBUTE_ACTION_SHOW = "show";
export const DEPENDENT_ATTRIBUTE_ACTION_HIDE = "hide";
export const DEPENDENT_ATTRIBUTE_OPERATOR_EQUALS = "equals";
export const DEPENDENT_ATTRIBUTE_OPERATOR_INCLUDES = "includes";
export const DEPENDENT_ATTRIBUTE_OPERATOR_NOT_EQUALS = "notEquals";
export const DEPENDENT_ATTRIBUTE_OPERATOR_NOT_INCLUDES = "notIncludes";
export const DEPENDENT_ATTRIBUTE_OPTIONS_SEPARATOR = "|";

/**
 * --------------------------------
 * ATTRIBUTES
 * --------------------------------
 */
export const ALIGN_CENTER = getHint("ALIGN_CENTER");
export const ALIGN_LEFT = getHint("ALIGN_LEFT");
export const ALIGN_RIGHT = getHint("ALIGN_RIGHT");
export const COMPACT = getHint("COMPACT");
export const CONFIRM_PASSWORD = getHint("CONFIRM_PASSWORD");
export const SORT_OPTIONS = getHint("SORT_OPTIONS");
export const TITLE = getHint("TITLE");
export const UNIT_AS_PREFIX = getHint("UNIT_AS_PREFIX");
export const SHOW_DURATION = getHint("SHOW_DURATION");

/**
 * --------------------------------
 * FORM
 * --------------------------------
 */
export const CONFIRM = getHint("CONFIRM");
export const DELETE_ACTION = getHint("DELETE_ACTION");
export const UPDATE_ACTION = getHint("UPDATE_ACTION");
export const CREATE_ACTION = getHint("CREATE_ACTION");

/*
 * --------------------------------
 * NOTIFY ABOUT FORM FINISH
 * --------------------------------
 */
export const NOTIFY = getHint("NOTIFY");

/*
 * --------------------------------
 * MULTIROW TASK CONSTANTS
 * --------------------------------
 */
export const MULTI_ROW_TASK = getHint("MULTI_ROW_TASK");

/*
 * --------------------------------
 * UPLOAD TOTAL FILE SIZE
 * --------------------------------
 */
export const INITIAL_TOTAL_FILESIZE = getHint("INITIAL_TOTAL_FILESIZE");
export const MAX_TOTAL_FILESIZE = getHint("MAX_TOTAL_FILESIZE");

/*
 * --------------------------------
 * FORM FINISH RETURN
 * --------------------------------
 */
export const FORM_FINISH_RETURN = getHint("FORM_FINISH_RETURN");
export const FORM_FINISH_RETURN_RELOAD_LIST = getHint(
  "FORM_FINISH_RETURN_RELOAD_LIST"
);

/*
 * --------------------------------
 * LISTS
 * --------------------------------
 * Set on lists that have the option 'show one result in table' unchecked. hides the lists and shows only the details
 */
export const SHOW_ONE_RESULT_AS_DETAIL = getHint("SHOW_ONE_RESULT_AS_DETAIL");
export const GOTO_CASEVIEW = getHint("GOTO_CASEVIEW");
export const SHOW_ATTRIBUTE_SET_LABELS_IN_DETAILS = getHint(
  "SHOW_ATTRIBUTE_SET_LABELS_IN_DETAILS"
);
export const HIDE_WHEN_EMPTY = getHint("HIDE_WHEN_EMPTY");
export const CASEVIEW_LINK = getHint("CASEVIEW_LINK");

/*
 * --------------------------------
 * GROUPING PANEL
 * --------------------------------
 */
export const KEEP_SIDEBAR = getHint("KEEP_SIDEBAR");
export const HAS_LIST_WITH_FILTERS = "has-list-with-filters";

/*
 * --------------------------------
 * FORM CONTENT
 * --------------------------------
 * Can be set on event and instrument questions to hide it's label
 */
export const HIDE_LABEL = getHint("HIDE_LABEL");

// Set on configuration of instruments to show content in a popover on a label
export const POPUP = "popup";
export const RENDER_CHILD_SECTIONS = "render-child-sections";
export const RENDER_SECTION_LABEL = "render-section-label";
export const EMPHASIS = "emphasis";
export const FULL_WIDTH = "full-width";
export const HALF_WIDTH = "half-width";
export const PROPERTY_SHOW_WHEN_EMPTY = "show-when-empty";

export default getHint;
