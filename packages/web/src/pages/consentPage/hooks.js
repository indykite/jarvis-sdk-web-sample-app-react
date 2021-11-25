import { useCallback } from "react";
import { IKUIUserAPI } from "@indykiteone/jarvis-sdk-web";
import { getEmailFromDigitalTwin } from "../../utils";

const URLS = process.env.REACT_APP_SERVER_URI
  ? {
      CHECK_CONSENT_CHALLENGE_URL: `${process.env.REACT_APP_SERVER_URI}/checkConsentChallenge`,
      CREATE_CONSENT_VERIFIER_URL: `${process.env.REACT_APP_SERVER_URI}/createConsentVerifier`,
      GET_DIGITAl_TWIN_URL: `${process.env.REACT_APP_SERVER_URI}/getDigitalTwin`,
    }
  : {};

/**
 * @returns {Promise<string|undefined>}
 */
export const useGetAuthorizedUserEmail = () => {
  return useCallback(() => {
    if (!URLS.GET_DIGITAl_TWIN_URL) return Promise.resolve();

    return Promise.resolve()
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
        return getEmailFromDigitalTwin(json.digitalTwin);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
};

/**
 * @param {string} consentChallenge
 * @returns {() => undefined | Promise<[{
 *   name: string;
 *   description: string;
 *   required?: boolean;
 * }[], {
 *   clientId: string;
 *   description: string;
 *   displayName: string;
 * }]>}
 */
export const useGetConsents = (consentChallenge) => {
  return useCallback(() => {
    if (!URLS.CHECK_CONSENT_CHALLENGE_URL) return Promise.resolve([[], {}]);

    return Promise.resolve()
      .then(async (json) => {
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
        const consents = (json.scopes || []).map(({ name, displayName, required }) => ({
          name,
          description: displayName,
          required,
        }));
        const audience = json.audiences?.[0] ?? {};
        return [consents, audience];
      })
      .catch((err) => {
        console.error(err);
        return [[], {}];
      });
  }, [consentChallenge]);
};

/**
 * @param {string} consentChallenge
 * @returns {[
 *   (consents: string[], audienceClientId: string) => Promise<string>,
 *   (error: string, errorDescription: string) => Promise<string>,
 * ]}
 */
export const useGetVerifier = (consentChallenge) => {
  const sendUserResponse = useCallback(async (url, body) => {
    return Promise.resolve()
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

            return `${json.authorizationEndpoint}/?${params.toString()}`;
          });
      })
      .catch((err) => {
        console.error(err);
        return window.location.href;
      });
  }, []);

  const approve = useCallback(
    (consents, audienceClientId) => {
      if (!URLS.CREATE_CONSENT_VERIFIER_URL) return;

      return sendUserResponse(`${URLS.CREATE_CONSENT_VERIFIER_URL}/${consentChallenge}`, {
        approval: {
          grantScopes: consents,
          grantedAudiences: [audienceClientId],
        },
      });
    },
    [consentChallenge, sendUserResponse],
  );

  const deny = useCallback(
    (error, errorDescription) => {
      if (!URLS.CREATE_CONSENT_VERIFIER_URL) return;

      return sendUserResponse(`${URLS.CREATE_CONSENT_VERIFIER_URL}/${consentChallenge}`, {
        denial: {
          error,
          errorDescription,
        },
      });
    },
    [consentChallenge, sendUserResponse],
  );

  return [approve, deny];
};
