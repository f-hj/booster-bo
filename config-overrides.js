const { override, fixBabelImports, addLessLoader } = require('customize-cra')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      //'@primary-color': '#1DA57A',
      //'@layout-header-background': '#1DA57A'
      '@border-radius-base': '0px',
      '@border-radius-sm': '0px',
      '@font-family': 'Inter',
    },
 }),
);