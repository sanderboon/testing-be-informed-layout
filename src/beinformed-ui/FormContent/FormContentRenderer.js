// @flow
import { cloneElement } from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";
import { spacer } from "beinformed/theme/utils";

import {
  EMPHASIS,
  HALF_WIDTH,
  PROPERTY_SHOW_WHEN_EMPTY,
  RENDER_CHILD_SECTIONS,
  RENDER_SECTION_LABEL,
} from "beinformed/constants/LayoutHints";

import { SourceReferences } from "_component-registry/concept";
import {
  FormContentProperties,
  FormContentTextFragments,
} from "_component-registry/formcontent";
import classNames from "classnames";

import type {
  ConceptDetailModel,
  ContentConfigurationElements,
} from "beinformed/models";
export type Props = {
  +className?: string,
  +concept: ConceptDetailModel | null,
  +contentConfiguration?: ContentConfigurationElements | null,
  +types?: Array<string>,
  +ContentWrapperComponent?: any,
  +renderLabel?: boolean,
};

const StyledContentElement = styled.div`
  ${(props) => props.isEmphasis && `font-weight: 700;`}

  & > div {
    margin-bottom: ${spacer()};
  }
`;

const getConfig = (contentConfiguration, types, concept, availableLanguages) =>
  contentConfiguration.byTypes(types).map((config) => {
    if (config.type === "contentElement") {
      return {
        type: "sourceReferences",
        content: concept
          .getSourceReferenceCollection(availableLanguages)
          .byTypes(config.types),
        layouthint: config.layouthint,
      };
    }

    if (config.type === "textFragmentElement") {
      return {
        type: "textFragments",
        content: concept.getTextFragmentByKeys(config.types),
        layouthint: config.layouthint,
      };
    }

    if (config.type === "propertyElement") {
      return {
        type: "properties",
        content: concept.getConceptPropertiesByIds(config.types),
        layouthint: config.layouthint,
      };
    }

    return { type: config.type, content: [], layouthint: config.layouthint };
  });

const FormContentRenderer = ({
  className,
  types,
  ContentWrapperComponent,
  contentConfiguration,
  concept,
  renderLabel,
}: Props) => {
  const availableLanguages = useSelector(
    (state) => state.i18n.locales.availableLocaleCodes
  );

  if (!contentConfiguration || !concept) {
    return null;
  }

  const config = getConfig(
    contentConfiguration,
    types,
    concept,
    availableLanguages
  ).filter(({ content }) => content.length > 0);
  if (config.length === 0) {
    return null;
  }

  const contentElements = config.map(({ type, content, layouthint }, index) => {
    if (type === "sourceReferences") {
      return (
        <SourceReferences
          key={`${type}-${index}`}
          renderChildSections={layouthint.has(RENDER_CHILD_SECTIONS)}
          renderSectionLabel={layouthint.has(RENDER_SECTION_LABEL)}
          sourceReferences={content}
        />
      );
    }

    if (type === "textFragments") {
      return (
        <StyledContentElement
          as={FormContentTextFragments}
          key={`${type}-${index}`}
          hasEmpasis={layouthint.has(EMPHASIS)}
          halfWidth={layouthint.has(HALF_WIDTH)}
          renderLabel={renderLabel}
          textfragments={content}
        />
      );
    }

    if (type === "properties") {
      return (
        <StyledContentElement
          as={FormContentProperties}
          key={`${type}-${index}`}
          hasEmpasis={layouthint.has(EMPHASIS)}
          halfWidth={layouthint.has(HALF_WIDTH)}
          renderEmpty={layouthint.has(PROPERTY_SHOW_WHEN_EMPTY)}
          properties={content}
        />
      );
    }

    return null;
  });

  if (ContentWrapperComponent) {
    return cloneElement(ContentWrapperComponent, {
      children: (
        <div className={classNames("content", className)}>
          {contentElements}
        </div>
      ),
    });
  }

  return (
    <div className={classNames("content", className)}>{contentElements}</div>
  );
};

FormContentRenderer.displayName = "BI.FormContentRenderer";

export default FormContentRenderer;
