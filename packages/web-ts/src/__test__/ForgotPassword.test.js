import { render } from "../../test-utils";
import { IKUICore } from "@indykiteone/jarvis-sdk-web";
import ForgotPassword from "../components/ForgotPassword";

jest.mock("@indykiteone/jarvis-sdk-web", () => {
  const original = jest.requireActual("@indykiteone/jarvis-sdk-web");
  return {
    ...original,
    IKUICore: {
      renderForgotPasswordForm: jest.fn().mockImplementation(() => Promise.resolve()),
    },
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("All tests for ForgotPassword", () => {
  test("Test for general render", () => {
    const { container } = render(<ForgotPassword />);
    expect(container.querySelector("#forgotten-password-container")).toBeInTheDocument();
    expect(IKUICore.renderForgotPasswordForm).toBeCalled();
  });
});
