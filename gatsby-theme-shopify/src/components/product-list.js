import React from "react";
import ProductCard from "./product-card";
import styled from "styled-components";

const ProductGrid = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export default function ProductList({ products }) {
  return (
    <>
      <h2>Product List</h2>
      <ProductGrid>
        {products.map(product => (
          <ProductCard product={product}></ProductCard>
        ))}
      </ProductGrid>
    </>
  );
}
