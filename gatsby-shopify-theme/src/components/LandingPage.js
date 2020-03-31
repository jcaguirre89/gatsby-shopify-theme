import React from 'react';
import styled from 'styled-components';
import { buildImageObj, imageUrlFor } from '../lib/sanity-helpers';
import BlockContent from './styles/block-content';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const HeroWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;

  img {
    width: 100%;
    object-fit: cover;
  }
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  padding: 100px;
  width: 100%;
  transform: translateY(-40%);
  top: 50%;
  color: white;

  h1 {
    font-family: Spartan;
    font-size: 3rem;
    align-self: flex-start;
  }
`;

const BodyWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin: auto;

  img {
    max-height: 100vh;
    object-fit: cover;
  }
`;

export default function LandingPage(props) {
  const { _rawBody, title, mainImage } = props;
  return (
    <Wrapper>
      <HeroWrapper>
        <HeroContent>
          <h1>{title}</h1>
        </HeroContent>
        <img
          src={imageUrlFor(buildImageObj(mainImage))
            .width(1200)
            .height(Math.floor((9 / 16) * 1200))
            .fit('crop')
            .url()}
          alt={mainImage.alt}
        />
      </HeroWrapper>
      <BodyWrapper>
        {_rawBody && <BlockContent blocks={_rawBody} />}
      </BodyWrapper>
    </Wrapper>
  );
}
