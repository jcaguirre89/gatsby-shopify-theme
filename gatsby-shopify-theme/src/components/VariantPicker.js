import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

const Grid = styled.div`
  display: grid;
  width: 100%;
  max-width: 350px;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  grid-gap: 5px;

  button {
    background: white;
    height: 80px;
    padding: 0;
    margin: 0;
    border: 0;
    cursor: pointer;
  }
`;

export default function VariantPicker({ variants, setSelectedVariant }) {
  const pickVariant = variants.map(variant => (
    <button type="button" onClick={() => setSelectedVariant(variant)}>
      <Img
        key={variant.id}
        fixed={variant.image.localFile.childImageSharp.fixed}
        style={{ height: '100%' }}
      />
    </button>
  ));
  return <Grid>{pickVariant}</Grid>;
}

VariantPicker.propTypes = {
  setSelectedVariant: PropTypes.func.isRequired,
  variants: PropTypes.array.isRequired,
};
