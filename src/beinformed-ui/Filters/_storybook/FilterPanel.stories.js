import { KNOB_GROUPS } from "_storybook/constants";

import { text } from "@storybook/addon-knobs";

import { FilterPanel, FilterRenderer } from "_component-registry/filters";
import { Row, Column } from "_component-registry/grid";

import { booksList } from "./booksList";

export default {
  title: "Filters/FilterPanel",
  component: FilterPanel,
};

const StoryFilterWrapper = (props) => {
  return (
    <Row>
      <Column {...props} size={3} />
    </Row>
  );
};

export const interactive = () => {
  const [filter] = booksList.filterCollection.all;

  return (
    <StoryFilterWrapper
      as={FilterPanel}
      name={filter.name}
      label={text("label", filter.label, KNOB_GROUPS.COMPONENT)}
      contextLabel={text(
        "contextLabel",
        filter.contextLabel,
        KNOB_GROUPS.COMPONENT
      )}
    >
      <FilterRenderer filter={filter} />
    </StoryFilterWrapper>
  );
};

export const withContextLabel = () => {
  const [filter] = booksList.filterCollection.all;

  return (
    <StoryFilterWrapper
      as={FilterPanel}
      name={filter.name}
      label={text("label", filter.label, KNOB_GROUPS.COMPONENT)}
      contextLabel="Aantal"
    >
      <FilterRenderer filter={filter} />
    </StoryFilterWrapper>
  );
};
