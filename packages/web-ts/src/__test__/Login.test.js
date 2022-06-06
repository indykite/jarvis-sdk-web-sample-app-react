import { IKUICore } from "@indykiteone/jarvis-sdk-web";
import { render } from "../../test-utils";
import Login from "../components/Login";

jest.mock("@indykiteone/jarvis-sdk-web", () => {
  const original = jest.requireActual("@indykiteone/jarvis-sdk-web");
  return {
    ...original,
    IKUICore: {
      render: jest.fn().mockImplementation(() => Promise.resolve()),
    },
  };
});

describe("All tests for login", () => {
  test("Test for general render", () => {
    render(<Login />);
    expect(IKUICore.render).toBeCalled();
  });
});
