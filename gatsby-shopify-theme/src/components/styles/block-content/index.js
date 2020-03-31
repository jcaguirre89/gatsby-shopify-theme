import BaseBlockContent from '@sanity/block-content-to-react';
import React from 'react';
import styled from 'styled-components';
import Figure from './figure';

const StyledBlockContent = styled(BaseBlockContent)`
  width: 100%;
`;

const H1 = styled.h1`
  margin: 50px auto;
  text-align: center;
`;
const H2 = styled.h2`
  margin: 50px auto;
  text-align: center;
`;
const H3 = styled.h3`
  text-align: center;
  margin: 50px auto;
`;

const P = styled.p`
  margin: 30px auto;
  max-width: 700px;
`;

const serializers = {
  types: {
    block(props) {
      switch (props.node.style) {
        case 'h1':
          return <H1>{props.children}</H1>;

        case 'h2':
          return <H2>{props.children}</H2>;

        case 'h3':
          return <H3>{props.children}</H3>;

        case 'h4':
          return <h4>{props.children}</h4>;

        case 'blockquote':
          return <blockquote>{props.children}</blockquote>;

        default:
          return <P>{props.children}</P>;
      }
    },
    figure(props) {
      return <Figure {...props.node} />;
    },
  },
};

const BlockContent = ({ blocks }) => (
  <StyledBlockContent blocks={blocks} serializers={serializers} />
);

export default BlockContent;
