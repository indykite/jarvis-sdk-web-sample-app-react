import React from "react";
import { useNavigate } from "react-router-dom";
import {
  DataTokenResponseType,
  IKUIOidc,
  IKUIUserAPI,
  LoginSetupDataType,
} from "@indykiteone/jarvis-sdk-web";

const loginApps = JSON.parse(process.env.REACT_APP_LOGIN_APPS || "{}");

interface IProps {
  setToken: (data: DataTokenResponseType) => void;
}

// We need to specify the OIDC redirectURi
const redirectUri = "/callback";

const Login: React.FC<IProps> = ({ setToken }) => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [setupResponseData, setSetupResponseData] = React.useState<LoginSetupDataType | null>(
    null,
  );
  const [type, setType] = React.useState<string | null>(null);

  React.useEffect(() => {
    // This allows to skip login if there is valid token found.
    const setup = async () => {
      // CHOOSE ONE

      const loginSetupResponse = await IKUIUserAPI.loginSetup();

      console.log(loginSetupResponse);
      // OR

      // END OF CHOOSE ONE

      setSetupResponseData(loginSetupResponse);
      if (loginSetupResponse && loginSetupResponse["@type"]) setType(loginSetupResponse["@type"]);

      return () => {
        setType(null);
        setSetupResponseData(null);
      };
    };

    setup().catch(console.log);
  }, []);

  const onSuccess = React.useCallback(
    (data: DataTokenResponseType | Error) => {
      setToken(data as DataTokenResponseType);
      navigate("/authenticated");
    },
    [setToken, navigate],
  );

  const handleOnLogin = React.useCallback(() => {
    if (setupResponseData != null) {
      IKUIUserAPI.login(email, password, setupResponseData).then(onSuccess).catch(console.error);
    }
  }, [email, password, setupResponseData, onSuccess]);

  return (
    <div className="App">
      {type !== "oidc" && (
        <>
          <h5>Email</h5>
          <input
            type="email"
            id="custom-username"
            name="custom-username"
            style={{ color: "black" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            id="custom-password"
            name="custom-password"
            style={{ color: "black" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button id="custom-btn-login" onClick={handleOnLogin}>
            Login
          </button>
          <br />
          <button id="custom-btn-to-registration" onClick={() => navigate("/registration")}>
            Create new account
          </button>
          <br />
          <button id="custom-btn-to-forgot-password" onClick={() => navigate("/forgot/password")}>
            Forgot password
          </button>
        </>
      )}

      {/* OIDC BUTTONS */}

      {/* @type === logical */}
      {type === "logical" && (
        <>
          <br />
          <br />
          <span>or continue with</span>
        </>
      )}
      {type === "logical" &&
        setupResponseData &&
        setupResponseData.opts &&
        setupResponseData.opts
          .filter((opt) => opt.prv)
          .map((opt) => (
            <React.Fragment key={opt["@id"]}>
              <br />
              <button
                id={`custom-btn-oidc-${opt.prv}`}
                onClick={() =>
                  IKUIOidc.oidcSetup({
                    id: opt["@id"],
                    redirectUri,
                    loginApp: loginApps[opt["@id"]],
                  })
                }>
                {opt.prv}
              </button>
            </React.Fragment>
          ))}
      {/* END OF @type === logical */}

      {/* @type ===  oidc */}
      {type === "oidc" && setupResponseData && (
        <>
          <br />
          <br />
          <button
            id={`custom-btn-oidc-${setupResponseData.prv}`}
            onClick={() => IKUIOidc.singleOidcSetup(setupResponseData)}>
            {setupResponseData.prv}
          </button>
        </>
      )}
      {/* END OF @type ===  oidc */}
    </div>
  );
};

export default Login;
