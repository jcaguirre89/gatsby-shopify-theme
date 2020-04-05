import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import useElementSize from '../hooks/useElementSizeDynamic';

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
`;

const SliderContent = styled.div`
  transform: translateX(-${props => props.translate}px);
  transition: transform ease-in-out ${props => props.transition}s;
  height: 100%;
  width: ${props => props.width}px;
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
  height: 50px;
  width: 50px;
  transition: transform ease-in-out ${props => props.transition}s;
  ${props => props.active && 'transform: scale(1.2)'};
`;

export default function ImageSlider({ imagesFluid, imagesFixed }) {
  const { ref, width } = useElementSize();

  const [translate, setTranslate] = useState(0);
  const [transition, setTransition] = useState(0.45);
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    // If on the last slide
    if (activeIndex === imagesFluid.length - 1) {
      setTranslate(0);
      setActiveIndex(0);
      return;
    }
    setTranslate((activeIndex + 1) * width);
    setActiveIndex(activeIndex + 1);
  };

  const prevSlide = () => {
    // If on first slide
    if (activeIndex === 0) {
      setTranslate((imagesFluid.length - 1) * width);
      setActiveIndex(imagesFluid.length - 1);
      return;
    }
    setTranslate((activeIndex - 1) * width);
    setActiveIndex(activeIndex - 1);
  };

  return (
    <div>
      <SliderContainer ref={ref}>
        <SliderContent
          translate={translate}
          transition={transition}
          width={width * imagesFluid.length}
        >
          {imagesFluid.map((image, i) => (
            <Img style={{ width: '100%' }} key={i} fluid={image} />
          ))}
        </SliderContent>
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
          <Thumbnail transition={transition} active={activeIndex === i}>
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
