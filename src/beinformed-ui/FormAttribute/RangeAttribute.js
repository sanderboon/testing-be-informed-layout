// @flow
import { useSelector } from "react-redux";

import styled, { css } from "styled-components";

import { themeProp } from "beinformed/theme/utils";

import { Tooltip } from "_component-registry/tooltip";
import { Icon } from "_component-registry/icon";

import { intervalToDuration } from "date-fns";

import {
  BaseAttribute,
  AttributeRenderer,
} from "_component-registry/attributes";

import type { CompositeAttributeModel } from "beinformed/models";
import type { Props } from "beinformed-ui/FormAttribute/BaseAttribute";

import { SHOW_DURATION } from "beinformed/constants/LayoutHints";

type RangeAttributeProps = { +namePrefix?: string };

const getDuration = (attribute, locale) => {
  const hasValues = attribute.start.value && attribute.end.value;

  if (!attribute.isValid || !hasValues) {
    return "";
  }

  const dateFormatter = attribute.start.formatUtil;
  const startDate = dateFormatter.toDate(attribute.start.value);
  const endDate = dateFormatter.toDate(attribute.end.value);

  const duration = intervalToDuration({ start: startDate, end: endDate });

  let strDuration = "";
  Object.keys(duration).forEach((key) => {
    if (duration[key] && duration[key] > 0) {
      strDuration = strDuration.concat(
        `${duration[key]}${key.substring(0, 1)} `
      );
    }
  });

  if (locale === "nl") {
    strDuration = strDuration.replace("h", "u");
  }

  return strDuration.trim();
};

const StyledAttributeRenderer = styled.div`
  display: block;
  margin-bottom: 0;
  margin-right: 0;
`;

const StyledStartAttributeRenderer = styled(StyledAttributeRenderer)`
  padding-right: 1.5em;

  .datetime-input {
    position: relative;

    &:after {
      display: block;
      content: "-";

      position: absolute;
      right: -1.5em;
      top: 0.5em;
    }
  }
`;

const StyledEndAttributeRenderer = styled(StyledAttributeRenderer)`
  .datetime-input {
    position: relative;

    ${({ duration, showDurationIcon }) =>
      !showDurationIcon &&
      css`
        &:after {
          display: block;
          position: relative;
          top: 0.5em;
          right: -1.5em;
          content: "${duration}";
        }
      `};
  }
`;

const StyledDuration = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledIcon = styled(Icon)`
  color: ${themeProp("GREY_400")};
`;

const RangeAttribute = ({
  className,
  attribute,
  name,
  id,
  namePrefix,
  questionContentConfiguration,
  formLayout,
  onChange,
  onClick,
  onBlur,
  onFocus,
}: {
  ...Props<CompositeAttributeModel>,
  ...RangeAttributeProps,
}) => {
  const locale = useSelector((state) => state.i18n.locale);

  const getChildName = (childAttribute) => {
    if (childAttribute.name.startsWith(name)) {
      return `${namePrefix || ""}${childAttribute.name}`;
    }

    return `${name}.${childAttribute.name}`;
  };

  const duration = attribute.layouthint.has(SHOW_DURATION)
    ? getDuration(attribute, locale)
    : "";

  // only show duration icon for timestamp attribute types
  const showDurationIcon = attribute.start.type === "timestamp" && duration;

  return (
    <BaseAttribute
      className={className}
      attribute={attribute}
      name={name}
      id={id}
      questionContentConfiguration={questionContentConfiguration}
      formLayout={formLayout}
      onChange={onChange}
      onClick={onClick}
      onBlur={onBlur}
      onFocus={onFocus}
      renderInput={() => {
        const startName = getChildName(attribute.start);
        const endName = getChildName(attribute.end);

        return (
          <StyledWrapper data-duration={duration}>
            <StyledStartAttributeRenderer
              as={AttributeRenderer}
              className="range-begin"
              questionContentConfiguration={questionContentConfiguration}
              attribute={attribute.start}
              name={startName}
              id={startName}
              onChange={onChange}
              onBlur={onBlur}
              onFocus={onFocus}
            />

            <StyledEndAttributeRenderer
              as={AttributeRenderer}
              className="range-end"
              questionContentConfiguration={questionContentConfiguration}
              attribute={attribute.end}
              name={endName}
              id={endName}
              onChange={onChange}
              onBlur={onBlur}
              onFocus={onFocus}
              duration={duration}
              showDurationIcon={showDurationIcon}
            />
            {showDurationIcon && (
              <StyledDuration>
                <Tooltip content={duration}>
                  <StyledIcon size={20} name="information-outline" />
                </Tooltip>
              </StyledDuration>
            )}
          </StyledWrapper>
        );
      }}
    />
  );
};

RangeAttribute.displayName = "BI.RangeAttribute";

export default RangeAttribute;
