import React from 'react';
import styled from 'styled-components';
import Layout from '../components/layout';
import StickyHero from '../components/StickyHero';
import ProductList from '../components/ProductList';
import Header from '../components/header';

const Content = styled.div`
  margin: 0;
  background: ${props => props.theme.white};
`;

export default function Home() {
  return (
    <Layout>
      <Header smart />
      <StickyHero />
      <Content>
        <ProductList />
      </Content>
    </Layout>
  );
}
