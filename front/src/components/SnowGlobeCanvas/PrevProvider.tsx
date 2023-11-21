import React, { useState, createContext } from 'react';

interface PrevContextType {
  view: boolean;
  setView: React.Dispatch<React.SetStateAction<boolean>>;
  isZoom: boolean;
  setIsZoom: React.Dispatch<React.SetStateAction<boolean>>;
}

const PrevContext = createContext<PrevContextType>({
  view: false,
  setView: () => {},
  isZoom: false,
  setIsZoom: () => {}
});

const PrevProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [view, setView] = useState(false);
  const [isZoom, setIsZoom] = useState(false);

  return (
    <PrevContext.Provider value={{ view, setView, isZoom, setIsZoom }}>
      {children}
    </PrevContext.Provider>
  );
};

export { PrevContext, PrevProvider };
