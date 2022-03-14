import React, { useEffect } from "react";
import "./App.css";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import { IKUIInit, IKUIUserAPI, DataTokenResponseType } from "@indykiteone/jarvis-sdk-web";
import { ReactComponent as ArrowDown } from "./assets/arrow-down.svg";

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

const LANGUAGES = ["EN", "CZ"];

const App: React.FC = () => {
  const history = useHistory();
  const [token, setToken] = React.useState<DataTokenResponseType | null>(null);
  const [refreshToken, setRefreshToken] = React.useState<string | null>(null);
  const [state, setState] = React.useState(defaultUi || "built-in"); // built-in or custom
  const [defaultLanguageState, setDefaultLanguageState] = React.useState(defaultLanguage || "EN");
  const [langToggled, setLangToggled] = React.useState(false);

  const handleOnLanguageChange = (e: any) => {
    localStorage.setItem("idsdk-lan", e);
    setDefaultLanguageState(e);

    if (e === "CZ") {
      IKUIInit({
        localeConfig: csCZLocale,
      });
    } else {
      // Reset to default
      IKUIInit({
        localeConfig: null,
      });
    }
    setLangToggled(false);
  };

  useEffect(() => {
    if (defaultLanguageState === "CZ") {
      IKUIInit({
        localeConfig: csCZLocale,
      });
    }
  }, [defaultLanguageState]);

  const handleOnUIUseChange = (type: string) => {
    localStorage.setItem("whatUiToUse", type);
    setState(type);
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

  const onLoginStart = React.useCallback(() => {
    const uiSwitch = localStorage.getItem("whatUiToUse");
    localStorage.clear();
    localStorage.setItem("whatUiToUse", `${uiSwitch}`);
  }, []);

  const renderDisplayLanguage = () => {
    if (defaultLanguageState) {
      return defaultLanguageState;
    }
    return "No language";
  };

  return (
    <div className="indykite-sdk-container">
      <div className="full-view-container">
        <div className="select-container">
          <div className="toggle-container">
            <button
              id="built-in"
              onClick={() => handleOnUIUseChange("built-in")}
              className={`btn-option ${state === "built-in" ? "selected" : ""}`}
            >
              Built in
            </button>
            <button
              id="custom"
              onClick={() => handleOnUIUseChange("custom")}
              className={`btn-option ${state === "custom" ? "selected" : ""}`}
            >
              Custom
            </button>
          </div>
          <div className="language-container" tabIndex={0} onBlur={() => setLangToggled(false)}>
            <div
              onClick={() => setLangToggled(!langToggled)}
              className={`active-display ${langToggled && "toggled"}`}
            >
              <span className="selected-label">{renderDisplayLanguage()}</span>
              <span className="arrow">
                <ArrowDown />
              </span>
            </div>
            {langToggled && (
              <div className="selection-container">
                {LANGUAGES.map((language) => (
                  <div
                    id={`select-${language}`}
                    onClick={() => handleOnLanguageChange(language)}
                    className="single-option"
                  >
                    {language}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="full-login-container">
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
      </div>
      <div className="copyright-container">
        <label className="copyright-label">© 2022 IndyKite Inc</label>
      </div>
    </div>
  );
};

export default App;
