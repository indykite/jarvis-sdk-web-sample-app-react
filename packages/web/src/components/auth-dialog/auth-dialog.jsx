import Button from "../button";
import ConsentLine from "./consent-line";
import ConsentTitle from "./consent-title";
import Header from "./header";
import React from "react";

const dialogWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  minHeight: '105px',
  paddingBottom: 48,
};

const headerSeparatorStyle = {
  position: 'absolute',
  width: '100%',
  height: '1px',
  left: 0,
  top: '148px',
  backgroundColor: '#141A21',
};

const consentsWrapperStyle = {
  display: 'grid',
  gridTemplateColumns: '50px auto',
  alignItems: 'flex-start',
  gridGap: '16px 32px',
};

const emptyGridCellStyle = {
  visibility: 'hidden',
};

const consentNoteStyle = {
  fontSize: '10px',
  marginTop: '56px',
  marginBottom: '46px',
};

const ButtonsWrapperStyle = {
  display: 'flex',
  justifyContent: 'space-evenly',
  position: 'absolute',
  bottom: '40px',
  left: 0,
  right: 0,
};

const buttonStyle = {
  height: '31px',
  minWidth: '91px',
};

const AuthDialog = () => {
  return (
    <div style={dialogWrapperStyle}>
      <Header />
      <div style={headerSeparatorStyle} />
      <div style={consentsWrapperStyle}>
        <div style={emptyGridCellStyle} />
        <ConsentTitle />
        <ConsentLine />
        <ConsentLine />
        <ConsentLine />
        <ConsentLine />
        <div style={emptyGridCellStyle} />
        <div style={consentNoteStyle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Fames ac turpis egestas sed tempus.
          Dignissim sodales ut eu sem integer vitae.
        </div>
      </div>
      <div style={ButtonsWrapperStyle}>
        <Button high style={buttonStyle}>Allow</Button>
        <Button high secondary style={buttonStyle}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default AuthDialog;
