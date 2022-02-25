import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom'
// locals

const WithProviders = ({ children }) => {
  return (
    <Router>
        {children}
    </Router>
  );
};

const customRender = (ui, options) => render(ui, { wrapper: WithProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
