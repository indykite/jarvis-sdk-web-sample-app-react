import AuthDialog from "../../components/auth-dialog";
import React, { useCallback, useEffect, useState } from "react";
import { IKUIUserAPI } from "@indykiteone/jarvis-sdk-web";
import { getSearchParams } from "../../utils";

const pageWrapperStyle = {
  display: "flex",
  position: "relative",
  backgroundColor: "#02060C",
  color: "white",
  justifyContent: "center",
  overflow: "auto",
  minHeight: "100vh",
};

const contentWrapperStyle = {
  display: "flex",
  position: "relative",
  maxWidth: "620px",
  width: "100%",
  margin: "120px 0",
  borderRadius: "16px",
  backgroundColor: "#10141A",
  padding: "29px",
};

const CHECK_CONSENT_CHALLENGE_URL = process.env.REACT_APP_CONSENT_SERVER_URI && `${process.env.REACT_APP_CONSENT_SERVER_URI}/checkConsentChallenge`;

const Auth = () => {
  const [consents, setConsents] = useState([]);

  useEffect(() => {
    if (!CHECK_CONSENT_CHALLENGE_URL) return;
    
    const searchParams = getSearchParams();

    Promise.resolve()
      .then(async () => {
        return fetch(`${CHECK_CONSENT_CHALLENGE_URL}/${searchParams["consent_challenge"]}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${await IKUIUserAPI.getValidAccessToken()}`,
          },
        });
      })
      .then((response) => {
        return response.text();
      })
      .then((returnedBody) => {
        const json = JSON.parse(returnedBody);
        setConsents(json.scopes.map(({ name, displayName, required }) => ({
          name,
          description: displayName,
          required
        })));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const allowHandler = useCallback((consents) => {
    const searchParams = getSearchParams();

    Promise.resolve().then(async () => {
      return fetch(`/go/v1/checkConsentChallenge/${searchParams["consent_challenge"]}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await IKUIUserAPI.getValidAccessToken()}`,
        },
        body: JSON.stringify({
          grant_scopes: consents,
          granted_audiences: [],
        }),
      });
    });
  }, []);

  const cancelHandler = useCallback(() => {
    const searchParams = getSearchParams();

    Promise.resolve().then(async () => {
      return fetch(`/go/v1/checkConsentChallenge/${searchParams["consent_challenge"]}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await IKUIUserAPI.getValidAccessToken()}`,
        },
        body: JSON.stringify({
          error: "access_denied",
          error_description: "The acces was denied by a user.",
        }),
      });
    });
  }, []);

  return (
    <div style={pageWrapperStyle}>
      <div style={contentWrapperStyle}>
        <AuthDialog consents={consents} onAllow={allowHandler} onCancel={cancelHandler} />
      </div>
    </div>
  );
};

export default Auth;
