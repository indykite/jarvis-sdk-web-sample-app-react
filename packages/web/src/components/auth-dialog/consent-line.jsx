import React, { useState } from "react";
import Toggle from "../../components/toggle";

const consentDescriptionStyle = {
  fontSize: '12px',
  display: 'flex',
  height: '100%',
  alignItems: 'center',
};

const ConsentLine = () => {
  const [mockedState, setMockedState] = useState(false);

  return (
    <>
      <Toggle toggled={mockedState} onClick={() => setMockedState(!mockedState)} />
      <div style={consentDescriptionStyle}>1213</div>
    </>
  );
};

export default ConsentLine;
