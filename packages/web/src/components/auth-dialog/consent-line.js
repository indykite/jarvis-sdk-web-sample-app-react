import React, { useCallback } from "react";
import Toggle from "../../components/toggle";

const consentDescriptionStyle = {
  fontSize: "12px",
  display: "flex",
  height: "100%",
  alignItems: "center",
};

const ConsentLine = ({ description, disabled, name, onClick, toggled }) => {
  const clickHandler = useCallback(() => {
    if (disabled) {
      return;
    }
    onClick(name);
  }, [disabled, name, onClick]);

  return (
    <>
      <Toggle disabled={disabled} toggled={toggled} onClick={clickHandler} />
      <div style={consentDescriptionStyle}>{description}</div>
    </>
  );
};

ConsentLine.defaultProps = {
  onClick: () => {},
};

export default React.memo(ConsentLine);
