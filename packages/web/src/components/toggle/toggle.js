import PropTypes from "prop-types";
import React, { useCallback, useRef, useState } from "react";
import { getToggleHandlerStyle, getToggleWrapperStyle } from "./styles";

const Toggle = ({ disabled, toggled, onClick }) => {
  const [hover, setHover] = useState(false);
  const toggleWrapperEl = useRef(null);

  const mouseEnterHandler = useCallback(() => {
    setHover(true);
  }, []);

  const mouseLeaveHandler = useCallback(() => {
    setHover(false);
  }, []);

  return (
    <div
      ref={toggleWrapperEl}
      style={getToggleWrapperStyle({ disabled, hover, toggled })}
      onClick={onClick}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <div style={getToggleHandlerStyle({ disabled, hover, toggled })} />
    </div>
  );
};

Toggle.defaultProps = {
  onClick: () => {},
  toggled: PropTypes.bool,
};

export default React.memo(Toggle);
