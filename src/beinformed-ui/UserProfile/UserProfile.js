// @flow
import { Helmet } from "react-helmet-async";

import classNames from "classnames";

import { withNavigation } from "beinformed/connectors/Router";

import { Button } from "_component-registry/buttons";
import { AttributeList } from "_component-registry/attributes-readonly";

import { Message } from "beinformed/i18n";

import {
  ConnectedModal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "_component-registry/modal";

import type { UserModel } from "beinformed/models";
export type Props = {
  +user: UserModel,
  +className?: string,
  +goBack: Function,
};

const UserProfile = ({ user, className, goBack }: Props) => (
  <ConnectedModal className={classNames("userprofile-modal", className)}>
    <Helmet>
      <title>{user.fullname}</title>
    </Helmet>
    <ModalHeader showClose onClose={() => goBack()}>
      <ModalTitle>{user.fullname}</ModalTitle>
    </ModalHeader>
    <ModalBody>
      <AttributeList attributes={user.attributeCollection.all} />
    </ModalBody>
    <ModalFooter>
      <Button type="button" name="close" onClick={() => goBack()}>
        <Message id="Login.Button.Close" defaultMessage="Close" />
      </Button>
    </ModalFooter>
  </ConnectedModal>
);

UserProfile.displayName = "BI.UserProfile";

export default withNavigation(UserProfile);
