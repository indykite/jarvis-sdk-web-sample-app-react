import AuthDialog from "../../components/auth-dialog";
import React, { useCallback, useEffect, useState } from "react";
import { IKUIUserAPI } from "@indykiteone/jarvis-sdk-web";
import { getEmailFromDigitalTwin, getSearchParam } from "../../utils";
import { contentWrapperStyle, pageWrapperStyle } from "./styles";

const URLS = process.env.REACT_APP_SERVER_URI
  ? {
      CHECK_CONSENT_CHALLENGE_URL: `${process.env.REACT_APP_SERVER_URI}/checkConsentChallenge`,
      CREATE_CONSENT_VERIFIER_URL: `${process.env.REACT_APP_SERVER_URI}/createConsentVerifier`,
      GET_DIGITAl_TWIN_URL: `${process.env.REACT_APP_SERVER_URI}/getDigitalTwin`,
    }
  : {};

const Auth = () => {
  const [consents, setConsents] = useState([]);
  const [audience, setAudience] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    if (!URLS.CHECK_CONSENT_CHALLENGE_URL) return;

    const consentChallenge = getSearchParam("consent_challenge");

    Promise.resolve()
      .then(async () => {
        return fetch(URLS.GET_DIGITAl_TWIN_URL, {
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

        return fetch(`${URLS.CHECK_CONSENT_CHALLENGE_URL}/${consentChallenge}`, {
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
        setConsents(
          (json.scopes || []).map(({ name, displayName, required }) => ({
            name,
            description: displayName,
            required,
          })),
        );
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
    Promise.resolve()
      .then(async () => {
        return fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${await IKUIUserAPI.getValidAccessToken()}`,
            "content-type": "application/json",
          },
          body: JSON.stringify(body),
        })
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            const params = new URLSearchParams(window.location.search);
            params.delete("login_challenge");
            params.delete("consent_challenge");
            params.append("consent_verifier", json.verifier);

            window.location.href = `${json.authorizationEndpoint}/?${params.toString()}`;
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const allowHandler = useCallback(
    (consents) => {
      const consentChallenge = getSearchParam("consent_challenge");

      sendUserResponse(`${URLS.CREATE_CONSENT_VERIFIER_URL}/${consentChallenge}`, {
        approval: {
          grantScopes: consents,
          grantedAudiences: [audience?.clientId],
        },
      });
    },
    [audience, sendUserResponse],
  );

  const cancelHandler = useCallback(() => {
    const consentChallenge = getSearchParam("consent_challenge");

    sendUserResponse(`${URLS.CREATE_CONSENT_VERIFIER_URL}/${consentChallenge}`, {
      denial: {
        error: "access_denied",
        errorDescription: "The access was denied by a user.",
      },
    });
  }, [sendUserResponse]);

  return (
    <div style={pageWrapperStyle}>
      <div style={contentWrapperStyle}>
        <AuthDialog
          audience={audience}
          consents={consents}
          onAllow={allowHandler}
          onCancel={cancelHandler}
          user={email}
        />
      </div>
    </div>
  );
};

export default Auth;
