import Button from "../button";
import React from "react";

const headerWrapperStyle = {
  display: 'flex',
  height: '90px',
  marginBottom: '60px',
  alignItems: 'center',
};

const accountGridStyle = {
  display: 'grid',
  gridTemplateColumns: '48px auto',
  gridTemplateRows: '48px auto',
  gridGap: '8px 32px',
  gridTemplateAreas: `
    "avatar account"
    ". button"
  `,
  marginLeft: '48px',
  alignItems: 'center',
};

const avatarStyle = {
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  backgroundColor: 'white',
  gridArea: 'avatar',
};

const accountNameWrapperStyle = {
  gridArea: 'account',
  fontSize: '14px',
};

const switchAccountButtonWrapperStyle = {
  gridArea: 'button',
};

const Header = () => {
  return (
    <div style={headerWrapperStyle}>
      <div style={accountGridStyle}>
        <div style={avatarStyle} />
        <div style={accountNameWrapperStyle}>
          You logged in as <b>Cory Forbes</b>.
        </div>
        <div style={switchAccountButtonWrapperStyle}>
          <Button secondary>Switch account</Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
