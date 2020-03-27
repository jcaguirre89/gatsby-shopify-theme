import React from 'react';
import GlobalContextProvider from './src/context/GlobalContextProvider';
import ShopifyClientProvider from './src/context/ShopifyClientProvider';

export const wrapRootElement = ({ element }) => {
  return (
    <GlobalContextProvider>
      <ShopifyClientProvider>{element}</ShopifyClientProvider>
    </GlobalContextProvider>
  );
};
