const { injectBabelPlugin } = require('react-app-rewired');

module.exports = function override(config, env) {
  // do stuff with the webpack config...
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: 'css' }], config);
  //config.output.publicPath = process.env.NODE_ENV === "development" ? "/" : "/cloud/tpk/";
  return config;
};