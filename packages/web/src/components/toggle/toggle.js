import PropTypes from "prop-types";
import React from "react";
import { getToggleHandlerStyle, getToggleWrapperStyle } from "./styles";

const Toggle = ({ disabled, toggled, onClick }) => {
  return (
    <div style={getToggleWrapperStyle({ disabled, toggled })} onClick={onClick}>
      <div style={getToggleHandlerStyle({ disabled, toggled })} />
    </div>
  );
};

Toggle.defaultProps = {
  onClick: () => {},
  toggled: PropTypes.bool,
};

export default React.memo(Toggle);
