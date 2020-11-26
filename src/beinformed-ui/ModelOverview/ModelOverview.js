// @flow
import { Component } from "react";

import classNames from "classnames";
import styled from "styled-components";
import { themeProp, spacer } from "beinformed/theme/utils";

import xhr from "beinformed/utils/fetch/xhr";

import { withModularUI } from "beinformed/modularui";
import { Href } from "beinformed/models";

import { BASE } from "beinformed/constants/Constants";
import { getSetting } from "beinformed/constants/Settings";

import DefaultModelOverview from "./DefaultModelOverview.json";

import {
  ModelOverviewSelector,
  ModelOverviewLane,
} from "_component-registry/modelcatalog";
import { Heading } from "_component-registry/elements";

import type { ConceptIndexModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +modularui: any,
  +startProgress: () => void,
  +finishProgress: () => void,
};

type State = {
  config: Object,
  activeOverview: string,
  overviewIndex: { [key: string]: ConceptIndexModel },
};

const StyledLanes = styled.div`
  margin-bottom: ${spacer(2.5)};
`;

const StyledModelOverviewSelector = styled.div`
  float: right;
`;

const StyledHeading = styled(Heading)`
  font-size: ${themeProp("FONT_SIZE_H4")};
  font-weight: ${themeProp("HEADING_FONT_WEIGHT")};
  color: ${themeProp("HEADER_COLOR")};

  margin-bottom: ${spacer()};
`;

/**
 * Renders the business model overview
 */
class ModelOverview extends Component<Props, State> {
  state: State = {
    activeOverview: "TOM",
    config: null,
    overviewIndex: {},
  };

  componentDidMount() {
    this.getConfig();
  }

  setConfig(config) {
    this.setState({
      config,
      activeOverview: config[0].key,
    });
  }

  getConfigLocation() {
    const setting = getSetting(
      "SWIM_LANE_DIAGRAM_CONFIGURATION",
      "/Library/Diagrams/Overviews.json"
    );

    if (setting.startsWith("/")) {
      return setting;
    }

    return `/${setting}`;
  }

  getConfig() {
    xhr({
      url: `${BASE}/resource${this.getConfigLocation()}`,
    })
      .then((config) => {
        const [rootKey] = Object.keys(config);
        this.setConfig(config[rootKey]);
      })
      .catch(() => {
        this.setConfig(DefaultModelOverview.overviews);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.config !== null &&
      this.state.activeOverview !== prevState.activeOverview &&
      !this.state.overviewIndex[this.state.activeOverview]
    ) {
      const overviewConfig = this.state.config.find(
        (item) => item.key === this.state.activeOverview
      );
      this.loadModelOverview(overviewConfig);
    }
  }

  loadModelOverview(overviewConfig: Object) {
    const { modularui, startProgress, finishProgress } = this.props;

    const conceptTypeFilter = overviewConfig.lanes
      .map((lane) => {
        return lane.conceptTypes.join(",");
      })
      .join(",");

    const indexHref = new Href("/concepts").addParameter(
      "type",
      conceptTypeFilter
    );

    startProgress();

    modularui(indexHref)
      .fetchFromCache()
      .then((modelIndex) => {
        if (modelIndex.items.hasItems) {
          this.setState((prevState) => ({
            overviewIndex: {
              ...prevState.overviewIndex,
              [prevState.activeOverview]: modelIndex,
            },
          }));
        }
        finishProgress();
      });
  }

  handleOverviewChange = (overviewID: string) => {
    this.setState({
      activeOverview: overviewID,
    });
  };

  render() {
    if (!this.state.config) {
      return null;
    }

    const overviews = this.state.config.map((item) => ({
      key: item.key,
      label: item.label,
    }));

    const activeConfig = this.state.config.find(
      (item) => item.key === this.state.activeOverview
    );

    const conceptIndex = this.state.overviewIndex[this.state.activeOverview];

    if (conceptIndex) {
      return (
        <div
          className={classNames("model-overview", this.props.className)}
          data-active={this.state.activeOverview}
        >
          <StyledModelOverviewSelector
            as={ModelOverviewSelector}
            align="right"
            overviews={overviews}
            activeOverview={this.state.activeOverview}
            onChange={this.handleOverviewChange}
          />

          {conceptIndex && (
            <StyledHeading as="h3" className="model-overview-title">
              {activeConfig.label}
            </StyledHeading>
          )}

          {conceptIndex && (
            <StyledLanes>
              {activeConfig.lanes.map((lane) => (
                <ModelOverviewLane
                  key={`${this.state.activeOverview}${lane.key}`}
                  lane={lane}
                  conceptIndex={conceptIndex}
                />
              ))}
            </StyledLanes>
          )}
        </div>
      );
    }

    return null;
  }
}

ModelOverview.displayName = "BI.ModelOverview";

export default withModularUI(ModelOverview);
