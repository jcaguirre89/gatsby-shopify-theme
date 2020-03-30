import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

export default function CollectionCard({ collection }) {
  const { title, descriptionHtml, image } = collection;
  return (
    <>
      <Img
        fluid={image.localFile.childImageSharp.fluid}
        style={{ height: '400px' }}
      />
      <main>
        <h2>{title}</h2>
        <p dangerouslySetInnerHTML={{ __html: descriptionHtml }}></p>
      </main>
    </>
  );
}

CollectionCard.propTypes = {
  collection: PropTypes.object.isRequired,
};
