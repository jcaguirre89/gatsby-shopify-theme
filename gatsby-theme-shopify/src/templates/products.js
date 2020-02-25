import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Layout from "../components/layout";
import ProductList from "../components/product-list";
import LandingPage from "../components/landing-page";

export default function ProductsTemplate() {
  const data = useStaticQuery(graphql`
    query MyQuery {
      allProduct(sort: { fields: price, order: DESC }) {
        nodes {
          id
          slug
          price
          brand
          description
          model
        }
      }
    }
  `);
  const products = data.allProduct.nodes;
  return (
    <Layout>
      <LandingPage></LandingPage>
      <ProductList products={products}></ProductList>
    </Layout>
  );
}
