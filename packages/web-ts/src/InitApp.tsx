import React, { useState } from "react";
import { IKUIInit } from "@indykiteone/jarvis-sdk-web";
import App from "./App";

let baseUri = process.env.REACT_APP_BASE_URI;
let applicationId = process.env.REACT_APP_APPLICATION_ID;
let tenantId = process.env.REACT_APP_TENANT_ID;

function InitApp() {
  const [initialized, setInitialized] = useState(false);

  React.useEffect(() => {
    const getData = async () => {
      const res = await fetch(process.env.REACT_APP_INDYKITE_APPLICATION_CREDENTIALS_FILE || "");
      const credentialsFile = await res.json();

      if (credentialsFile.baseUrl) {
        baseUri = credentialsFile.baseUrl;
      }
      if (credentialsFile.applicationId) {
        applicationId = credentialsFile.applicationId;
      }
      if (credentialsFile.defaultTenantId) {
        tenantId = credentialsFile.defaultTenantId;
      }

      IKUIInit({
        baseUri,
        applicationId,
        tenantId,
      });

      setInitialized(true);
    };

    if (process.env.REACT_APP_INDYKITE_APPLICATION_CREDENTIALS_FILE) {
      getData().catch(console.error);
    } else {
      IKUIInit({
        baseUri,
        applicationId,
        tenantId,
      });

      setInitialized(true);
    }
  }, []);

  if (!initialized) {
    return null;
  }

  return (
    <App />
  );
}

export default InitApp;
