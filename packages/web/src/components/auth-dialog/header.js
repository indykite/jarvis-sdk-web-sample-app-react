import React from "react";
import {
  accountGridStyle,
  accountNameWrapperStyle,
  avatarStyle,
  headerWrapperStyle,
  switchAccountButtonWrapperStyle,
} from "./styles";

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
