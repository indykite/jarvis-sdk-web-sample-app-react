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

const Auth = () => {
  const [consents, setConsents] = useState([]);

  useEffect(() => {
    const searchParams = getSearchParams();

    Promise.resolve()
      .then(async () => {
        return fetch(`/go/v1/checkConsentChallenge/${searchParams["consent_challenge"]}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${await IKUIUserAPI.getValidAccessToken()}`,
          },
        });
      })
      .then((response) => {
        console.log("response", response);

        // TODO: Mock
        setConsents([
          {
            description: "Abcd",
            required: true,
            name: "1",
          },
          {
            description: "Efgh",
            name: "2",
          },
          {
            description: "Ijkl",
            name: "3",
          },
        ]);
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
