import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { IKUICore } from "@indykiteone/jarvis-sdk-web";

const Login = ({ setToken }) => {
  const history = useHistory();

  const onSuccess = React.useCallback(
    (data) => {
      setToken(data);
      history.push("/authenticated");
    },
    [setToken, history],
  );

  useEffect(() => {
    IKUICore.renderLogin({
      renderElementSelector: ".login-container",
      onSuccessLogin: onSuccess,
      redirectUri: "/callback",
      forgotPasswordPath: "/forgot",
      // labels: {
      //   username: "Custom Username",
      //   password: "Custom Password",
      //   loginButton: "Custom Login with us!",
      //     registerButton: "Custom Register",
      //     forgotPasswordButton: "custom Forgot Password",
      //     orOtherOptions: "Custom you can also continue with"
      // }
      loginApp: JSON.parse(process.env.REACT_APP_LOGIN_APPS || "{}"),
    });
  });

  return (
    <div>
      <div className="login-container" style={{ width: 350 }} />
    </div>
  );
};

export default Login;
