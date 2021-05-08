const ShipReducer = (state, action) => {
  if (action.type === "CHANGE_DIRECTION") {
    return { ...state, currentShipDirection: state.direction === 1 ? 10 : 1 };
  }
  if (action.type === "SET_START") {
    return { ...state, currentShipStart: parseInt(action.payload) };
  }
  if (action.type === "HIT_DISPLAY") {
    const a = parseInt(action.payload);
    if (state.shipDisplay.includes.a && !state.shipHit.includes.a) {
      return { ...state, shipHit: state.shipHit.push(a) };
    }
    return { ...state };
  }
  if (action.type === "ADD_DISPLAY") {
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
      const filteredArray = state.shipDisplay.filter((value) =>
        arr.includes(value)
      );
      if (filteredArray.length === 0) {
        return {
          ...state,
          shipDisplay: state.shipDisplay.push(...arr),
          currentShipNo: state.currentShipNo + 1,
        };
      }
    }
    return { ...state };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default ShipReducer;
