// @flow
/**
 * Flatten JSON structure into a one dimensional array
 */

const createLink = (link, linkKey) => {
  const newLink = link;
  newLink.group = linkKey;
  return newLink;
};

const flattenDataJSON = (json: Object) => {
  const flattenedJSON = [];

  Object.keys(json).forEach((linkKey) => {
    if (Array.isArray(json[linkKey])) {
      flattenedJSON.push(
        ...json[linkKey].map((link) => createLink(link, linkKey))
      );
    } else if (json[linkKey]) {
      flattenedJSON.push(
        Object.assign(json[linkKey], {
          name: linkKey,
        })
      );
    }
  });

  return flattenedJSON;
};

const flattenContributionsJSON = (json: Object) => {
  const flattenedJSON = [];

  Object.keys(json).forEach((linkKey) => {
    if (Array.isArray(json[linkKey])) {
      flattenedJSON.push(
        ...json[linkKey].map((link) => createLink(link, linkKey))
      );
    } else if (json[linkKey]) {
      const newLink = json[linkKey];
      newLink.name = linkKey;
      if (!newLink.label) {
        newLink.label = linkKey;
      }
      if (!newLink.group) {
        newLink.group = linkKey;
      }

      flattenedJSON.push(newLink);
    }
  });

  return flattenedJSON;
};

/**
 * Normalize various link formats from services into a concistent format
 */

const normalizeLinkJSON = (data: Object, contributions: Object) => {
  if (!data && !contributions) {
    return [];
  }

  const flattenedData = data ? flattenDataJSON(data) : [];
  const flattenedContributions = contributions
    ? flattenContributionsJSON(contributions)
    : [];

  const filteredContributions = flattenedContributions.filter(
    (contribution) =>
      contribution.href &&
      !flattenedData.find((linkData) => linkData.name === contribution.name)
  );

  return [
    ...flattenedData.map((link) => ({
      data: link,
      contributions: flattenedContributions.find(
        (contr) => contr.name === link.name
      ) || { name: link.name, label: link.name || "" },
    })),
    ...filteredContributions.map((link) => ({
      data: {
        ...link,
        href: link.href || "",
      },
      contributions: { name: link.name, label: link.name || "" },
    })),
  ];
};

export default normalizeLinkJSON;
