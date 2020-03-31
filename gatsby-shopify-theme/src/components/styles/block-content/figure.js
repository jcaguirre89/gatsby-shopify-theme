import React from 'react';
import { buildImageObj, imageUrlFor } from '../../../lib/sanity-helpers';
import styled from 'styled-components';

const StyledImg = styled.img`
  width: 100%;
  object-fit: cover;
`;

function Figure(props) {
  return (
    <figure>
      {props.asset && (
        <StyledImg
          src={imageUrlFor(buildImageObj(props))
            .width(1200)
            .url()}
          alt={props.alt}
        />
      )}
      <figcaption>{props.caption}</figcaption>
    </figure>
  );
}

export default Figure;
