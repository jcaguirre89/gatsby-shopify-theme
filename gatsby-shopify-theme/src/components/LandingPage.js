import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { buildImageObj, imageUrlFor } from '../lib/sanity-helpers';
import BlockContent from './styles/block-content';
import BaseButton from './styles/BaseButton';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const HeroWrapper = styled.div`
  width: 100%;
  min-height: 500px;
  position: relative;

  img {
    width: 100%;
    height: 600px;
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
  h2 {
    font-family: Spartan;
    font-size: 2.5rem;
    align-self: flex-start;
  }
`;

const BodyWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: auto;
  padding: 0;

  img {
    width: 100%;
    max-height: 100vh;
    object-fit: cover;
  }

  @media (max-width: ${props => props.theme.breakpoints.m}) {
    width: 100%;
    margin: 0;
    padding: 0 10px;
  }
`;

const CTAContainer = styled.div`
  width: 100%;
  height: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  place-items: start;
  grid-gap: 30px;
  margin: 0 20px;
  a {
    height: 100%;
  }
`;

const CTA = styled(BaseButton)`
  width: 170px;
  padding: 10px 15px;
  background: transparent;
  transition: all 0.5s ease;
  border: 2px solid white;
  cursor: pointer;
  color: white;
  font-size: 1.3rem;
  &:hover {
    background: ${props => props.theme.colors.secondary};
    border: 2px solid ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.accent};
  }
`;

export default function LandingPage(props) {
  const { _rawBody, title, subtitle, cta, mainImage } = props;
  console.log(cta);
  return (
    <Wrapper>
      <HeroWrapper>
        <HeroContent>
          <h1>{title}</h1>
          <h2>{subtitle}</h2>
          <CTAContainer>
            {cta.length > 0 &&
              cta.map(item => (
                <Link to={item.link}>
                  <CTA>{item.text}</CTA>
                </Link>
              ))}
          </CTAContainer>
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

LandingPage.propTypes = {
  _rawBody: PropTypes.any,
  cta: PropTypes.array,
  mainImage: PropTypes.any,
  subtitle: PropTypes.string,
  title: PropTypes.string,
};
