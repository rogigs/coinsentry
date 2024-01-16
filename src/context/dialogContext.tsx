import React, { createContext, useState } from 'react';

type DialogProvider = {
  children?: React.ReactNode;
};

type DialogType = {
  showDialog: boolean;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DialogContext = createContext<DialogType | null>(null);

export const DialogProvider = ({ children }: DialogProvider) => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <DialogContext.Provider value={{ showDialog, setShowDialog }}>
      {children}
    </DialogContext.Provider>
  );
};
