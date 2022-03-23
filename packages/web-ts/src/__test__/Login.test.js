import React from 'react'
import { IKUICore } from "@indykiteone/jarvis-sdk-web";
import { render } from "../../test-utils";
import Login from "../components/Login";

const mockOnSuccess = jest.fn();

jest.mock("@indykiteone/jarvis-sdk-web", () => {
  const original = jest.requireActual("@indykiteone/jarvis-sdk-web");
  return {
    ...original,
    IKUICore: {
      renderLogin: jest.fn().mockImplementation(() =>
        Promise.resolve({
          renderElementSelector: ".login-container",
          onSuccessLogin: mockOnSuccess,
          redirectUri: "/callback",
          forgotPasswordPath: "/forgot",
          labels: {
            loginButton: "Custom Login with us!",
          },
        }),
      ),
    },
  };
});

describe("All tests for login", () => {
  test("Test for general render", () => {
    render(<Login />);
    expect(IKUICore.renderLogin).toBeCalled()
  });
});