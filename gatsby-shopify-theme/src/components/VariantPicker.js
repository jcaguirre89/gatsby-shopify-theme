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
    transition: all ease-in 0.25s;
  }
  .selected {
    transform: scale(1.1);
  }
`;

export default function VariantPicker({
  variants,
  selectedVariantId,
  setSelectedVariant,
}) {
  const pickVariant = variants.map(variant => (
    <button
      className={variant.id === selectedVariantId ? 'selected' : ''}
      type="button"
      onClick={() => setSelectedVariant(variant)}
    >
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
