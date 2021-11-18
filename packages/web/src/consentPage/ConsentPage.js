import AuthDialog from "../../components/auth-dialog";
import React from "react";

const pageWrapperStyle = {
  display: 'flex',
  position: 'relative',
  backgroundColor: '#02060C',
  color: 'white',
  justifyContent: 'center',
  overflow: 'auto',
  minHeight: '100vh',
};

const contentWrapperStyle = {
  display: 'flex',
  position: 'relative',
  maxWidth: '620px',
  width: '100%',
  margin: '120px 0',
  borderRadius: '16px',
  backgroundColor: '#10141A',
  padding: '29px',
};

const Auth = () => {
  return (
    <div style={pageWrapperStyle}>
      <div style={contentWrapperStyle}>
        <AuthDialog />
      </div>
    </div>
  );
};

export default Auth;
