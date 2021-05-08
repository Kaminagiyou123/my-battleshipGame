import React, { useContext, useReducer, useEffect } from "react";
import ShipReducer from "./ShipReducer";
const initialState = {
  currentShipStart: 0,
  currentShipDirection: 1,
  currentShipNo: 0,
  shipDisplay: [],
  shipHit: [],
};
const ShipContext = React.createContext();
export const ShipProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ShipReducer, initialState);
  useEffect(() => {
    addDisplay();
  }, [state.currentShipStart]);

  const changeDirection = () => {
    dispatch({ type: "CHANGE_DIRECTION" });
  };
  const setStart = (item) => {
    dispatch({ type: "SET_START", payload: item });
  };

  const addDisplay = () => {
    dispatch({ type: "ADD_DISPLAY" });
  };
  const hitDisplay = (item) => {
    dispatch({ type: "HIT_DISPLAY", payload: item });
  };

  return (
    <ShipContext.Provider
      value={{
        ...state,
        changeDirection,
        setStart,
        hitDisplay,
      }}
    >
      {children}
    </ShipContext.Provider>
  );
};
// make sure use
export const useShipContext = () => {
  return useContext(ShipContext);
};
