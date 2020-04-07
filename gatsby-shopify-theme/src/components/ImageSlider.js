import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { Animate } from 'react-animate-mount';
import ZoomableImage from './ZoomableImage';

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
`;

const SliderContent = styled.div`
  height: 400px;
  width: 100%;
  display: flex;
  margin-bottom: 20px;
`;

const ThumbnailContainer = styled.div`
  margin-top: 20px;
  display: flex;
  width: 100%;
`;

const Thumbnail = styled.div`
  margin-right: 10px;
  height: 100px;
  width: 100px;
  transition: transform ease-in-out 0.45s;
  ${props => props.active && 'transform: scale(1.2)'};
  cursor: pointer;
`;

export default function ImageSlider({ imagesFluid, imagesFixed }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <SliderContainer>
        {imagesFluid.map((img, idx) => (
          <Animate
            key={idx}
            duration={450}
            type="slide"
            show={activeIndex === idx}
          >
            <SliderContent>
              <ZoomableImage style={{ height: '100%' }} fluid={img} />
            </SliderContent>
          </Animate>
        ))}
      </SliderContainer>
      <ThumbnailContainer>
        {imagesFixed.map((image, i) => (
          <Thumbnail
            key={i}
            active={activeIndex === i}
            onClick={() => setActiveIndex(i)}
          >
            <Img
              style={{ height: '100%', width: '100%' }}
              key={i}
              fluid={image}
            />
          </Thumbnail>
        ))}
      </ThumbnailContainer>
    </div>
  );
}

ImageSlider.propTypes = {
  imagesFluid: PropTypes.array.isRequired,
  imagesFixed: PropTypes.array.isRequired,
};
