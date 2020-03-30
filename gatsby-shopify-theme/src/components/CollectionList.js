import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import CollectionCard from './CollectionCard';

const CollectionsGrid = styled.div`
  margin-top: 50px;
  display: grid;
  grid-auto-flow: row dense;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-columns: repeat(auto-fill, 500px);
  grid-gap: 20px;

  main {
    grid-column: 2/3;
    font-size: 3rem;
    &:nth-child(4n) {
      margin: 20px 40px;
      grid-column: 1/2;
    }
  }
  a {
    grid-column: 1/2;
    &:nth-child(3n) {
      grid-column: 2/3;
    }
  }
`;

export default function CollectionList({ collections }) {
  return (
    <CollectionsGrid>
      {collections
        .filter(c => !!c.image)
        .map(collection => (
          <CollectionCard key={collection.handle} collection={collection} />
        ))}
    </CollectionsGrid>
  );
}

CollectionList.propTypes = {
  collections: PropTypes.array.isRequired,
};
