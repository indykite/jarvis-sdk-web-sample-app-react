import React from "react";
import { Link } from "react-router-dom";
import { IKUIUserAPI } from "@indykiteone/jarvis-sdk-web";

const ForgottenPassword = () => {
  const [email, setEmail] = React.useState("");

  const handleOnSend = React.useCallback(() => {
    IKUIUserAPI.sendResetPasswordEmail(email).then(console.log).catch(console.log);
  }, [email]);

  return (
    <div>
      <input
        id="custom-username"
        name="custom-username"
        style={{ color: "black" }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button id="custom-send-btn" onClick={handleOnSend}>
        send
      </button>
      <div className="linkWrapper">
        <Link to="/login">back to login</Link>
      </div>
    </div>
  );
};

export default ForgottenPassword;
