import React from "react";
import { render, fireEvent, screen } from "../../test-utils";
import ForgotPassword from "../components/custom/CustomForgotPassword";
import { IKUIUserAPI } from "@indykiteone/jarvis-sdk-web";

jest.mock("@indykiteone/jarvis-sdk-web", () => {
  const original = jest.requireActual("@indykiteone/jarvis-sdk-web");
  return {
    ...original,
    IKUIUserAPI: {
      sendResetPasswordEmail: jest.fn().mockImplementation(() => Promise.resolve()),
    },
  };
});

describe("All tests for custom ForgotPassword", () => {
  test("Test for general render", () => {
    render(<ForgotPassword />);
    //TODO: write test that checks that the SDK is actually triggered.
  });
  test("Test for input fields", () => {
    const { container } = render(<ForgotPassword />);

    fireEvent.change(container.querySelector("#custom-username"), {
      target: { value: "myemail" },
    });
    expect(screen.getByDisplayValue("myemail")).toBeInTheDocument();
  });

});

//TODO: write test that checks that the SDK errors is handled.