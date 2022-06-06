import { render } from "../../test-utils";
import { IKUICore } from "@indykiteone/jarvis-sdk-web";
import SetNewPassword from "../components/SetNewPassword";

let MOCK_REFERENCE_ID = "something";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    referenceId: MOCK_REFERENCE_ID,
  }),
}));

jest.mock("@indykiteone/jarvis-sdk-web", () => {
  const original = jest.requireActual("@indykiteone/jarvis-sdk-web");
  return {
    ...original,
    IKUICore: {
      renderSetNewPasswordForm: jest.fn().mockImplementation(() => Promise.resolve()),
    },
  };
});

describe("All tests for Sample App (TypeScript) version, SetNewPassword", () => {
  test("Test for general render", () => {
    render(<SetNewPassword />);
    expect(IKUICore.renderSetNewPasswordForm).toBeCalled();
  });
});
