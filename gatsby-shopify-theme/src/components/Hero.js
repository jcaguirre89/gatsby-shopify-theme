import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import BaseButton from './styles/BaseButton';

const handleHeroContentLocation = location => {
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

const HeroContainer = styled.section`
  width: 100%;
  height: 90vh;
  position: relative;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  padding: 100px;
  width: 100%;
  transform: translateY(-40%);
  top: 50%;
  color: ${props => props.color};

  h2 {
    ${({ location }) => handleHeroContentLocation(location)};
    font-size: 3rem;
    font-family: 'Spartan';
  }

  h3 {
    ${({ location }) => handleHeroContentLocation(location)};
    font-family: 'Spartan';
    font-size: 2rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.m}) {
    transform: translateY(-20%);
    justify-content: center;

    h2 {
      font-size: 2.5rem;
    }

    h3 {
      font-size: 2rem;
    }
  }
`;

const CTAContainer = styled.div`
  width: 100%;
  height: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
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

export default function Hero({
  imageFluid,
  title,
  color,
  contentLocation,
  subtitle,
  ctas,
}) {
  // Image must be fluid!
  return (
    <HeroContainer>
      <Img fluid={imageFluid} style={{ height: '100%' }} />
      <Content color={color} location={contentLocation}>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
        <CTAContainer>
          {ctas &&
            ctas.map((cta, i) => (
              <Link to={cta.link} key={i}>
                <CTA>{cta.text}</CTA>
              </Link>
            ))}
        </CTAContainer>
      </Content>
    </HeroContainer>
  );
}

Hero.propTypes = {
  imageFluid: PropTypes.object.isRequired,
  color: PropTypes.string,
  title: PropTypes.string,
  contentLocation: PropTypes.oneOf(['left', 'right', 'center']),
  subtitle: PropTypes.string,
  ctas: PropTypes.array,
};

Hero.defaultProps = {
  title: '',
  subtitle: '',
  ctas: [],
  color: 'white',
  contentLocation: 'right',
};
