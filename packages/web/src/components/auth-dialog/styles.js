export const dialogWrapperStyle = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  minHeight: "105px",
  paddingBottom: 48,
};

export const headerSeparatorStyle = {
  position: "absolute",
  width: "100%",
  height: "1px",
  left: 0,
  top: "148px",
  backgroundColor: "#141A21",
};

export const consentsWrapperStyle = {
  display: "grid",
  gridTemplateColumns: "50px auto",
  alignItems: "flex-start",
  gridGap: "16px 32px",
};

export const emptyGridCellStyle = {
  visibility: "hidden",
};

export const consentNoteStyle = {
  fontSize: "10px",
  marginTop: "56px",
  marginBottom: "46px",
};

export const ButtonsWrapperStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  position: "absolute",
  bottom: "40px",
  left: 0,
  right: 0,
};

export const buttonStyle = {
  height: "31px",
  minWidth: "91px",
};

export const consentDescriptionStyle = {
  fontSize: "12px",
  display: "flex",
  height: "100%",
  alignItems: "center",
};

export const consentTitleWrapperStyle = {
  marginBottom: "40px",
};

export const requesterWrapperStyle = {
  fontSize: "20px",
  marginBottom: "8px",
};

export const titleNoteStyle = {
  fontSize: "14px",
};

export const highlightStyle = {
  color: "#6AD48A",
};

export const headerWrapperStyle = {
  display: "flex",
  height: "90px",
  marginBottom: "60px",
  alignItems: "center",
};

export const accountGridStyle = {
  display: "grid",
  gridTemplateColumns: "48px auto",
  gridTemplateRows: "48px auto",
  gridGap: "8px 32px",
  gridTemplateAreas: `
    "avatar account"
    ". button"
  `,
  marginLeft: "48px",
  alignItems: "center",
};

export const avatarStyle = {
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  backgroundColor: "white",
  gridArea: "avatar",
};

export const accountNameWrapperStyle = {
  gridArea: "account",
  fontSize: "14px",
};

export const switchAccountButtonWrapperStyle = {
  gridArea: "button",
};
