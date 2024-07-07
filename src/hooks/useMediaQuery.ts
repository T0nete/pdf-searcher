import { useState, useCallback, useEffect } from 'react';

interface IUseMediaQuery {
  targetReached: boolean;
  handleUpdateTarget: () => void;
}
const useMediaQuery = (width: number): IUseMediaQuery => {
  const [targetReached, setTargetReached] = useState<boolean>(false);

  const updateTarget = useCallback(() => {
    if (window.innerWidth < width) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, [width]);

  useEffect(() => {
    const handleResize = () => updateTarget();

    // Check on mount
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, [updateTarget]);

  const handleUpdateTarget = () => {
    setTargetReached((prev) => !prev);
  };

  return { targetReached, handleUpdateTarget };
};

export default useMediaQuery;
