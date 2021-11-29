import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { IKUICore } from "@indykiteone/jarvis-sdk-web";

const Registration = ({ setToken }) => {
  const history = useHistory();

  const onSuccess = React.useCallback(
    (data) => {
      setToken(data);
      history.push("/authenticated");
    },
    [setToken, history],
  );

  useEffect(() => {
    IKUICore.renderRegister({
      renderElementSelector: ".register-container",
      onSuccessRegistration: onSuccess,
      redirectUri: "/callback",
      labels: {
        // username: "Custom Username",
        // password: "Custom Password",
        // confirmPassword: "Custom Confirm Password",
        // registerButton: "Custom Join",
        // alreadyHaveAnAccountButton: "Custom Already have an account",
        //     orOtherOptions: "Custom you can also continue with"
      },
      // termsAgreementSectionContent:
      // "<h5>By clicking Agree & Join you agree with our secret terms and conditions.</h5>",
      loginApp: JSON.parse(process.env.REACT_APP_LOGIN_APPS || "{}"),
    });
  });

  return (
    <div>
      <div className="register-container" style={{ width: 350 }} />
    </div>
  );
};

export default Registration;
