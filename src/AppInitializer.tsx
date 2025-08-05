import { useEffect, useState } from 'react';

interface AppInitializerProps {
  children: React.ReactNode;
}

export const AppInitializer = ({ children }: AppInitializerProps) => {
  const [showChildren, setShowChildren] = useState(false);
  useEffect(() => {
    const fakeSplash = document.getElementById('fakeSplash');
    if (fakeSplash) {
      setTimeout(() => {
        fakeSplash.remove();
        setShowChildren(true);
      }, 1000);
    } else {
      setShowChildren(true);
    }
  }, []);
  return <>{showChildren && children}</>;
};
