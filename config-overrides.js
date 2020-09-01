const theme = require('./theme')
const {
  override,
  fixBabelImports,
  addLessLoader,
  addDecoratorsLegacy,
} = require('customize-cra')
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: theme,
    },
  }),
  addDecoratorsLegacy()
)
