import React, { useState } from 'react';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';

export default function useSmartHeader() {
  const [hideNavbarOnScroll, setHideNavbarOnScroll] = useState(true);
  const [transparent, setTransparent] = useState(true);

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y || prevPos.y > -100;
      if (isShow !== hideNavbarOnScroll) setHideNavbarOnScroll(isShow);

      const isTransparent = currPos.y >= -100;
      if (isTransparent !== transparent) setTransparent(isTransparent);
    },
    [hideNavbarOnScroll, transparent],
    null,
    false,
    100
  );
  return [hideNavbarOnScroll, transparent];
}
