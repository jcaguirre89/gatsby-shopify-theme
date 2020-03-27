import { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { GlobalStateContext } from '../context/GlobalContextProvider';

export default function useCheckoutAmount() {
  const data = useStaticQuery(graphql`
    query {
      allShopifyProduct {
        nodes {
          variants {
            id
            price
          }
        }
      }
    }
  `);
  const { cartItems } = useContext(GlobalStateContext);
  if (cartItems.length === 0) return 0;

  const enhancedCartItems = data.allShopifyProduct.nodes.map(node => {
    const {
      variants: [firstVariant],
    } = node;
    const { id: variantId, price } = firstVariant;
    const [cartItem] = cartItems.filter(item => item.variantId === variantId);
    const quantity = typeof cartItem === 'undefined' ? 0 : cartItem.quantity;
    return { variantId, price, quantity };
  });

  if (enhancedCartItems.length === 0) return 0;

  const amount = enhancedCartItems.reduce(
    (agg, item) => agg + item.quantity * item.price,
    0
  );
  return amount;
}
