import React from "react";

const getLabelColorName = ({ warning, secondary }) => {
  if (warning) {
    return "red";
  }
  if (secondary) {
    return "#3D4047";
  }
  return "#6AD48A";
};

const getButtonStyle = (props) => ({
  backgroundColor: getLabelColorName(props),
  border: 0,
  borderRadius: "5px",
  padding: "4.5px 20px",
  cursor: "pointer",
  color: props.secondary ? "white" : "black",
});

const Button = ({ children, style = {}, ...props }) => {
  const { high, secondary, warning, ...buttonProps } = props;
  return (
    <button style={Object.assign({}, getButtonStyle(props), style)} {...buttonProps}>
      {children}
    </button>
  );
};

export default React.memo(Button);
