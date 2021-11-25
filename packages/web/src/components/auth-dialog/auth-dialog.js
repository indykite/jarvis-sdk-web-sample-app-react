import Button from "../button";
import ConsentLine from "./consent-line";
import ConsentTitle from "./consent-title";
import Header from "./header";
import React, { useCallback, useEffect, useState } from "react";
import {
  buttonStyle,
  ButtonsWrapperStyle,
  consentNoteStyle,
  consentsWrapperStyle,
  dialogWrapperStyle,
  emptyGridCellStyle,
  headerSeparatorStyle,
} from "./styles";

const AuthDialog = ({ audience, consents, onAllow, onCancel, user }) => {
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
      <Header user={user} />
      <div style={headerSeparatorStyle} />
      <div style={consentsWrapperStyle}>
        <div style={emptyGridCellStyle} />
        <ConsentTitle audience={audience.displayName} />
        {consentLines}
        <div style={emptyGridCellStyle} />
        <div style={consentNoteStyle}>{audience.description}</div>
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
