const waypointReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FROM_LS":
      return action.waypointsFromLS;
    case "ADD":
      return [...state, action.waypoint];
    case "REMOVE_ONE":
      return state.filter((item)=>item.uuid !== action.uuid);
    default:
      return state;
  }
};

export default waypointReducer;
