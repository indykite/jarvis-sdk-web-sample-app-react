import React from 'react'
import { render } from "../../test-utils";
import Login from '../components/Login'

const mockOnSuccess = jest.fn()

jest.mock('@indykiteone/jarvis-sdk-web', () => {
    const original = jest.requireActual('@indykiteone/jarvis-sdk-web');
    return {
        ...original,
        IKUICore: {
            renderLogin: jest.fn().mockImplementation(() => Promise.resolve({
                renderElementSelector: ".login-container",
                onSuccessLogin: mockOnSuccess,
                redirectUri: "/callback",
                forgotPasswordPath: "/forgot",
                labels: {
                    // username: "Custom Username",
                    // password: "Custom Password",
                    loginButton: "Custom Login with us!",
                    // registerButton: "Custom Register",
                    // forgotPasswordButton: "custom Forgot Password",
                    // orOtherOptions: "Custom you can also continue with",
                },
            }))
        }
    }
})

describe('All tests for login', () => {
    test("Test for general render", () => {
        render(<Login/>)
    })
})