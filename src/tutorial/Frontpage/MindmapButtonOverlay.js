import React, {useState} from 'react'
import styled from 'styled-components'

import { Helmet } from "react-helmet-async";

import { withNavigation } from "beinformed/connectors/Router";

import { Button } from "_component-registry/buttons";

import { Message } from "beinformed/i18n";

import MindMap from "../CustomNuModalbody/Mindmap-bijstand-verlaging.png";

import {
    ConnectedModal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
  } from "_component-registry/modal";
  

import MindmapTab from "../CustomNuModalbody/CustomMindmapTab"

// import MindmapComponent from '../MindMapjQuery/Mindmap'

import ClockTimePicker from '../MindMapjQuery/ClockTimePicker'

// import TestMindmap from '../MindMapjQuery/TestMindmap'





const StyledConnectedModal = styled(ConnectedModal)`
display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 300;
  max-width: 80%;
  

  @media (min-width: 1024px) {
    flex-wrap: nowrap;
  }
`;

const StyledIframe = styled.iframe`
display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100%;
  max-height: 100%;
`


export default function TestFrontpage () {
const [buttonToggle, setButtonToggle] = useState(false)


return (
    <div>
        <Button onClick={() => setButtonToggle(!buttonToggle)}>Show mindmap</Button>
        {buttonToggle ? 
    <StyledConnectedModal size={"max"}>
    <Helmet>
      <title>Mindmap</title>
    </Helmet>
    <ModalHeader showClose onClose={() => setButtonToggle(!buttonToggle)}>
      <ModalTitle>Mindmap</ModalTitle>
    </ModalHeader>
    <ModalBody>

{/* 
    In de modalBody willen we een interactieve jQuery applicatie implementeren. 
    De ClockTimePicker plugin is maar een simpele test om te kijken hoe het zou werken.
    De daadwerklijke jQuery applicatie is geen Node package maar een custom gemaakte applicatie door Tim. 
    
*/}

    <StyledIframe src="http://81.204.36.205:80" height="1500" width="1800" title="Iframe Example"></StyledIframe>   
     <ClockTimePicker />
         
    </ModalBody>
    <ModalFooter>
      <Button type="button" name="close" onClick={() => setButtonToggle(!buttonToggle)}>
        <Message defaultMessage="Close" />
      </Button>
    </ModalFooter>
  </StyledConnectedModal> : null }
    </div>
)
}