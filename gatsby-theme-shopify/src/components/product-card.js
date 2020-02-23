import React from "react";
import styled from "styled-components";

const ProductCardStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  border: 1px solid ${props => props.theme.offBlack};
`;

export default function ProductCard({ product }) {
  return (
    <ProductCardStyle>
      <h3>{product.brand}</h3>
      <h4>{product.model}</h4>
      <p>{product.description}</p>
    </ProductCardStyle>
  );
}
