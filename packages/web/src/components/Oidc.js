import React, { useState } from "react";
import { IKUIOidc } from "@indykiteone/jarvis-sdk-web";
import { useHistory } from "react-router-dom";

// This is used when Indykite is the provider
const Oidc = () => {
  React.useEffect(() => {
    const sparkOidc = async () => {
      await IKUIOidc.handleOidcOriginalParamsAndRedirect();
    };

    sparkOidc();
  });

  return <h3>oidc</h3>;
};

// This is where FB, Google and other providers can redirect you
const Callback = ({ setToken }) => {
  const history = useHistory();
  const [error, setError] = useState("");

  React.useEffect(() => {
    // It's important that oidcCallback is called just once, multiple calls can end up with errors
    IKUIOidc.oidcCallback()
      .then((data) => {
        if (data.redirect_to) {
          window.location.href = data.redirect_to;
        } else {
          history.push("/authenticated");
        }
        // You can save the token in your app in case you need it but UISDK can handle all this for you
        // so theoretically you don't need to manage tokens yourself.
        setToken(data);
      })
      .catch((e) => {
        // The App developer is responsible for handling the error in this phase.
        // TODO: We should consider handling this error using UI SDK so the devs don't need to
        setError(JSON.stringify(e));
      });
  }, [history, setToken]);

  return (
    <div>
      <h3>general callback</h3>
      <div>{error}</div>
    </div>
  );
};

export default Oidc;
export { Callback };
