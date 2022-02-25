import React from 'react'
import Registration from '../components/Registration'
import { IKUICore } from '@indykiteone/jarvis-sdk-web'
import { render } from "../../test-utils";

const mockOnSuccess = jest.fn()

jest.mock('@indykiteone/jarvis-sdk-web', () => {
    const original = jest.requireActual('@indykiteone/jarvis-sdk-web');
    return {
        ...original,
        IKUICore:{
            renderRegister: jest.fn().mockImplementation(() => Promise.resolve())
        }
    }
})

describe('All tests for registration', () => {
    test("Test for general render", () => {
        render(<Registration/>)
        expect(IKUICore.renderRegister).toBeCalled();
    })
})