import React, { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { IKUIOidc, IKUIUserAPI } from "@indykiteone/jarvis-sdk-web";

const loginApps = JSON.parse(process.env.REACT_APP_LOGIN_APPS || "{}");

const Registration = ({ setToken }) => {
  const history = useHistory();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [registerOpts, setRegisterOpts] = React.useState([]);

  // We need to specify the OIDC redirectURi
  const redirectUri = "/callback";

  const onSuccess = React.useCallback(
    (data) => {
      setToken(data);
      history.push("/authenticated");
    },
    [setToken, history],
  );

  const handleOnRegister = React.useCallback(() => {
    if (password !== confirmPassword) {
      setError("Password confirmation failed.");
      return;
    }

    IKUIUserAPI.register(email, password)
      .then(onSuccess)
      .catch((err) => console.log(err));
  }, [email, password, onSuccess, confirmPassword]);

  useEffect(() => {
    (async () => {
      const response = await IKUIUserAPI.registerSetup();
      setRegisterOpts(response.opts);
    })();
  }, []);

  return (
    <div>
      {error && <span id="custom-notification-text">{error}</span>}
      <h5>Email</h5>
      <input
        id="custom-username"
        name="custom-username"
        style={{ color: "black" }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <h5>Password</h5>
      <input
        id="custom-password"
        name="custom-password"
        style={{ color: "black" }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <h5>Confirm Password</h5>
      <input
        id="custom-confirm-password"
        name="custom-confirm-password"
        style={{ color: "black" }}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handleOnRegister}>Register</button>
      <br />
      or you can register using
      {registerOpts
        .filter((opt) => opt.prv)
        .map((opt) => (
          <React.Fragment key={opt["@id"]}>
            <br />
            <button
              id={`custom-btn-oidc-${opt.prv}`}
              onClick={() => IKUIOidc.oidcSetup({ id: opt["@id"], redirectUri, loginApp: loginApps[opt["@id"]] })}
            >
              {opt.prv}
            </button>
          </React.Fragment>
        ))}
      <div className="linkWrapper">
        <Link to="/login">back to login</Link>
      </div>
    </div>
  );
};

export default Registration;
