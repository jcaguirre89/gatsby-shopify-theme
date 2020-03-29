import React, { createContext } from 'react';
import Client from 'shopify-buy';
import { graphql, useStaticQuery } from 'gatsby';

export const ShopifyClientContext = createContext();

export default function ShopifyClientProvider({ children }) {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          shopify {
            domain
            accessToken
          }
        }
      }
    }
  `);
  const { domain, accessToken } = data.site.siteMetadata.shopify;
  const client = Client.buildClient({
    domain,
    storefrontAccessToken: accessToken,
  });

  return (
    <ShopifyClientContext.Provider value={client}>
      {children}
    </ShopifyClientContext.Provider>
  );
}
