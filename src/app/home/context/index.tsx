import { createContext, useState } from 'react';

export const ItemContext = createContext(undefined);

export const ItemProvider = ({ children }) => {
  const [item, setItem] = useState(undefined);

  return (
    <ItemContext.Provider value={{ item, setItem }}>
      {children}
    </ItemContext.Provider>
  );
};
