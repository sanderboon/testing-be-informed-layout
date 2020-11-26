// @flow
import ActionModel from "../ActionModel";

const data = {
  name: "addedition",
  method: "POST",
  href: "/books/books/47/addedition",
  fields: [
    {
      name: "ID",
      type: "number",
      value: 47,
    },
  ],
};

const contributions = {
  name: "addedition",
  label: "Add edition",
  type: "contextaware",
  fields: [
    {
      ID: {
        type: "number",
        label: "Case ID",
        mandatory: true,
        decimalSeparator: ",",
        format: "0",
        groupingSeparator: ".",
      },
    },
  ],
};

export default new ActionModel(data, contributions);
