import applicationData from "./applicationData.json";
import applicationContributions from "./applicationContributions.json";

import formData from "./formData.json";
import formContributions from "./formContributions.json";

const returnObject = (url) => {
  switch (url) {
    case "/BeInformed/contributions/persons/persons/createperson":
      return formContributions;
    case "/BeInformed/persons/persons/createperson":
      return formData;
    case "/BeInformed/contributions/":
      return applicationContributions;
    case "/BeInformed/":
      return applicationData;
    default:
      return null;
  }
};

export default function universalFetch(args) {
  return new Promise((resolve, reject) => {
    process.nextTick(() => {
      const data = returnObject(args.url);

      if (data) {
        return resolve(data);
      }

      return reject(new Error(`unknown: ${args.url}`));
    });
  });
}
