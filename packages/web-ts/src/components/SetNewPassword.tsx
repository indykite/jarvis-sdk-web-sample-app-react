import React from "react";
import { IKUICore } from "@indykiteone/jarvis-sdk-web";
import { useParams } from "react-router-dom";

const SetNewPassword = () => {
  const { referenceId } = useParams<{
    referenceId: string;
  }>();

  let ignore = false;
  React.useEffect(() => {
    if (referenceId && !ignore) {
      console.log("Set new password");

      IKUICore.renderSetNewPasswordForm({
        renderElementSelector: "#set-new-password-container",
        token: referenceId,
        labels: {
          newPassword: "Custom Password",
          confirmNewPassword: "Custom Password confirm",
          submitButton: "Custom set new password",
        },
      });
    }
    return () => {
      ignore = true;
    };
  });

  return (
    <div>
      <div id="set-new-password-container" />
    </div>
  );
};

export default SetNewPassword;
