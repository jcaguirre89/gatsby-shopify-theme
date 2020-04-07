import PropTypes from 'prop-types';
import React, { useState, useRef } from 'react';
import Img from 'gatsby-image';
import { motion, useDomEvent } from 'framer-motion';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: zoom-in;
  margin: 50px 0;

  .open {
    cursor: zoom-out;
  }

  .shade {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0;
    background: rgba(0, 0, 0, 0.9);
    z-index: 10;
  }

  .open .shade {
    pointer-events: auto;
    opacity: 1;
  }
`;

const transition = {
  type: 'spring',
  damping: 25,
  stiffness: 120,
};

export default function ZoomableImage({ style, fluid }) {
  const [isZoomed, setZoomed] = useState(false);
  useDomEvent(useRef(window), 'scroll', () => isZoomed && setZoomed(false));

  const variants = {
    fullscreen: {
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100vh',
      width: '100%',
      // width: '100vw',
      flip: true,
      zIndex: 1000,
      padding: '50px',
    },
    idle: {
      position: 'relative',
      width: '100%',
      height: '100%',
      flip: true,
      zIndex: 1000,
    },
  };
  return (
    <Wrapper
      className={isZoomed ? 'open' : ''}
      onClick={() => setZoomed(!isZoomed)}
    >
      <motion.div
        animate={{ opacity: isZoomed ? 1 : 0 }}
        transition={transition}
        className="shade"
        onClick={() => setZoomed(false)}
      />
      <motion.div
        className={isZoomed ? 'open' : ''}
        animate={isZoomed ? 'fullscreen' : 'idle'}
        variants={variants}
      >
        <Img style={style} fluid={fluid} />
      </motion.div>
    </Wrapper>
  );
}

ZoomableImage.propTypes = {
  fluid: PropTypes.string,
  style: PropTypes.object,
};
