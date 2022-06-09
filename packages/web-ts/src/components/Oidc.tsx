import React, { useState } from "react";
import { DataTokenResponseType, IKUIOidc } from "@indykiteone/jarvis-sdk-web";
import { useNavigate } from "react-router-dom";

// This is used when Indykite is the provider
const Oidc = () => {
  let ignore = false;
  React.useEffect(() => {
    if (!ignore) {
      const sparkOidc = async () => {
        await IKUIOidc.handleOidcOriginalParamsAndRedirect();
      };

      sparkOidc();
    }
    return () => {
      ignore = true;
    };
  });

  return <h3>oidc</h3>;
};

interface IProps {
  setToken: (data: DataTokenResponseType) => void;
}

// This is where FB, Google and other providers can redirect you
const Callback: React.FC<IProps> = ({ setToken }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  React.useEffect(() => {
    // It's important that oidcCallback is called just once, multiple calls can end up with errors

    let ignore = false;
    if (!ignore) {
      IKUIOidc.oidcCallback()
        .then((data) => {
          navigate("/authenticated");
          // You can save the token in your app in case you need it but UISDK can handle all this for you
          // so theoretically you don't need to manage tokens yourself.
          setToken(data);
        })
        .catch((e) => {
          // The App developer is responsible for handling the error in this phase.
          // TODO: We should consider handling this error using UI SDK so the devs don't need to
          setError(JSON.stringify(e));
        });
    }
    return () => {
      ignore = true;
    };
  }, [navigate, setToken]);

  return (
    <div>
      <h3>general callback</h3>
      <div>{error}</div>
    </div>
  );
};

export default Oidc;
export { Callback };
