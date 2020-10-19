import { combineReducers } from "redux";
import room_configuration from "./roomConfiguration";
import robot_configuration from "./robotConfiguration";

const rootReducer = combineReducers({
  room_configuration,
  robot_configuration
});

export default rootReducer;