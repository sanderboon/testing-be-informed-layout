// @flow
import React, {useState} from "react";
 
import styled from "styled-components";
import { spacer } from "beinformed/theme/utils";
 
import { Row, Column } from "_component-registry/grid";
import { LinkButton } from "_component-registry/buttons";
 
import DemoImage from "./Research-Grants-Cartoon.png";
import CustomMindmapTab from "../CustomNuModalbody/CustomMindmapTab";

import MindmapButtonOverlay from "./MindmapButtonOverlay";



 
const StyledFrontpage = styled.div`
  padding: ${spacer(2)};
`;



const Frontpage = () => (


  <StyledFrontpage>
    <Row>
      <Column>
        <h1>Research Grant Tutorial</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempus
          nibh id urna euismod, non semper mi maximus. Vivamus velit eros,
          iaculis et vestibulum sed, imperdiet a mi.
        </p>
        <p>
          Etiam non risus egestas enim ultrices ultricies id et magna. Etiam a
          augue luctus, pulvinar felis ac, finibus ligula. Maecenas scelerisque
          ligula et felis egestas, et tristique nunc tincidunt.
        </p>
        <LinkButton
          href="/applications/applications/create"
          className="btn btn-lg btn-primary"
        >
          Apply for a research grant
        </LinkButton>
          <MindmapButtonOverlay />
         

      </Column>
      <Column>
        <img src={DemoImage} alt="Teaser" />
      </Column>
    </Row>
   
  </StyledFrontpage>
);
 
Frontpage.displayName = "Tutorial.Frontpage";
 
export default Frontpage;