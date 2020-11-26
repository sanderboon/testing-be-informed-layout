// @flow
import { get, has, isPlainObject, isArray, cloneDeep } from "lodash";

import CaptchaAttributeModel from "beinformed/models/attributes/CaptchaAttributeModel";
import ChoiceAttributeModel from "beinformed/models/attributes/ChoiceAttributeModel";
import DatetimeAttributeModel from "beinformed/models/attributes/DatetimeAttributeModel";
import HelptextAttributeModel from "beinformed/models/attributes/HelptextAttributeModel";
import LabelAttributeModel from "beinformed/models/attributes/LabelAttributeModel";
import MemoAttributeModel from "beinformed/models/attributes/MemoAttributeModel";
import MoneyAttributeModel from "beinformed/models/attributes/MoneyAttributeModel";
import NumberAttributeModel from "beinformed/models/attributes/NumberAttributeModel";
import PasswordAttributeModel from "beinformed/models/attributes/PasswordAttributeModel";
import CompositeAttributeModel from "beinformed/models/attributes/CompositeAttributeModel";
import StringAttributeModel from "beinformed/models/attributes/StringAttributeModel";
import UploadAttributeModel from "beinformed/models/attributes/UploadAttributeModel";
import XMLAttributeModel from "beinformed/models/attributes/XMLAttributeModel";
import BooleanAttributeModel from "beinformed/models/attributes/BooleanAttributeModel";

import AttributeDataHelper from "./AttributeDataHelper";

const getChildrenKeys = (children: Array<Object>): Array<Object> => {
  if (children) {
    return children.map((child) => {
      const [childKey] = Object.keys(child);
      const isComposite =
        child[childKey].type === "range" ||
        child[childKey].type === "composite";

      return {
        key: childKey,
        dynamicschemaId: get(child[childKey], "dynamicschemaId") || void 0,
        children: isComposite
          ? getChildrenKeys(get(child[childKey], "children"))
          : [],
      };
    });
  }

  return [];
};

const getAttributeModel = (contributions) => {
  const ATTRIBUTE_MODELS = [
    ChoiceAttributeModel,
    BooleanAttributeModel,

    HelptextAttributeModel,
    LabelAttributeModel,

    XMLAttributeModel,
    MemoAttributeModel,
    StringAttributeModel,

    DatetimeAttributeModel,

    MoneyAttributeModel,
    NumberAttributeModel,
    PasswordAttributeModel,

    UploadAttributeModel,
    CompositeAttributeModel,
    CaptchaAttributeModel,
  ];

  return ATTRIBUTE_MODELS.find((model) =>
    model.isApplicableModel(contributions)
  );
};

const updateContributions = (
  key: string,
  data: Object,
  contributions: Object
) => {
  const isComposite =
    get(contributions, "type", "") === "array" &&
    has(contributions, "children") &&
    isPlainObject(data) &&
    isArray(data[key]);

  return {
    ...contributions,
    type: isComposite ? "composite" : contributions.type,
  };
};

const updateData = (key: string, data: Object, contributions: Object) => {
  const newData = cloneDeep(data);

  if (contributions.dynamicschemaId) {
    newData.dynamicschemaId = contributions.dynamicschemaId;
  }

  return newData;
};

const createAttribute = (
  key: string,
  data: Object | Array<Object>,
  contributions: Object
) => {
  const updatedContributions = updateContributions(key, data, contributions);
  const updatedData = updateData(key, data, contributions);

  const Model = getAttributeModel(updatedContributions);

  if (!Model) {
    throw new Error("Could not find model");
  }

  const childrenKeys = getChildrenKeys(
    get(updatedContributions, "children", [])
  );
  const dataHelper = new AttributeDataHelper(
    updatedData,
    key,
    childrenKeys
  ).getData();

  return new Model(dataHelper, updatedContributions);
};

export default createAttribute;
