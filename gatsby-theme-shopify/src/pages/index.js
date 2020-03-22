import React from 'react';
import Layout from '../components/layout';
import StickyHero from '../components/StickyHero';
import ProductList from '../components/ProductList';

export default function Home() {
  return (
    <Layout>
      <StickyHero />
      <ProductList />
    </Layout>
  );
}
