import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter, MemoryRouter, Routes, Route } from "react-router-dom";
import * as matchers from "@testing-library/jest-dom/matchers";

// Connect jest-dom matchers to Vitest
expect.extend(matchers);

// Import your components (ensure paths match your project structure)
import Home from "./Home";
import Login from "./Login";
import Predict from "./Predict";
import Contact from "./Contact";

// Helper to render with Router for basic pages
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("BoneGuard - Integration Flow Tests", () => {
  
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    // Mock global fetch for API calls
    global.fetch = vi.fn();
  });

  /* 1. HOME TO LOGIN NAVIGATION */
  it("navigates from Home to Login when 'Get Started' is clicked", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<div>Login Page Target</div>} />
        </Routes>
      </MemoryRouter>
    );

    const getStartedBtn = screen.getByLabelText(/get started/i);
    fireEvent.click(getStartedBtn);

    expect(screen.getByText(/Login Page Target/i)).toBeInTheDocument();
  });

  /* 2. LOGIN TO PREDICT FLOW (AUTH INTEGRATION) */
  it("successfully logs in and redirects to Predict page", async () => {
    const setUserMock = vi.fn();
    
    // Mock successful login response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ name: "Mansi Shinde", email: "mansi@test.com" }),
    });

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="/login" element={<Login setUser={setUserMock} />} />
          <Route path="/predict" element={<div>Predict Page Content</div>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: "mansi@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Log In/i }));

    await waitFor(() => {
      // Verify state update
      expect(setUserMock).toHaveBeenCalledWith(expect.objectContaining({ name: "Mansi Shinde" }));
      // Verify navigation
      expect(screen.getByText(/Predict Page Content/i)).toBeInTheDocument();
    });
  });

  /* 3. CONTACT FORM API INTEGRATION */
  it("shows success message when contact form is submitted successfully", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    renderWithRouter(<Contact />);

    fireEvent.change(screen.getByPlaceholderText(/your name/i), { target: { value: "Mansi" } });
    fireEvent.change(screen.getByPlaceholderText(/your email/i), { target: { value: "mansi@test.com" } });
    fireEvent.change(screen.getByPlaceholderText(/your message/i), { target: { value: "Hello Expert" } });

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/✅ Message sent successfully!/i)).toBeInTheDocument();
    });
  });

  /* 4. PREDICT PAGE TAB LOGIC */
  it("updates UI state when switching between Manual and CSV methods", async () => {
    renderWithRouter(<Predict />);

    // Initially should show the prompt
    expect(screen.getByText(/Please select an input method/i)).toBeInTheDocument();

    // Switch to Manual
    const manualBtn = screen.getByText(/Manual Form/i);
    fireEvent.click(manualBtn);

    // Verify prompt disappears and the choose method header stays
    await waitFor(() => {
      expect(screen.queryByText(/Please select an input method/i)).not.toBeInTheDocument();
      expect(screen.getByText(/Choose Input Method/i)).toBeInTheDocument();
    });
  });
});