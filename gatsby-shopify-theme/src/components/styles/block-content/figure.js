import React from 'react';
import { buildImageObj, imageUrlFor } from '../../../lib/sanity-helpers';
import styled from 'styled-components';

const FigureWrapper = styled.figure`
  width: 100%;
  margin: 0;
`;

const StyledImg = styled.img`
  width: 100%;
  margin: 0;
  object-fit: cover;
`;

function Figure(props) {
  return (
    <FigureWrapper>
      {props.asset && (
        <StyledImg
          src={imageUrlFor(buildImageObj(props))
            .width(1200)
            .url()}
          alt={props.alt}
        />
      )}
      <figcaption>{props.caption}</figcaption>
    </FigureWrapper>
  );
}

export default Figure;
