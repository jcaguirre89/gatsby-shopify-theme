import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import CollectionCard from './CollectionCard';

const CollectionsGrid = styled.div`
  margin: 50px 20px;
  width: 100%;
  display: grid;
  grid-auto-flow: row dense;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(auto-fill, 500px);
  grid-gap: 20px;

  @media (max-width: ${props => props.theme.breakpoints.m}) {
    grid-template-columns: 1fr;
  }

  main {
    font-size: 3rem;
    &:nth-child(4n) {
      margin: 20px 40px;
      grid-column: 1/2;
    }
    @media (max-width: ${props => props.theme.breakpoints.m}) {
      grid-column: 1/2;
    }
  }
  a {
    grid-column: 1/2;
    &:nth-child(3n) {
      grid-column: 2/3;
    }
    @media (max-width: ${props => props.theme.breakpoints.m}) {
      &:nth-child(3n) {
        grid-column: 1/2;
      }
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
