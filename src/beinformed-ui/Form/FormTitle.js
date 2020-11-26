// @flow
import classNames from "classnames";
import styled, { css } from "styled-components";
import { themeProp, spacer } from "beinformed/theme/utils";

export type Props = {
  +className?: string,
  +title: string,
  +isModal?: boolean,
};

const StyledTitle = styled.h2`
  font-size: ${themeProp("FONT_SIZE_H2", "1.5rem")};
  ${(props) =>
    props.isModal
      ? css`
          margin-bottom: 0;
          line-height: 1.5;
        `
      : css`
          margin-bottom: ${spacer(1.5)};
        `};
`;

const FormTitle = ({ className, title, isModal = false }: Props) => (
  <StyledTitle
    className={classNames("form-title", className)}
    isModal={isModal}
  >
    {title}
  </StyledTitle>
);

FormTitle.displayName = "BI.FormTitle";

export default FormTitle;
