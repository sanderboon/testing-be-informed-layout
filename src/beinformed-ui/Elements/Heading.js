// @flow

import styled from "styled-components";

import { themeProp } from "beinformed/theme/utils";

const Heading = styled.h1`
  margin-bottom: ${themeProp("HEADING_MARGIN_BOTTOM", "0.5rem")};
  color: ${themeProp("HEADING_COLOR")};

  font-family: ${themeProp("HEADING_FONT_FAMILY")};
  font-weight: ${themeProp("HEADING_FONT_WEIGHT", 500)};
  font-size: ${({ as }) =>
    themeProp(
      as ? `FONT_SIZE_${as.toUpperCase()}` : "FONT_SIZE_H1",
      "1.75rem"
    )};
  line-height: ${themeProp("HEADING_LINE_HEIGHT", 1.2)};
`;

Heading.displayName = "BI.Heading";

export default Heading;
