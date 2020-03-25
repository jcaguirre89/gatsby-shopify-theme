import React from 'react';
import Icon from '../assets/logo.inline.svg';

export default function Logo({ width, height, color }) {
  return <Icon fill={color} width={width} height={height} />;
}
