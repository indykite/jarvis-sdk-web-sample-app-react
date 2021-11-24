import AuthDialog from "../../components/auth-dialog";
import React, { useCallback, useEffect, useState } from "react";
import { getSearchParam } from "../../utils";
import { contentWrapperStyle, pageWrapperStyle } from "./styles";
import { useGetAuthorizedUserEmail, useGetConsents, useGetVerifier } from "./hooks";

const ConsentPage = () => {
  const [consents, setConsents] = useState([]);
  const [audience, setAudience] = useState(null);
  const [email, setEmail] = useState(null);
  const getUserEmail = useGetAuthorizedUserEmail();
  const consentChallenge = getSearchParam("consent_challenge");
  const getConsents = useGetConsents(consentChallenge);
  const [approveConsents, denyConsents] = useGetVerifier(consentChallenge);

  useEffect(() => {
    getUserEmail().then((email) => {
      if (email) setEmail(email);
    });

    getConsents().then(([consents, audience]) => {
      setConsents(consents);
      setAudience(audience);
    });
  }, [consentChallenge, getUserEmail, getConsents]);

  const allowHandler = useCallback(
    (consents) => {
      approveConsents(consents, audience?.clientId).then((redirectUrl) => {
        window.location.href = redirectUrl;
      });
    },
    [approveConsents, audience],
  );

  const cancelHandler = useCallback(() => {
    denyConsents("access_denied", "The access was denied by a user.").then((redirectUrl) => {
      window.location.href = redirectUrl;
    });
  }, [denyConsents]);

  return (
    <div style={pageWrapperStyle}>
      <div style={contentWrapperStyle}>
        {consents.length > 0 && (
          <AuthDialog
            audience={audience}
            consents={consents}
            onAllow={allowHandler}
            onCancel={cancelHandler}
            user={email}
          />
        )}
      </div>
    </div>
  );
};

export default ConsentPage;
