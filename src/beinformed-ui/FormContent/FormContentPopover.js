// @flow
import { memo } from "react";

import styled from "styled-components";
import { spacer } from "beinformed/theme/utils";

import { POPUP } from "beinformed/constants/LayoutHints";

import { FormContentRenderer } from "_component-registry/formcontent";
import { IconPopover } from "_component-registry/popover";

import type {
  ConceptDetailModel,
  ContentConfigurationElements,
} from "beinformed/models";
export type Props = {
  +className?: string,
  +concept: ConceptDetailModel | null,
  +contentConfiguration?: ContentConfigurationElements | null,
};

const StyledIconPopover = styled(IconPopover)`
  margin-left: ${spacer(0.5)};
`;

const FormContentPopover = memo<Props>(
  ({ className, concept, contentConfiguration }: Props) => {
    if (
      concept &&
      contentConfiguration &&
      contentConfiguration.hasLayoutHint(POPUP)
    ) {
      return (
        <FormContentRenderer
          className={className}
          concept={concept}
          contentConfiguration={contentConfiguration.includeLayoutHints([
            POPUP,
          ])}
          ContentWrapperComponent={<StyledIconPopover placement="bottom" />}
        />
      );
    }

    return null;
  }
);

FormContentPopover.displayName = "BI.FormContentPopover";

export default FormContentPopover;
