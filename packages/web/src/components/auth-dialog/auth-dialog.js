import Button from "../button";
import ConsentLine from "./consent-line";
import ConsentTitle from "./consent-title";
import Header from "./header";
import React, { useCallback, useEffect, useState } from "react";

const dialogWrapperStyle = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  minHeight: "105px",
  paddingBottom: 48,
};

const headerSeparatorStyle = {
  position: "absolute",
  width: "100%",
  height: "1px",
  left: 0,
  top: "148px",
  backgroundColor: "#141A21",
};

const consentsWrapperStyle = {
  display: "grid",
  gridTemplateColumns: "50px auto",
  alignItems: "flex-start",
  gridGap: "16px 32px",
};

const emptyGridCellStyle = {
  visibility: "hidden",
};

const consentNoteStyle = {
  fontSize: "10px",
  marginTop: "56px",
  marginBottom: "46px",
};

const ButtonsWrapperStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  position: "absolute",
  bottom: "40px",
  left: 0,
  right: 0,
};

const buttonStyle = {
  height: "31px",
  minWidth: "91px",
};

const AuthDialog = ({ audience, consents, onAllow, onCancel }) => {
  const [toggledConsents, setToggledConsents] = useState([]);

  const toggleClickHandler = useCallback(
    (name) => {
      const nameIndex = toggledConsents.indexOf(name);
      if (nameIndex >= 0) {
        setToggledConsents([
          ...toggledConsents.slice(0, nameIndex),
          ...toggledConsents.slice(nameIndex + 1),
        ]);
      } else {
        setToggledConsents([...toggledConsents, name]);
      }
    },
    [toggledConsents],
  );

  useEffect(() => {
    setToggledConsents(
      consents.filter((consent) => consent.required).map((consent) => consent.name),
    );
  }, [consents]);

  const allowClickHandler = useCallback(() => {
    onAllow(toggledConsents);
  }, [onAllow, toggledConsents]);

  const cancelClickHandler = useCallback(() => {
    onCancel();
  }, [onCancel]);

  const consentLines = consents.map(({ description, name, required }) => (
    <ConsentLine
      key={name}
      description={description}
      disabled={required}
      name={name}
      onClick={toggleClickHandler}
      toggled={toggledConsents.includes(name)}
    />
  ));

  if (!audience) return null;

  return (
    <div style={dialogWrapperStyle}>
      <Header />
      <div style={headerSeparatorStyle} />
      <div style={consentsWrapperStyle}>
        <div style={emptyGridCellStyle} />
        <ConsentTitle audience={audience.displayName} />
        {consentLines}
        <div style={emptyGridCellStyle} />
        <div style={consentNoteStyle}>
          {audience.description}
        </div>
      </div>
      <div style={ButtonsWrapperStyle}>
        <Button high style={buttonStyle} onClick={allowClickHandler}>
          Allow
        </Button>
        <Button high secondary style={buttonStyle} onClick={cancelClickHandler}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default AuthDialog;
