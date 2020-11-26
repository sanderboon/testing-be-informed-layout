// @flow
import { Message } from "beinformed/i18n";

import { Button } from "_component-registry/buttons";

export type Props = {
  +className?: string,
  +onClick: () => void,
};

const AddButton = ({ className, onClick }: Props) => (
  <Button
    className={className}
    type="button"
    name="add"
    buttonStyle="PRIMARY"
    onClick={onClick}
  >
    <Message id="Form.Button.Create" defaultMessage="Create" />
  </Button>
);
AddButton.displayName = "BI.AddButton";

export default AddButton;
