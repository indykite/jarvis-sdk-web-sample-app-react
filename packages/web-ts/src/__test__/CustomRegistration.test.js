import React from 'react'
import { render } from "../../test-utils";
import Registration from '../components/custom/CustomRegistration'
import { IKUIUserAPI } from '@indykiteone/jarvis-sdk-web'

jest.mock('@indykiteone/jarvis-sdk-web', () => {
    const original = jest.requireActual('@indykiteone/jarvis-sdk-web');
    return {
        ...original,
        IKUIUserAPI:{
            registerSetup: jest.fn().mockImplementation(() => Promise.resolve())
        }
    }
})


describe("All tests for custom registration", () => {
    test("Test for general render", () => {
        render(<Registration/>)
    })
})