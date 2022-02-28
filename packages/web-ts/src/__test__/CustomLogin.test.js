import React from "react";
import { render, screen, fireEvent } from "../../test-utils";
import Login from "../components/custom/CustomLogin";
import { IKUIUserAPI } from "@indykiteone/jarvis-sdk-web";

jest.mock("react-router-dom", () => {
  const original = jest.requireActual("react-router-dom");
  return {
    ...original,
    useHistory: jest.fn(),
  };
});

jest.mock("@indykiteone/jarvis-sdk-web", () => {
  const original = jest.requireActual("@indykiteone/jarvis-sdk-web");
  return {
    ...original,
    IKUIUserAPI: {
      loginSetup: jest.fn().mockImplementation(() => Promise.resolve()),
    },
  };
});

describe("All tests for custom login", () => {
  test("Test for general render", () => {
    const { container } = render(<Login />);
    expect(screen.getByText("Email", { exact: true })).toBeInTheDocument();
    expect(container.querySelector("#custom-username")).toBeInTheDocument();

    expect(screen.getByText("Password", { exact: true })).toBeInTheDocument();
    expect(container.querySelector("#custom-password")).toBeInTheDocument();

    expect(container.querySelector("#custom-btn-login")).toBeInTheDocument();

    expect(container.querySelector("#custom-btn-to-registration")).toBeInTheDocument();
    expect(container.querySelector("#custom-btn-to-forgot-password")).toBeInTheDocument();
  });
  test("Test for input fields", () => {
    const { container } = render(<Login />);

    fireEvent.change(container.querySelector("#custom-username"), {
      target: { value: "myemail" },
    });
    expect(screen.getByDisplayValue("myemail")).toBeInTheDocument();

    fireEvent.change(container.querySelector("#custom-password"), {
      target: { value: "mypassword" },
    });
    expect(screen.getByDisplayValue("mypassword")).toBeInTheDocument();
  });
});
