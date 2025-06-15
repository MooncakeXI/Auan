// frontend/src/components/SakuraEffect.tsx

'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

declare const Sakura: any; // บอก TypeScript ว่าจะมีตัวแปร Sakura ใน Global scope

export default function SakuraEffect() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    if (isScriptLoaded) {
      // เมื่อ Script โหลดเสร็จ ให้เริ่มสร้าง instance ของ Sakura
      const sakura = new Sakura('body', {
        colors: [
          {
            gradientColorStart: 'rgba(255, 183, 197, 0.9)',
            gradientColorEnd: 'rgba(255, 197, 208, 0.9)',
            gradientColorDegree: 120,
          },
          {
            gradientColorStart: 'rgba(255,255,255,0.9)',
            gradientColorEnd: 'rgba(232,222,238,0.9)',
            gradientColorDegree: 120,
          },
          {
            gradientColorStart: 'rgba(252, 211, 241, 0.9)',
            gradientColorEnd: 'rgba(244, 198, 224, 0.9)',
            gradientColorDegree: 120,
          },
        ],
        fallSpeed: 1.5,
      });

      return () => {
        // Cleanup function เมื่อ component ถูก unmount
        sakura.stop();
      };
    }
  }, [isScriptLoaded]);

  return (
    <Script
      src="/js/sakura.min.js"
      onLoad={() => setIsScriptLoaded(true)}
    />
  );
}