import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { Animate } from 'react-animate-mount';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

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

const Arrow = styled.button`
  display: flex;
  position: absolute;
  top: 50%;
  ${props => (props.direction === 'right' ? `right: 15px` : `left: 15px`)};
  height: 50px;
  width: 50px;
  justify-content: center;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  align-items: center;
  transition: transform ease-in 0.1s;
  &:hover {
    transform: scale(1.1);
  }
`;

const Dot = styled.span`
  padding: 5px;
  margin-right: 5px;
  cursor: pointer;
  border-radius: 50%;
  background: ${props => (props.active ? 'black' : 'white')};
`;

const Dots = styled.div`
  position: absolute;
  bottom: 25px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ThumbnailContainer = styled.div`
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

  const nextSlide = useCallback(
    () => setActiveIndex(state => (state + 1) % imagesFluid.length),
    []
  );

  const prevSlide = () => {
    // If on first slide
    if (activeIndex === 0) {
      setActiveIndex(imagesFluid.length - 1);
      return;
    }
    setActiveIndex(activeIndex - 1);
  };

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
              <Img style={{ width: '100%' }} fluid={img} />
            </SliderContent>
          </Animate>
        ))}
        <Arrow direction="left" onClick={() => prevSlide()}>
          <IoIosArrowBack />
        </Arrow>
        <Arrow direction="right" onClick={() => nextSlide()}>
          <IoIosArrowForward />
        </Arrow>
        <Dots>
          {imagesFluid.map((_, i) => (
            <Dot key={i} active={activeIndex === i} />
          ))}
        </Dots>
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
