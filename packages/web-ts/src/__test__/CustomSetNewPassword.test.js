import React from 'react'
import { render } from "../../test-utils";
import SetNewPassword from '../components/custom/CustomSetNewPassword'
import { IKUIUserAPI } from '@indykiteone/jarvis-sdk-web'

jest.mock('@indykiteone/jarvis-sdk-web', () => {
    const original = jest.requireActual('@indykiteone/jarvis-sdk-web');
    return {
        ...original,
        IKUIUserAPI:{
            sendNewPassword: jest.fn().mockImplementation(() => Promise.resolve())
        }
    }
})

describe('All tests for custom SetNewPassword', () => {
    test("Test for general render", () => {
        const { container } =  render(<SetNewPassword/>)
        expect(container.querySelector("#custom-password")).toBeInTheDocument();
        expect(container.querySelector("#custom-send-btn")).toBeInTheDocument();
    })
})