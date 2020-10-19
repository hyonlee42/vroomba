import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { App } from "./app";

Enzyme.configure({ adapter: new Adapter() });

const setupTests = (isInputValid = true, isFetching = false) => {
  const props = {
    inputFileName: "input.txt",
    inputTextValue: "",
    isFetching: isFetching,
    roomSize: [5, 5],
    dirtLocations: [[1, 1], [2, 2]],
    robotPosition: [0, 0],
    directions: ["N", "S", "W", "E", "E"],
    isInputValid: isInputValid,
    errorMessage: "Error message",
    hasCompletedAnimation: true,
    removedDirtCount: 0,
    dispatch: jest.fn()
  };

  const enzymeWrapper = mount(<App {...props} />);

  return {
    props,
    enzymeWrapper
  };
};

describe("components", () => {
  describe("App", () => {
    it("Should render Header and subcomponents", () => {
      const { enzymeWrapper } = setupTests();

      expect(enzymeWrapper.find("header").hasClass("app-header")).toBe(true);
      expect(enzymeWrapper.find("h1").text()).toBe("Robotic Hoover");
    });

    it("Should handle invalid input message", () => {
      const { enzymeWrapper } = setupTests(false);
      expect(enzymeWrapper.find("p.error").text()).toBe("Error message");
    });

    it("Should render isFetching class", () => {
      const { enzymeWrapper } = setupTests(false, true);
      expect(enzymeWrapper.find("div.data-viz").hasClass("fetching")).toBe(
        true
      );
    });

    it("Should render room_spec and room_viz", () => {
      const { enzymeWrapper } = setupTests(true, true);
      const room_spec_props = enzymeWrapper.find("room_spec").props();
      const room_viz_props = enzymeWrapper.find("room_viz").props();
      const resultOutputProps = enzymeWrapper.find("ResultOutput").props();
      const appProps = enzymeWrapper.props();

      expect(appProps.isFetching).toBe(true);
      expect(room_spec_props.disabled).toBe(true);
      expect(room_viz_props.hasCompletedAnimation).toBe(true);
      expect(resultOutputProps.removedDirtCount).toBe(0);
    });

    it("Fires onchange correctly", () => {
      const { enzymeWrapper } = setupTests();
      const event = { target: { value: "" } };
      jest.resetAllMocks();

      expect(
        enzymeWrapper
          .find("room_spec")
          .find("textarea")
          .simulate("change", event)
      );
    });
  });
});