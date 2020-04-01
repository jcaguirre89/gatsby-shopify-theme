import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { buildImageObj, imageUrlFor } from '../lib/sanity-helpers';
import BlockContent from './styles/block-content';
import BaseButton from './styles/BaseButton';

const handleContentLocation = location => {
  switch (location) {
    case 'left':
      return 'align-self: flex-start';
    case 'right':
      return 'align-self: flex-end';
    case 'center':
      return 'align-self: center';
    default:
      return 'align-self: flex-start';
  }
};

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
  padding: 90px;
  width: 100%;
  transform: translateY(-40%);
  top: 50%;
  color: ${props => props.color};

  h1 {
    width: 50%;
    font-family: Spartan;
    font-size: 3rem;
    ${({ location }) => handleContentLocation(location)};
  }
  h2 {
    width: 50%;
    font-family: Spartan;
    font-size: 2.5rem;
    ${({ location }) => handleContentLocation(location)};
  }

  @media (max-width: ${props => props.theme.breakpoints.m}) {
    transform: translateY(-20%);
    justify-content: center;
    padding: 10px;

    h1 {
      font-size: 2.5rem;
      width: 100%;
    }

    h2 {
      width: 100%;
      font-size: 2rem;
    }
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
  ${({ location }) => handleContentLocation(location)};
  height: 50px;
  width: 50%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  place-items: start;
  grid-gap: 30px;
  margin: 0;
  a {
    height: 100%;
  }
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    width: 100%;
    margin: 0;
    padding: 0 10px;
  }
`;

const CTA = styled(BaseButton)`
  width: 130px;
  padding: 10px 15px;
  background: transparent;
  transition: all 0.5s ease;
  border: 2px solid ${props => props.color};
  cursor: pointer;
  color: ${props => props.color};
  font-size: 1.3rem;
  &:hover {
    background: ${props => props.theme.colors.secondary};
    border: 2px solid ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.accent};
  }
`;

export default function LandingPage(props) {
  const {
    _rawBody,
    title,
    subtitle,
    cta,
    mainImage,
    textColor,
    contentLocation,
  } = props;
  const color = textColor || '#fff';
  const location = contentLocation || 'left';
  return (
    <Wrapper>
      <HeroWrapper>
        <HeroContent color={color} location={location}>
          <h1>{title}</h1>
          <h2>{subtitle}</h2>
          <CTAContainer location={location}>
            {cta.length > 0 &&
              cta.map(item => (
                <Link to={item.link}>
                  <CTA color={color}>{item.text}</CTA>
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
  textColor: PropTypes.objectOf(PropTypes.string),
};
