import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

function SEO({ title, description, image, pathname }) {
  const result = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          defaultTitle: title
          titleTemplate
          defaultDescription: description
          siteUrl: url
          defaultImage: image
          twitterHandle
          instagramHandle
        }
      }
    }
  `);
  const site = result.site.siteMetadata;
  const seo = {
    title: title || site.defaultTitle,
    description: description || site.defaultDescription,
    image: `${site.siteUrl}${image || site.defaultImage}`,
    url: `${site.siteUrl}${pathname || '/'}`,
  };
  return (
    <Helmet title={seo.title} titleTemplate={site.titleTemplate}>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      {seo.url && <meta property="og:url" content={seo.url} />}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
      {seo.image && <meta property="og:image" content={seo.image} />}
      <meta name="twitter:card" content="summary_large_image" />
      {site.twitterHandle && (
        <meta name="twitter:creator" content={site.twitterHandle} />
      )}
      {seo.title && <meta name="twitter:title" content={seo.title} />}
      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}
      {seo.image && <meta name="twitter:image" content={seo.image} />}
    </Helmet>
  );
}

export default SEO;

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  pathname: PropTypes.string,
};
SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  pathname: null,
};
