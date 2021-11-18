import AuthDialog from "../../components/auth-dialog";
import React, { useEffect } from "react";
import {IKUIUserAPI } from "indykite-ui-sdk";
import { getSearchParams } from "../../utils";

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
  useEffect(() => {
    const searchParams = getSearchParams();

    Promise.resolve().then(async () => {
      return fetch(`/go/v1/checkConsentChallenge/${searchParams['consent_challenge']}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${await IKUIUserAPI.getValidAccessToken()}`
        }
      });
    }).then(response => {
      console.log('response', response);
    }).catch(err => {
      console.error(err);
    })
  }, []);

  return (
    <div style={pageWrapperStyle}>
      <div style={contentWrapperStyle}>
        <AuthDialog />
      </div>
    </div>
  );
};

export default Auth;
