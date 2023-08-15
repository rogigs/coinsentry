import { createContext, useContext, useState } from 'react';

const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [item, setItem] = useState();

  return (
    <ItemContext.Provider value={{ item, setItem }}>
      {children}
    </ItemContext.Provider>
  );
};

export const useItem = () => {
  const context = useContext(ItemContext);

  if (!context) {
    throw new Error('useItem must be used within a ItemProvider');
  }

  return context;
};
