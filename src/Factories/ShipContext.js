import React, { useContext, useReducer, useEffect } from "react";
import ShipReducer from "./ShipReducer";
const initialState = {
  currentShipStart: 0,
  currentShipDirection: 1,
  currentShip: [],
  currentShipNo: 0,
  shipDisplay: [],
  hitDisplay: [],
  shipSunk: [],
};
const ShipContext = React.createContext();
export const ShipProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ShipReducer, initialState);
  useEffect(() => {
    addNewShip();
  }, [state.currentShipStart]);

  useEffect(() => {
    sunkShip();
  }, [hitDisplay]);

  const sunkShip = () => {
    dispatch({ type: "SUNK_SHIP" });
  };

  const changeDirection = () => {
    dispatch({ type: "CHANGE_DIRECTION" });
  };
  const setStart = (item) => {
    dispatch({ type: "SET_START", payload: item });
  };

  const addNewShip = () => {
    dispatch({ type: "ADD_NEW" });
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
        addDisplay,
        sunkShip,
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
