// @flow
import { useState, useEffect } from "react";

import FocusTrap from "focus-trap-react";

import classNames from "classnames";
import { createGlobalStyle } from "styled-components";

import {
  StyledModal,
  ModalBackground,
  ModalContent,
} from "_component-registry/modal";

import { uniqueId } from "lodash";

import type { Node } from "react";
export type Props = {
  +children?: Node,
  +className?: string,
  +size?: "small" | "medium" | "large" | "max",
  +visibleModalKey: string | null,
  +visibleModalSize?: string | null,
  +onShowModal: (modalKey: string) => void,
  +onCloseModal: (modalKey: string) => void,
};

const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

const getFirstFocusableElement = () => {
  const selectors = [
    "button:not(.close):not(.btn-previous):not(.btn-cancel):not(.toggle-popover)",
    "[href]",
    "input",
    "select",
    "textarea",
    '[tabindex]:not([tabindex="-1"])',
  ];

  const selector = selectors
    .map(
      (selector) => `.modal ${selector}:not(.no-initial-focus):not([disabled])`
    )
    .join(",");

  const focusableElements = document.querySelectorAll(selector);

  if (focusableElements.length > 0) {
    return focusableElements[0];
  }

  return null;
};

const Modal = ({
  className,
  children,
  size,
  visibleModalKey,
  visibleModalSize,
  onShowModal,
  onCloseModal,
}: Props) => {
  const [modalId, setModalId] = useState(null);
  const [firstFocusableElement, setFirstFocusableElement] = useState(null);

  useEffect(() => {
    const _timer = setTimeout(() => {
      setFirstFocusableElement(getFirstFocusableElement());
    }, 100);
    return () => clearTimeout(_timer);
  }, []);

  useEffect(() => {
    const modId = uniqueId("modal");
    setModalId(modId);

    onShowModal(modId);
    if (document.body) {
      document.body.classList.add("modal-open");
    }

    return () => {
      onCloseModal(modId);
      if (document.body) {
        document.body.classList.remove("modal-open");
      }
    };
  }, [onCloseModal, onShowModal]);

  useEffect(() => {
    if (firstFocusableElement) {
      firstFocusableElement.focus();
    }
  }, [firstFocusableElement]);

  const modalSize = visibleModalSize || size;
  return (
    <>
      <ModalBackground
        className="modal"
        isHidden={visibleModalKey !== modalId}
        role="dialog"
      >
        <FocusTrap
          focusTrapOptions={{
            clickOutsideDeactivates: true,
          }}
        >
          <StyledModal
            className={classNames(className, "modal-dialog")}
            role="document"
            size={modalSize}
          >
            <ModalContent className="modal-content">{children}</ModalContent>
          </StyledModal>
        </FocusTrap>
      </ModalBackground>
      <GlobalStyle />
    </>
  );
};

Modal.displayName = "BI.Modal";

export default Modal;
