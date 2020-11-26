// @flow
import { Href } from "beinformed/models";

import { modularui } from "beinformed/modularui";

export const connector = modularui(
  "ContentDetailSection",
  ({ sectioncontent, section, entryDate }) =>
    new Href(
      `/content/${decodeURIComponent(sectioncontent)}/${section}`
    ).addParameter("entryDate", entryDate),
  { propName: "content" }
);
