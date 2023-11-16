import {useEffect, useMemo, useState} from 'react';
function isBrowser() {
  return (
    typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined'
  );
}

export function useMatchMedia(mediaQuery: string): boolean | undefined {
  const [cycle, updateCycle] = useState(-1);

  const mql = useMemo(() => {
    return isBrowser() ? window.matchMedia(mediaQuery) : null;
  }, [mediaQuery]);

  useEffect(() => {
    function handler() {
      updateCycle((n) => n + 1);
    }

    if (mql) {
      mql.addEventListener('change', handler);
    }

    handler();

    return () => {
      if (mql) {
        mql.removeEventListener('change', handler);
      }
    };
  }, [mql]);

  return cycle >= 0 && mql ? mql.matches : undefined;
}