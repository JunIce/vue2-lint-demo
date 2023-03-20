const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  core: {
    builder: {
      name: "webpack5",
      options: {
        fsCache: true,
      },
    },
  },
  webpackFinal: async (config, { configType }) => {
    // Make whatever fine-grained changes you need
    config.resolve.alias["@"] = path.resolve(__dirname, "../src");

    config.module.rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
    });

    config.module.rules.push({
      test: /\.(jpg|jpeg|png|webp|gif)$/i,
      type: "asset/resource",
    });

    // Return the altered config
    return config;
  },
};
