'use client';

import { hslToHex } from '@/lib/hslToHex';
import NextTopLoader from 'nextjs-toploader';
import { useEffect, useState } from 'react';

export function ProgressBar() {
  const [isClient, setIsClient] = useState(false);
  const color = '21 66.7% 44.7%';
  const [h, s, l] = color.split(' ').map((el) => Number(el.replace('%', '')));

  const hexColor = hslToHex(h, s, l);

  useEffect(function () {
    setIsClient(true);
  }, []);

  return (
    isClient && (
      <NextTopLoader color={hexColor} height={1} showSpinner={false} />
    )
  );
}
