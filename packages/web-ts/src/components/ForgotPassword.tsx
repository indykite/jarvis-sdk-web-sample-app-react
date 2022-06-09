import { useEffect } from "react";
import { IKUICore } from "@indykiteone/jarvis-sdk-web";

const ForgottenPassword = () => {
  let ignore = false;
  useEffect(() => {
    if (!ignore) {
      IKUICore.renderForgotPasswordForm({
        renderElementSelector: "#forgotten-password-container",
        labels: {
          username: "Custom Email address",
          submitButton: "Custom Send password reset email",
          backToLogin: "Custom Go back to login",
        },
      });
    }

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div>
      <div id="forgotten-password-container" />
    </div>
  );
};

export default ForgottenPassword;
