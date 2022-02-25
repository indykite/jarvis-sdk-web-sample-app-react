import React from 'react'
import { render, screen, fireEvent } from "../../test-utils";
import Registration from '../components/custom/CustomRegistration'
import { IKUIUserAPI } from '@indykiteone/jarvis-sdk-web'

jest.mock('@indykiteone/jarvis-sdk-web', () => {
    const original = jest.requireActual('@indykiteone/jarvis-sdk-web');
    return {
        ...original,
        IKUIUserAPI:{
            registerSetup: jest.fn().mockImplementation(() => Promise.resolve())
        },
        IKUIOidc:{
            oidcSetup: jest.fn().mockImplementation(() => Promise.resolve())
        }
    }
})


describe("All tests for custom registration", () => {
    test("Test for general render", () => {
        const { container } = render(<Registration/>)

        expect(screen.getByText("Email")).toBeInTheDocument();
        expect(container.querySelector("#custom-username")).toBeInTheDocument();

        expect(screen.getByText("Password")).toBeInTheDocument();
        expect(container.querySelector("#custom-password")).toBeInTheDocument();

        expect(screen.getByText("Confirm Password")).toBeInTheDocument();
        expect(container.querySelector("#custom-confirm-password")).toBeInTheDocument();
    })

    test("Test for input fields", () => {
        const { container } = render(<Registration/>)

        fireEvent.change(container.querySelector("#custom-username"), {
            target: { value: "customusername" },
        });
        expect(screen.getByDisplayValue("customusername")).toBeInTheDocument();

        fireEvent.change(container.querySelector("#custom-password"), {
            target: { value: "custompassword1" },
        });
        expect(screen.getByDisplayValue("custompassword1")).toBeInTheDocument();

        fireEvent.change(container.querySelector("#custom-confirm-password"), {
            target: { value: "custompassword2" },
        });
        expect(screen.getByDisplayValue("custompassword2")).toBeInTheDocument();
    })
})