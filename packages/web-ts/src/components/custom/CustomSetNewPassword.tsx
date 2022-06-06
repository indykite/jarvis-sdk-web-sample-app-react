import React from "react";
import { IKUIUserAPI } from "@indykiteone/jarvis-sdk-web";
import { useParams } from "react-router-dom";

const SetNewPassword = () => {
  const { referenceId } = useParams<{
    referenceId: string;
  }>();
  const [newPassword, setNewPassword] = React.useState("");

  const handleOnSubmit = React.useCallback(() => {
    if (referenceId) {
      IKUIUserAPI.sendNewPassword(referenceId, newPassword).then(console.log).catch(console.log);
    }
  }, [referenceId, newPassword]);

  return (
    <div>
      <input
        id="custom-password"
        name="custom-password"
        style={{ color: "black" }}
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <br />
      <button id="custom-send-btn" onClick={handleOnSubmit}>
        send
      </button>
    </div>
  );
};

export default SetNewPassword;
