import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import { formatMoney } from './MonetaryValue';
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../context/GlobalContextProvider';

import UpdateQuantityButton from './UpdateCartButton';

const CartItemStyle = styled.div`
  width: 100%;
  margin-bottom: 5px;
  display: grid;
  grid-template-columns: 70px 1fr 40px;
  grid-gap: 5px;
  grid-template-rows: minmax(0, 1fr);
  h2,
  h3 {
    font-family: ${props => props.theme.fonts.body};
    margin: 0;
    font-size: 1.2rem;
    padding: 0 5px;
  }

  h2 {
    text-transform: uppercase;
    font-weight: ${props => props.theme.fontWeights.bold};
  }

  h3 {
    color: ${props => props.theme.colors.grey};
  }
  .middle-col {
    height: 80px;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 15px 15px 1fr;
  }
  .last-col {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .price {
    padding: 0 5px;
    margin-bottom: 0;
    margin-right: 0;
    font-size: 1rem;
    font-weight: 700;
  }

  .remove-button {
    align-self: end;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    padding: 0 5px;
    background: transparent;
    border: 0;
    text-transform: uppercase;
    font-size: 0.9rem;
    color: ${props => props.theme.colors.accent};
    letter-spacing: 1px;
    cursor: pointer;
  }
`;

const getQuantityInCart = (id, cartItems) => {
  // gets quantity of given variantId in cart or 0
  const item = cartItems.filter(i => i.variantId === id);
  if (item.length === 0) return 0;
  return item[0].quantity;
};

export default function CartItem({ variantId }) {
  const dispatch = useContext(GlobalDispatchContext);
  const { cartItems } = useContext(GlobalStateContext);
  const data = useStaticQuery(graphql`
    query CartItem {
      site {
        siteMetadata {
          gatsbyStorefrontConfig {
            storePath
          }
        }
      }
      products: allShopifyProduct {
        nodes {
          title
          handle
          variants {
            id
          }
        }
      }
      variants: allShopifyProductVariant {
        nodes {
          id
          price
          title
          image {
            localFile {
              childImageSharp {
                fixed(width: 80, height: 80) {
                  ...GatsbyImageSharpFixed_withWebp_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  `);

  const getTitle = id => {
    // Get product title for given variantId
    const [product] = data.products.nodes.filter(p => {
      const productVariant = p.variants && p.variants.filter(v => v.id === id);
      if (productVariant.length > 0) return p.title;
      return null;
    });
    return product.title;
  };
  const title = getTitle(variantId);

  const getHandle = id => {
    // Get product handle for given variantId
    const [product] = data.products.nodes.filter(p => {
      const productVariant = p.variants && p.variants.filter(v => v.id === id);
      if (productVariant.length > 0) return p.handle;
      return null;
    });
    return product.handle;
  };
  const handle = getHandle(variantId);

  const quantityInCart = getQuantityInCart(variantId, cartItems);
  const [variant] = data.variants.nodes.filter(v => v.id === variantId);
  const variantTitle = variant.title !== 'Default Title' ? variant.title : null;
  const { storePath } = data.site.siteMetadata.gatsbyStorefrontConfig;
  return (
    <CartItemStyle>
      <Img
        fixed={variant.image.localFile.childImageSharp.fixed}
        alt={title}
        style={{ height: '100%', width: '100%' }}
      />
      <div className="middle-col">
        <Link to={`${storePath}/${handle}/`}>
          <h2>{title}</h2>
        </Link>
        <h3>{variantTitle}</h3>
        <p className="price">{formatMoney(variant.price)}</p>
        <button
          className="remove-button"
          type="button"
          onClick={() =>
            dispatch({ type: 'REMOVE_FROM_CART', payload: { variantId } })
          }
        >
          Remove
        </button>
      </div>
      <div className="last-col">
        <div className="update-quantity">
          <UpdateQuantityButton
            variantId={variantId}
            quantity={quantityInCart}
          />
        </div>
      </div>
    </CartItemStyle>
  );
}

CartItem.propTypes = {
  variantId: PropTypes.string.isRequired,
};
