import React from 'react';
import { buildImageObj, imageUrlFor } from '../lib/sanity-helpers';
import BlockContent from './styles/block-content';

export default function LandingPage(props) {
  const { _rawBody, title, mainImage } = props;
  return (
    <div>
      <img
        src={imageUrlFor(buildImageObj(mainImage))
          .width(1200)
          .height(Math.floor((9 / 16) * 1200))
          .fit('crop')
          .url()}
        alt={mainImage.alt}
      />
      <div>
        <h1>{title}</h1>
        {_rawBody && <BlockContent blocks={_rawBody} />}
      </div>
    </div>
  );
}
