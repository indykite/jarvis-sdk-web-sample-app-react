import PropTypes from "prop-types";
import React from "react";

const toggleWrapperStyle = {
  display: "flex",
  position: "relative",
  width: "40px",
  height: "20px",
  backgroundColor: "#1D2229",
  borderRadius: "5px",
  cursor: "pointer",
};

const getToggleHandlerStyle = ({ toggled }) => ({
  display: "flex",
  position: "absolute",
  top: "3px",
  left: toggled ? "23px" : "3px",
  width: "14px",
  height: "14px",
  backgroundColor: toggled ? "#6AD48A" : "white",
  borderRadius: "3px",
  transition: "left 0.5s, background-color 0.5s",
});

const Toggle = ({ toggled, onClick }) => {
  return (
    <div style={toggleWrapperStyle} onClick={onClick}>
      <div style={getToggleHandlerStyle({ toggled })} />
    </div>
  );
};

Toggle.defaultProps = {
  onClick: () => {},
  toggled: PropTypes.bool,
};

export default React.memo(Toggle);
