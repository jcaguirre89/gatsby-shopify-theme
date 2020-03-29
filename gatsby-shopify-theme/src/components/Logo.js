import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../assets/logo.inline.svg';

export default function Logo({ width, height, color }) {
  return <Icon fill={color} width={width} height={height} />;
}

Logo.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string,
};

Logo.defaultProps = {
  width: '50px',
  height: '50px',
  color: 'white',
};
