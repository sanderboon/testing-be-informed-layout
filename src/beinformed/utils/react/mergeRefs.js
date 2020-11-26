// @flow
import { isFunction } from "lodash";

const mergeRefs = <T>(refs: Array<T>) => (value: Function | Object) => {
  refs.forEach((ref) => {
    if (isFunction(ref)) {
      ref(value);
    } else if (ref !== null) {
      ref.current = value;
    }
  });
};

export default mergeRefs;
