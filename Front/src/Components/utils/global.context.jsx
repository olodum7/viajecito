import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from './reducer'

const localFavs = JSON.parse(localStorage.getItem('favs'))
const initialFavState = localFavs ? localFavs : []

export const initialState = {
  tours:[], 
  favs: initialFavState, 
  isLoggedIn: false,
  userData: null, 
}

export const ContextGlobal = createContext(undefined);

export const ContextProvider = ({ children }) => {
  const [toursState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('favs', JSON.stringify(toursState.favs))
  }, [toursState.favs])

  useEffect(() => {
    const userDataJson = localStorage.getItem("userData");
    const userData = JSON.parse(userDataJson);
    if (userData && userData["isLoggedIn"] === "true") {
      dispatch({ type: "LOGIN", payload: userData });
    }
  }, []);

  return (
    <ContextGlobal.Provider value={{toursState, dispatch}}>
      {children}
    </ContextGlobal.Provider>
  );
};

export default ContextProvider

export const useContextGlobal = () => useContext(ContextGlobal); 
