// @flow
import React, {useState} from 'react'
import { Helmet } from "react-helmet-async";


import { withNavigation } from "beinformed/connectors/Router";

import { Button } from "_component-registry/buttons";


import { Message } from "beinformed/i18n";

import {
  ConnectedModal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "_component-registry/modal";

import MindMap from "./Mindmap-bijstand-verlaging.png";

const MindmapTab = ({goBack}) => {
    const [pic,setPic] = useState(false)

const sendHttpRequest = (method,url) => {
    const promise = new Promise ((resolve, reject) => {
          const xhr = new XMLHttpRequest()
    xhr.open(method, url)

    xhr.responseType = 'json'

    xhr.onload = () => {
        resolve(xhr.response)
    }

    xhr.send()
    })
    return promise
}
const getData = () => {
    sendHttpRequest('GET', 'https://dog.ceo/api/breeds/image/random').then(responseData => {
        setPic(responseData.message)
        console.log(responseData)
    })
}
const sendData = () => {
    sendHttpRequest('POST', 'https://reqres.in/api/users/2', {
        name: "morpheus",
        job: "zion resident"
    })
}
    return(
    <ConnectedModal size={"max"}>
    <Helmet>
      <title>Mindmap</title>
    </Helmet>
    <ModalHeader showClose onClose={() => goBack()}>
      <ModalTitle>Mindmap</ModalTitle>
    </ModalHeader>
    <ModalBody>
        {/* <Button onClick={ () => getData()}>GET data</Button>
        <Button onClick={ () => sendData()}>POST data</Button>
     {pic ? <img src={pic} alt=''/> : <img src={MindMap} alt=''/> } */}
     <iframe src="https://www.nu.nl" height="1500" width="2000" title="Iframe Example"></iframe>
    </ModalBody>
    <ModalFooter>
      <Button type="button" name="close" onClick={() => goBack()}>
        <Message defaultMessage="Close" />
      </Button>
    </ModalFooter>
  </ConnectedModal>)
};


export default withNavigation(MindmapTab);
