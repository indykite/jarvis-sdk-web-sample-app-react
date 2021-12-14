const getBackgroundColor = (disabled) => {
  return disabled ? "#595E65" : "#1D2229";
};

const getHandlerColor = ({ disabled, hover, toggled }) => {
  if (disabled) {
    return toggled ? "#BAE0D0" : "#B6C2D4";
  }

  if (hover) {
    return toggled ? "#56C076" : "#B6C2D4";
  }

  return toggled ? "#6AD48A" : "#FFFFFF";
};

export const getToggleWrapperStyle = ({ disabled }) => ({
  display: "flex",
  position: "relative",
  width: "40px",
  height: "20px",
  backgroundColor: getBackgroundColor(disabled),
  borderRadius: "5px",
  cursor: "pointer",
});

export const getToggleHandlerStyle = ({ disabled, hover, toggled }) => ({
  display: "flex",
  position: "absolute",
  top: "3px",
  left: toggled ? "23px" : "3px",
  width: "14px",
  height: "14px",
  backgroundColor: getHandlerColor({ disabled, hover, toggled }),
  borderRadius: "3px",
  transition: "left 0.5s, background-color 0.5s",
});
