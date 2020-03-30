import PropTypes from 'prop-types';
import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Img from 'gatsby-image';
import BaseButton from './styles/BaseButton';

const CTA = styled(BaseButton)`
  width: 200px;
`;

export default function CollectionCard({ collection }) {
  const { title, handle, descriptionHtml, image } = collection;
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          gatsbyStorefrontConfig {
            collectionsPath
          }
        }
      }
    }
  `);
  const { collectionsPath } = data.site.siteMetadata.gatsbyStorefrontConfig;
  return (
    <>
      <Link to={`${collectionsPath}/${handle}/`}>
        <Img
          fluid={image.localFile.childImageSharp.fluid}
          style={{ height: '100%' }}
        />
      </Link>
      <main>
        <h2>{title}</h2>
        <p dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
        <Link to={`${collectionsPath}/${handle}/`}>
          <CTA type="button">Shop Now</CTA>
        </Link>
      </main>
    </>
  );
}

CollectionCard.propTypes = {
  collection: PropTypes.object.isRequired,
};
