module.exports = function (api) {
  api.cache.using(() => process.env.NODE_ENV);

  const isProduction = api.env("jenkins") || api.env("production");
  const isHmr = api.env("hmr");
  const isTest = api.env("test");

  const presetEnv = isTest
    ? [
        "@babel/preset-env",
        {
          targets: {
            node: "current",
          },
        },
      ]
    : [
        "@babel/preset-env",
        {
          useBuiltIns: "usage",
          corejs: { version: 3, proposals: true },
        },
      ];

  const presets = [
    presetEnv,
    "@babel/preset-flow",
    [
      "@babel/preset-react",
      {
        runtime: "automatic",
      },
    ],
  ];

  const styledComponentConfig = isProduction
    ? ["babel-plugin-styled-components", { pure: true, displayName: false }]
    : [
        "babel-plugin-styled-components",
        { displayName: true, fileName: false },
      ];

  const plugins = [
    styledComponentConfig,
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-named-capturing-groups-regex",
    "@babel/plugin-proposal-unicode-property-regex",
    "@babel/plugin-syntax-dynamic-import",
    [
      "babel-plugin-module-resolver",
      {
        root: ["./src"],
      },
    ],
  ];

  if (isProduction) {
    plugins.push("@babel/plugin-transform-react-inline-elements");
  } else {
    plugins.push("@babel/plugin-transform-react-jsx-source");
  }

  if (isHmr) {
    plugins.push("react-refresh/babel");
  }

  return {
    presets,
    plugins,
  };
};
