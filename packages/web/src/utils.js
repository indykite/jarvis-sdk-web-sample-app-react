export const getSearchParam = (paramName) => {
  const params = new URLSearchParams(window.location.search);
  return params.get(paramName);
};

export const getEmailFromDigitalTwin = (digitalTwin) => {
  const properties = digitalTwin.properties || [];
  const emailProperty = properties.find((property) => {
    return property?.definition?.property === "email" && property?.meta?.primary;
  });
  return emailProperty?.value?.stringValue;
};
