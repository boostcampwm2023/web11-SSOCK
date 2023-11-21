import React, { useState, createContext } from 'react';

interface PrevContextType {
  view: boolean;
  setView: React.Dispatch<React.SetStateAction<boolean>>;
}

const PrevContext = createContext<PrevContextType>({
  view: false,
  setView: () => {}
});

const PrevProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [view, setView] = useState(false);

  return (
    <PrevContext.Provider value={{ view, setView }}>
      {children}
    </PrevContext.Provider>
  );
};

export { PrevContext, PrevProvider };
