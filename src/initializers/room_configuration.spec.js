import room_configuration from "./room_configuration";
import * as types from "../events/directional_movement";

describe("Robot Configuration Reducer", () => {
  it("Should return the initial state", () => {
    expect(room_configuration(undefined, {})).toEqual({
      inputFileName: "input.txt",
      isFetching: true,
      inputTextValue: "Loading...",
      roomSize: [5, 5],
      isInputValid: true
    });
  });

  it("Should REQUEST_INPUT_FILE", () => {
    const config = room_configuration(
      { type: types.REQUEST_INPUT_FILE, inputTextValue: "3 3\n4 5" },
      { type: types.REQUEST_INPUT_FILE, inputTextValue: "3 3\n4 5" }
    );
    expect(config).toEqual({
      inputTextValue: "3 3\n4 5",
      type: types.REQUEST_INPUT_FILE
    });
  });

  it("Should RECEIVE_INPUT_FILE", () => {
    const config = room_configuration(
      { isFetching: true, roomSize: [6, 6] },
      { type: types.RECEIVE_INPUT_FILE, inputTextValue: "3 3\n4 5" }
    );
    expect(config).toEqual({ isFetching: false, roomSize: [6, 6] });
  });

  it("Should handle INPUT_TEXT_AREA_UPDATED", () => {
    const inputTextValue = "3 3\n4 5";
    expect(
      room_configuration([], {
        type: types.INPUT_TEXT_AREA_UPDATED,
        newInputTextValue: "3 3\n4 5"
      }).inputTextValue
    ).toEqual(inputTextValue);
  });

  it("Should handle INCORRECT_INPUT_PASSED", () => {
    expect(
      room_configuration([], {
        type: types.INCORRECT_INPUT_PASSED,
        newRoomState: {}
      }).isInputValid
    ).toEqual(false);
  });

  it("Should handle ROOM_SPEC_UPDATED", () => {
    expect(
      room_configuration([], {
        type: types.ROOM_SPEC_UPDATED,
        newRoomState: {
          inputFileName: "input.txt",
          isFetching: true,
          inputTextValue: "Loading...",
          roomSize: [5, 5],
          isInputValid: true
        }
      })
    ).toEqual({
      roomSize: [5, 5],
      isInputValid: true
    });
  });
});