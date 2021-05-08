const ShipReducer = (state, action) => {
  if (action.type === "CHANGE_DIRECTION") {
    return { ...state, currentShipDirection: state.direction === 1 ? 10 : 1 };
  }
  if (action.type === "SET_START") {
    return { ...state, currentShipStart: parseInt(action.payload) };
  }
  if (action.type === "HIT_DISPLAY") {
    const a = parseInt(action.payload);
    let newHit = [...state.hitDisplay];
    newHit.push(a);
    return { ...state, hitDisplay: newHit };
  }
  if (action.type === "SUNK_SHIP") {
    let checker = (arr, target) => target.every((v) => arr.includes(v));
    for (let i = 0; i < 5; i++) {
      if (checker(state.hitDisplay, state.shipDisplay[i])) {
        const newSunk = [...state.shipSunk].push(i);
        return { ...state, shipSunk: [...newSunk] };
      }
    }
    return { ...state };
  }
  if (action.type === "ADD_NEW") {
    //determine size of the ship next
    let length;
    switch (state.currentShipNo) {
      case 0:
        length = 5;
        break;
      case 1:
        length = 4;
        break;
      case 2:
        length = 3;
        break;
      case 3:
        length = 3;
        break;
      case 4:
        length = 2;
        break;
      default:
        return { ...state };
    }
    // check no overflow
    let a = state.currentShipStart;
    if (
      (state.currentShipDirection === 1 && a % 10 < 11 - length) ||
      (state.currentShipDirection === 10 && a < (11 - length) * 10)
    ) {
      let arr = [];
      for (let i = 0; i < length; i++) {
        arr.push(a);
        a += state.currentShipDirection;
      }
      //check no overlap with previous ships
      const filteredArray = state.shipDisplay
        .flat()
        .filter((value) => arr.includes(value));
      if (filteredArray.length === 0) {
        return {
          ...state,
          currentShip: arr,
        };
      }
    }
    return { ...state };
  }

  if (action.type === "ADD_Display") {
    let newDisplay = [...state.currentDisplay];
    newDisplay.push(state.currentShip);
    return {
      ...state,
      currentShipStart: 0,
      currentShipDirection: 1,
      currentShip: [],
      currentShipNo: state.currentShipNo + 1,
      shipDisplay: newDisplay,
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default ShipReducer;
