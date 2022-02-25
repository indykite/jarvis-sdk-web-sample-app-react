import React from 'react'
import { render } from "../../test-utils";
import ForgotPassword from '../components/custom/CustomForgotPassword'
import { IKUIUserAPI } from '@indykiteone/jarvis-sdk-web'

jest.mock('@indykiteone/jarvis-sdk-web', () => {
    const original = jest.requireActual('@indykiteone/jarvis-sdk-web');
    return {
        ...original,
        IKUIUserAPI:{
            sendResetPasswordEmail: jest.fn().mockImplementation(() => Promise.resolve()),
        }
    }
})

describe("All tests for custom ForgotPassword", () => {
    test("Test for general render", () => {
        render(<ForgotPassword/>)
    })
})