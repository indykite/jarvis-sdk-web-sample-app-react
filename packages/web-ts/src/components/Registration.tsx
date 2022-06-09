import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataTokenResponseType, IKUICore } from "@indykiteone/jarvis-sdk-web";

interface IProps {
  setToken: (data: DataTokenResponseType) => void;
}

const Registration: React.FC<IProps> = ({ setToken }) => {
  const navigate = useNavigate();

  const onSuccess = React.useCallback(
    (data: any) => {
      setToken(data);
      navigate("/authenticated");
    },
    [setToken, navigate],
  );

  let ignore = false;
  useEffect(() => {
    if (!ignore) {
      IKUICore.render({
        renderElementSelector: ".register-container",
        onSuccess: onSuccess,
        redirectUri: "/callback",
        labels: {
          username: "Custom Username",
          // password: "Custom Password",
          // confirmPassword: "Custom Confirm Password",
          // registerButton: "Custom Join",
          // alreadyHaveAnAccountButton: "Custom Already have an account",
          //     orOtherOptions: "Custom you can also continue with"
        },
        termsAgreementSectionContent:
          "<h5>By clicking Agree & Join you agree with our secret terms and conditions.</h5>",
      });
    }
    return () => {
      ignore = true;
    };
  });

  return (
    <div>
      <div className="register-container" style={{ width: 350 }} />
    </div>
  );
};

export default Registration;
