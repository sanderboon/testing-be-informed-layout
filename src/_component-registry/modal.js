// @flow
import { default as _Modal } from "beinformed-ui/Modal/Modal";

export * from "beinformed-ui/Modal/StyledModal";
export { default as ModalBody } from "beinformed-ui/Modal/ModalBody";
export { default as ModalFooter } from "beinformed-ui/Modal/ModalFooter";
export { default as ModalHeader } from "beinformed-ui/Modal/ModalHeader";
export { default as ModalTitle } from "beinformed-ui/Modal/ModalTitle";
export { default as ModalBackground } from "beinformed-ui/Modal/ModalBackground";
export { default as ModalContent } from "beinformed-ui/Modal/ModalContent";

import { connector as connectModal } from "beinformed/connectors/Modal";
export const ConnectedModal = connectModal(_Modal);
