import React from "react";
import PropTypes from "prop-types";

const room_spec = ({ inputTextValue, onChange, disabled }) => (
  <div>
    <label>
      Input area
      <textarea
        disabled={disabled}
        onChange={onChange}
        value={inputTextValue}
      />
    </label>
  </div>
);

room_spec.propTypes = {
  inputTextValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default room_spec;