// @flow
import { KNOB_GROUPS } from "_storybook/constants";

import { boolean } from "@storybook/addon-knobs";

import { ListHeader } from "_component-registry/list";

import { booksList } from "./booksList";

export default {
  title: "List/ListHeader",
  component: ListHeader,
};

/**
 * Interactive
 */
export const interactive = () => {
  return (
    <ListHeader
      list={booksList}
      isRoot={boolean("isRoot", false, KNOB_GROUPS.COMPONENT)}
    />
  );
};
