import React from 'react';
import { buildImageObj, imageUrlFor } from '../../../lib/sanity-helpers';

function Figure(props) {
  return (
    <figure>
      {props.asset && (
        <img
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
