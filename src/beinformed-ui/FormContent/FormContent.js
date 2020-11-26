// @flow
import { memo } from "react";

import { FormContentRenderer } from "_component-registry/formcontent";
import { POPUP } from "beinformed/constants/LayoutHints";

import type {
  ConceptDetailModel,
  ContentConfigurationElements,
} from "beinformed/models";
export type Props = {
  +className?: string,
  +concept: ConceptDetailModel | null,
  +contentConfiguration?: ContentConfigurationElements | null,
};

const FormContent = memo<Props>(
  ({ className, concept, contentConfiguration }: Props) => {
    if (concept && contentConfiguration) {
      return (
        <FormContentRenderer
          className={className}
          key="content-plain"
          concept={concept}
          contentConfiguration={contentConfiguration.excludeLayoutHints([
            POPUP,
          ])}
        />
      );
    }

    return null;
  }
);

FormContent.displayName = "BI.FormContent";

export default FormContent;
