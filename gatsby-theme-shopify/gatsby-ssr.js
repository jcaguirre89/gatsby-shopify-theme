const React = require('react');
const GlobalContextProvider = require('./src/context/GlobalContextProvider')
  .default;
const ShopifyClientProvider = require('./src/context/ShopifyClientProvider')
  .default;

exports.wrapRootElement = ({ element }) => {
  return (
    <ShopifyClientProvider>
      <GlobalContextProvider>{element}</GlobalContextProvider>
    </ShopifyClientProvider>
  );
};
