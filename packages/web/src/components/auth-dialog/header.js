import React from "react";

const headerWrapperStyle = {
  display: "flex",
  height: "90px",
  marginBottom: "60px",
  alignItems: "center",
};

const accountGridStyle = {
  display: "grid",
  gridTemplateColumns: "48px auto",
  gridTemplateRows: "48px auto",
  gridGap: "8px 32px",
  gridTemplateAreas: `
    "avatar account"
    ". button"
  `,
  marginLeft: "48px",
  alignItems: "center",
};

const avatarStyle = {
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  backgroundColor: "white",
  gridArea: "avatar",
};

const accountNameWrapperStyle = {
  gridArea: "account",
  fontSize: "14px",
};

const switchAccountButtonWrapperStyle = {
  gridArea: "button",
};

const Header = ({ user }) => {
  return (
    <div style={headerWrapperStyle}>
      <div style={accountGridStyle}>
        <div style={avatarStyle} />
        <div style={accountNameWrapperStyle}>
          You logged in as <b>{user}</b>.
        </div>
        <div style={switchAccountButtonWrapperStyle}>
          {/* We may implement here a `Switch account` button later */}
          {/* <Button secondary onClick={switchAccountClickHandler}>Switch account</Button> */}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Header);
