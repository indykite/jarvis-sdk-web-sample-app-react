import React from "react";
import "./App.css";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import { IKUIInit, IKUIUserAPI, DataTokenResponseType } from "@indykiteone/jarvis-sdk-web";

import CustomForgotPassword from "./components/custom/CustomForgotPassword";
import ForgottenPassword from "./components/ForgotPassword";
import CustomSetNewPassword from "./components/custom/CustomSetNewPassword";
import SetNewPassword from "./components/SetNewPassword";
import Oidc, { Callback } from "./components/Oidc";
import CustomRegistration from "./components/custom/CustomRegistration";
import Registration from "./components/Registration";
import CustomLogin from "./components/custom/CustomLogin";
import Login from "./components/Login";

import { csCZLocale } from "@indykiteone/jarvis-sdk-web/lib/services/core/locale/cs-CZ";

const defaultUi = localStorage.getItem("whatUiToUse");
const defaultLanguage = localStorage.getItem("idsdk-lan");

IKUIInit({
  baseUri: process.env.REACT_APP_BASE_URI || "",
  applicationId: process.env.REACT_APP_APPLICATION_ID || "",
  tenantId: process.env.REACT_APP_TENANT_ID || "",
});

const App: React.FC = () => {
  const history = useHistory();
  const [token, setToken] = React.useState<DataTokenResponseType | null>(null);
  const [refreshToken, setRefreshToken] = React.useState<string | null>(null);
  const [state, setState] = React.useState(defaultUi || "built-in"); // built-in or custom
  const [defaultLanguageState, setDefaultLanguageState] = React.useState(defaultLanguage || "EN");

  if (defaultLanguage === "CZ") {
    IKUIInit({
      localeConfig: csCZLocale,
    });
  }

  const handleOnLanguageChange = (e: any) => {
    localStorage.setItem("idsdk-lan", e.target.value);
    setDefaultLanguageState(e.target.value);

    if (e.target.value === "CZ") {
      IKUIInit({
        localeConfig: csCZLocale,
      });
    } else {
      // Reset to default
      IKUIInit({
        localeConfig: null,
      });
    }
  };

  const handleOnUIUseChange = (e: any) => {
    localStorage.setItem("whatUiToUse", e.target.name);
    setState(e.target.name);
  };

  const onLogout = React.useCallback(() => {
    IKUIUserAPI.logoutCurrentUser()
      .then(() => {
        setToken(null);
        setRefreshToken(null);
        history.push("/login");
      })
      .catch(console.log);
  }, [history]);

  const onRefreshToken = React.useCallback(() => {
    IKUIUserAPI.getValidAccessToken()
      .then((token) => {
        setRefreshToken(token);
        setToken(null);
      })
      .catch(console.log);
  }, []);

  /**
   * We are doing this only in the sample app for better testing of different use-cases.
   */
  const onLoginStart = React.useCallback(() => {
    const uiSwitch = localStorage.getItem("whatUiToUse");
    localStorage.clear();
    localStorage.setItem("whatUiToUse", `${uiSwitch}`);
  }, []);

  return (
    <div className="App">
      <h1>Sample login app</h1>
      <div style={{ textAlign: "center" }}>
        <form onChange={handleOnLanguageChange}>
          <span>Language selector</span>
          <br />
          <label>
            EN
            <input
              type="radio"
              id="en_lan"
              name="language"
              value="EN"
              defaultChecked={defaultLanguageState === "EN"}
            />
          </label>
          <br />
          <label>
            CZ
            <input
              type="radio"
              id="cz_lan"
              name="language"
              value="CZ"
              defaultChecked={defaultLanguageState === "CZ"}
            />
          </label>
          <br />
        </form>
        <br />
        <form>
          <span>Choose UI type</span>
          <br />
          <label>
            built-in ui
            <input
              type="radio"
              name="built-in"
              id="built-in"
              checked={state === "built-in"}
              onChange={handleOnUIUseChange}
            />
          </label>
          <br />
          <label>
            custom ui
            <input
              type="radio"
              name="custom"
              id="custom"
              checked={state === "custom"}
              onChange={handleOnUIUseChange}
            />
          </label>
        </form>
      </div>
      <Switch>
        <Route path="/" exact>
          <Link to="/login">
            <button id="start-btn" onClick={onLoginStart}>
              Start
            </button>
          </Link>
        </Route>
        <Route path="/forgot">
          {state === "custom" ? <CustomForgotPassword /> : <ForgottenPassword />}
        </Route>
        <Route path="/set/new/password/:referenceId">
          {state === "custom" ? <CustomSetNewPassword /> : <SetNewPassword />}
        </Route>
        <Route path="/login/oauth2">
          <Oidc />
        </Route>
        <Route path="/registration">
          {state === "custom" ? (
            <CustomRegistration setToken={setToken} />
          ) : (
            <Registration setToken={setToken} />
          )}
        </Route>
        <Route path="/login">
          {state === "custom" ? (
            <CustomLogin setToken={setToken} />
          ) : (
            <Login setToken={setToken} />
          )}
        </Route>
        <Route path="/callback">
          <Callback setToken={setToken} />
        </Route>
        <Route path="/authenticated">
          {token || refreshToken ? (
            <div className="buttons-wrapper">
              <button id="refresh-token-btn" onClick={onRefreshToken}>
                Refresh token
              </button>
              <button id="logout-btn" onClick={onLogout}>
                Logout
              </button>
            </div>
          ) : (
            <>
              <h5>No token found</h5>
              <Link to="/login">go to login</Link>
            </>
          )}
        </Route>
      </Switch>
      <br />

      {token && (
        <div className="responseWrapper">
          <h4>Token</h4>
          <p id="token-field">{token.token}</p>
          <h4>Refresh Token</h4>
          <p id="refresh-token-field">{token.refresh_token}</p>
          <h4>Token Type</h4>
          <p id="token-type-field">{token.token_type}</p>
          <h4>Token Expiration (timestamp)</h4>
          <p id="token-expiration-field">{token.expiration_time}</p>
          <h4>Token Expires In (seconds)</h4>
          <p id="token-expires-in-field">{token.expires_in}</p>
        </div>
      )}
      {refreshToken && (
        <div className="responseWrapper">
          <h4>Token</h4>
          <p id="token-field">{refreshToken}</p>
        </div>
      )}
    </div>
  );
};

export default App;
