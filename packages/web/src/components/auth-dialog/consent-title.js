import React from "react";
import {
  consentTitleWrapperStyle,
  highlightStyle,
  requesterWrapperStyle,
  titleNoteStyle,
} from "./styles";

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
