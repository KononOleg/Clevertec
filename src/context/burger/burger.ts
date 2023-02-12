import { createContext } from 'react';

type UserContextType = {
  isBurgerActive: boolean;
  setIsBurgerActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const iUserContextState = {
  isBurgerActive: false,
  setIsBurgerActive: () => {},
};

export const BurgerContext = createContext<UserContextType>(iUserContextState);
