import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

const ImageContainer = styled.div`
  padding: 0;
  height: 400px;
  overflow: hidden;
`;

export default function ImgZoom({ fluid }) {
  const [hover, setHover] = useState(false);

  const style = {
    normal: {
      height: '100%',
    },
    hover: {
      width: '200%',
      left: '-50%',
    },
  };

  return (
    <ImageContainer
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Img
        style={{ ...style.normal, ...(hover ? style.hover : null) }}
        fluid={fluid}
      />
    </ImageContainer>
  );
}

ImgZoom.propTypes = {
  fluid: PropTypes.object.isRequired,
};
