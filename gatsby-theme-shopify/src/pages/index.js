import React from 'react';
import styled from 'styled-components';
import Layout from '../components/layout';
import StickyHero from '../components/StickyHero';
import ProductList from '../components/ProductList';

const Content = styled.div`
  margin: 0;
  transform: translateY(50%);
  z-index: 2000;
  background: ${props => props.theme.white};
`;

export default function Home() {
  return (
    <Layout>
      <StickyHero />
      <Content>
        <ProductList />
      </Content>
    </Layout>
  );
}
