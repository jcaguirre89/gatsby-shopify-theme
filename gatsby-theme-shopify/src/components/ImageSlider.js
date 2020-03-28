import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

const SliderContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
`;

const SliderContent = styled.div`
  transform: translateX(-${props => props.translate}px);
  transition: transform ease-out ${props => props.transition}s;
  height: 100%;
  width: ${props => props.width}px;
  display: flex;
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

function useElementSize() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const measuredRef = useCallback(node => {
    if (node !== null) {
      setWidth(node.getBoundingClientRect().width);
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);
  return [measuredRef, { height, width }];
}

export default function ImageSlider({ images }) {
  const [ref, { height, width }] = useElementSize();

  const [translate, setTranslate] = useState(0);
  const [transition, setTransition] = useState(0.45);
  const [activeIndex, setActiveIndex] = useState(0);

  console.log(width);

  const nextSlide = () => {
    // If on the last slide
    if (activeIndex === images.length - 1) {
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
      setTranslate((images.length - 1) * width);
      setActiveIndex(images.length - 1);
      return;
    }
    setTranslate((activeIndex - 1) * width);
    setActiveIndex(activeIndex - 1);
  };

  return (
    <SliderContainer ref={ref}>
      <SliderContent
        translate={translate}
        transition={transition}
        width={width * images.length}
      >
        {images.map((image, i) => (
          <Img
            style={{ height: '100%', width: '100%' }}
            key={i}
            fluid={image}
          />
        ))}
      </SliderContent>
      <Arrow direction="left" onClick={() => prevSlide()}>
        <IoIosArrowBack />
      </Arrow>
      <Arrow direction="right" onClick={() => nextSlide()}>
        <IoIosArrowForward />
      </Arrow>
    </SliderContainer>
  );
}

ImageSlider.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  images: PropTypes.array.isRequired,
};

ImageSlider.defaultProps = {
  height: '100%',
  width: '100%',
};
