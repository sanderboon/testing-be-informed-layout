import React, {useState} from 'react'

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

export default function TestFrontpage () {
const [buttonToggle, setButtonToggle] = useState(false)
// const [pic,setPic] = useState(false)


// const sendHttpRequest = (method,url) => {
//     const promise = new Promise ((resolve, reject) => {
//           const xhr = new XMLHttpRequest()
//     xhr.open(method, url)

//     xhr.responseType = 'json'

//     xhr.onload = () => {
//         resolve(xhr.response)
//     }

//     xhr.send()
//     })
//     return promise
  
// }


// const getData = () => {
//     sendHttpRequest('GET', 'https://dog.ceo/api/breeds/image/random').then(responseData => {
//         setPic(responseData.message)
//         console.log(responseData)
//     })
// }

// const sendData = () => {
//     sendHttpRequest('POST', 'https://reqres.in/api/users/2', {
//         name: "morpheus",
//         job: "zion resident"
//     })
// }

return (
    <div>
        <Button onClick={() => setButtonToggle(!buttonToggle)}>Show probleem conceptmap</Button>
        {buttonToggle ? 
    <ConnectedModal size={"max"}>
    <Helmet>
      <title>Probleem conceptmap</title>
    </Helmet>
    <ModalHeader showClose onClose={() => setButtonToggle(!buttonToggle)}>
      <ModalTitle>Probleem conceptmap</ModalTitle>
    </ModalHeader>
    <ModalBody>
    <iframe src="http://81.204.36.205:80" height="1500" width="1800" title="Iframe Example"></iframe>
    </ModalBody>
    <ModalFooter>
      <Button type="button" name="close" onClick={() => setButtonToggle(!buttonToggle)}>
        <Message defaultMessage="Close" />
      </Button>
    </ModalFooter>
  </ConnectedModal> : null }
    </div>
)
}