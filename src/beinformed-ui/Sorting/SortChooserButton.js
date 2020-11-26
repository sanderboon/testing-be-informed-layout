// @flow
import { forwardRef } from "react";

import { Message } from "beinformed/i18n";

import { DropdownButton } from "_component-registry/dropdown";
import { Icon } from "_component-registry/icon";

import { getGroupLabel } from "./_util";

import type { SortingModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +sorting: SortingModel,
  +buttonStyle?: "DEFAULT" | "PRIMARY" | "SECONDARY" | "DANGER" | "LINK",
  +size?: "small" | "large" | "default",
};

const SortChooserButton = forwardRef<Props, any>(
  ({ className, sorting, buttonStyle, size, ...props }: Props, ref) => {
    const selectedOptions = sorting.filter((option) => option.selected);

    return (
      <DropdownButton
        ref={ref}
        className={className}
        buttonStyle={buttonStyle}
        size={size}
        {...props}
      >
        {selectedOptions.length === 0 ? (
          <Message
            id="SortChooser.SortDefaultLabel"
            defaultMessage="Sort by relevance"
          />
        ) : (
          selectedOptions.map((option) => {
            const label = [option.label];
            const groupLabel = getGroupLabel(option.group, option);
            if (groupLabel) {
              label.push(groupLabel);
            }

            return (
              <span key={option.key}>
                <Message
                  id="SortChooser.SortBy"
                  defaultMessage="Sort by {COLUMN_NAME}"
                  data={{ COLUMN_NAME: label.join(" ") }}
                />
                <Icon
                  name={
                    option.sortorder === "desc"
                      ? "sort-descending"
                      : "sort-ascending"
                  }
                  textBefore
                />
              </span>
            );
          })
        )}
      </DropdownButton>
    );
  }
);

SortChooserButton.displayName = "SortChooserButton";

export default SortChooserButton;
