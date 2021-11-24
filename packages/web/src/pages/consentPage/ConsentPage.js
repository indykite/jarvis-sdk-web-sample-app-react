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

const CHECK_CONSENT_CHALLENGE_URL = process.env.REACT_APP_SERVER_URI && `${process.env.REACT_APP_SERVER_URI}/checkConsentChallenge`;
const CREATE_CONSENT_VERIFIER_URL = process.env.REACT_APP_SERVER_URI && `${process.env.REACT_APP_SERVER_URI}/createConsentVerifier`;
const GET_DIGITAl_TWIN_URL = process.env.REACT_APP_SERVER_URI && `${process.env.REACT_APP_SERVER_URI}/getDigitalTwin`;

const getEmailFromDigitalTwin = (digitalTwin) => {
  const properties = digitalTwin.properties || [];
  const emailProperty = properties.find(property => {
    return property?.definition?.property === 'email' && property?.meta?.primary;
  });
  return emailProperty?.value?.stringValue;
};

const Auth = () => {
  const [consents, setConsents] = useState([]);
  const [audience, setAudience] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    if (!CHECK_CONSENT_CHALLENGE_URL) return;
    
    const searchParams = getSearchParams();

    Promise.resolve()
      .then(async () => {
        return fetch(GET_DIGITAl_TWIN_URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${await IKUIUserAPI.getValidAccessToken()}`,
          },
        });
      })
      .then((response) => {
        return response.json();
      })
      .then(async (json) => {
        setEmail(getEmailFromDigitalTwin(json.digitalTwin));

        return fetch(`${CHECK_CONSENT_CHALLENGE_URL}/${searchParams["consent_challenge"]}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${await IKUIUserAPI.getValidAccessToken()}`,
          },
        });
      })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setConsents((json.scopes || []).map(({ name, displayName, required }) => ({
          name,
          description: displayName,
          required
        })));
        const returnedAudience = json.audiences?.[0] ?? {};
        if (returnedAudience) {
          setAudience(returnedAudience);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const sendUserResponse = useCallback((url, body) => {
    Promise.resolve().then(async () => {
      return fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await IKUIUserAPI.getValidAccessToken()}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify(body),
      }).then((response) => {
        return response.json();
      }).then((json) => {
        const params = new URLSearchParams(window.location.search);
        params.delete('login_challenge');
        params.delete('consent_challenge');
        params.append('consent_verifier', json.verifier);

        window.location.href = `${json.authorizationEndpoint}/?${params.toString()}`;
      });
    }).catch(err => {
      console.error(err);
    });
  }, []);

  const allowHandler = useCallback((consents) => {
    const searchParams = getSearchParams();

    sendUserResponse(`${CREATE_CONSENT_VERIFIER_URL}/${searchParams["consent_challenge"]}`, {
      approval: {
        grantScopes: consents,
        grantedAudiences: [audience?.clientId],
      }
    });
  }, [audience, sendUserResponse]);

  const cancelHandler = useCallback(() => {
    const searchParams = getSearchParams();

    sendUserResponse(`${CREATE_CONSENT_VERIFIER_URL}/${searchParams["consent_challenge"]}`, {
      denial: {
        error: "access_denied",
        errorDescription: "The access was denied by a user.",
      }
    });
  }, [sendUserResponse]);

  return (
    <div style={pageWrapperStyle}>
      <div style={contentWrapperStyle}>
        <AuthDialog audience={audience} consents={consents} onAllow={allowHandler} onCancel={cancelHandler} user={email} />
      </div>
    </div>
  );
};

export default Auth;
