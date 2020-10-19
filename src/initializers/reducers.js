import { combineReducers } from "redux";
import room_configuration from "./room_configuration";
import robot_configuration from "./robot_configuration";

const rootReducer = combineReducers({
  room_configuration,
  robot_configuration
});

export default rootReducer;