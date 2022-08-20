import { createContext, useContext } from "react";

export const pollContext = createContext(null);

export const usePollContext = () => {
    return useContext(pollContext);
}