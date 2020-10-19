import React, { Component } from "react";
import room_spec from "../components/room_spec";
import room_viz from "../components/room_viz";
import result_output from "../components/result_output";
import { connect } from "react-redux";
import { fetchInputFile } from "../events/event_creator";
import PropTypes from "prop-types";

import "./app.css";
import { parseStateFromText } from "../events/event_creator";

export class App extends Component {
  componentDidMount() {
    const { dispatch, inputFileName } = this.props;
    dispatch(fetchInputFile(inputFileName));
  }

  onInputTextChange = event => {
    this.props.dispatch(parseStateFromText(event.target.value));
  };

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">Vroomba</h1>
          <a
            id="back-to-code"
            href="https://github.com/hyonlee42/vroomba"
            target="_blank"
            rel="noopener noreferrer"
          >
            See code
          </a>
        </header>
        <div className="app-content">
          <room_spec
            inputTextValue={this.props.inputTextValue}
            disabled={this.props.isFetching}
            onChange={event => this.onInputTextChange(event)}
          />
          <div
            className={"data-viz" + (this.props.isFetching ? " fetching" : "")}
          >
            <room_viz
              roomSize={this.props.roomSize}
              dirtLocations={this.props.dirtLocations}
              robotPosition={this.props.robotPosition}
              directions={this.props.robotPosition}
              isInputValid={this.props.isInputValid}
              hasCompletedAnimation={this.props.hasCompletedAnimation}
            />
          </div>
          <result_output
            robotPosition={this.props.robotPosition}
            removedDirtCount={this.props.removedDirtCount}
          />
          <p className="error">
            {!this.props.isInputValid ? this.props.errorMessage : ""}
          </p>
        </div>
      </div>
    );
  }

  static propTypes = {
    inputFileName: PropTypes.string.isRequired,
    inputTextValue: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    roomSize: PropTypes.arrayOf(PropTypes.number.isRequired),
    dirtLocations: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.number.isRequired)
    ),
    robotPosition: PropTypes.arrayOf(PropTypes.number.isRequired),
    directions: PropTypes.arrayOf(PropTypes.string),
    isInputValid: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    hasCompletedAnimation: PropTypes.bool.isRequired,
    removedDirtCount: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired
  };
}

const mapStateToProps = state => ({
  inputFileName: state.room_configuration.inputFileName,
  inputTextValue: state.room_configuration.inputTextValue,
  isFetching: state.room_configuration.isFetching,
  roomSize: state.room_configuration.roomSize,
  dirtLocations: state.robot_configuration.dirtLocations,
  robotPosition: state.robot_configuration.robotPosition,
  directions: state.robot_configuration.directions,
  isInputValid: state.room_configuration.isInputValid,
  errorMessage: state.room_configuration.errorMessage,
  hasCompletedAnimation: state.robot_configuration.hasCompletedAnimation,
  removedDirtCount: state.robot_configuration.removedDirtCount
});

export default connect(mapStateToProps)(App);