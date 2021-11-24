import React from "react";

const consentTitleWrapperStyle = {
  marginBottom: "40px",
};

const requesterWrapperStyle = {
  fontSize: "20px",
  marginBottom: "8px",
};

const titleNoteStyle = {
  fontSize: "14px",
};

const highlightStyle = {
  color: "#6AD48A",
};

const ConsentTitle = ({ audience }) => {
  return (
    <div style={consentTitleWrapperStyle}>
      <div style={requesterWrapperStyle}>
        <span style={highlightStyle}>{audience}</span> wants to access your data
      </div>
      <div style={titleNoteStyle}>
        By selecting <span style={highlightStyle}>Allow</span>, you accept to give access to the
        selected items.
      </div>
    </div>
  );
};

export default React.memo(ConsentTitle);
