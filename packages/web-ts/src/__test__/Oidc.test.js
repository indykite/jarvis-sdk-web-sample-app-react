import { render } from "../../test-utils";
import { IKUIOidc } from "@indykiteone/jarvis-sdk-web";
import Oidc from "../components/Oidc";

let assignMock = jest.fn();

delete window.location;
window.location = { assign: assignMock };

jest.mock("@indykiteone/jarvis-sdk-web", () => {
  const original = jest.requireActual("@indykiteone/jarvis-sdk-web");
  return {
    ...original,
    IKUIOidc: {
      handleOidcOriginalParamsAndRedirect: jest.fn().mockImplementation(() => Promise.resolve()),
    },
  };
});

afterEach(() => {
  assignMock.mockClear();
});

describe("All tests for OIDC", () => {
  test("Test for general render", () => {
    render(<Oidc />);
    expect(IKUIOidc.handleOidcOriginalParamsAndRedirect).toBeCalled();
  });
});
