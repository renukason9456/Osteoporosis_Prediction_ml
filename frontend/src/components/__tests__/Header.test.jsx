import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Header from '../Header.jsx';

// Helper function to render Header with Router
const renderHeader = (props) => {
  return render(
    <MemoryRouter>
      <Header {...props} />
    </MemoryRouter>
  );
};

describe('Header Component Tests', () => {
  const mockSetUser = vi.fn();
  const guestUser = null;
  const activeUser = { name: 'Mansi', email: 'mansi@example.com' };

  beforeEach(() => {
    vi.clearAllMocks();
    // Clear localStorage to simulate a fresh state
    localStorage.clear();
  });

  // 1. Navigation Links Test
  test('renders navigation links correctly', () => {
    renderHeader({ user: guestUser, setUser: mockSetUser });
    
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
  });

  // 2. Authentication State (Logged Out)
  test('does not show user avatar when logged out', () => {
    renderHeader({ user: guestUser, setUser: mockSetUser });
    
    const avatar = screen.queryByText('M'); // queryBy returns null instead of throwing error
    expect(avatar).not.toBeInTheDocument();
  });

  // 3. Authentication State (Logged In)
  test('shows user avatar and details when logged in', () => {
    renderHeader({ user: activeUser, setUser: mockSetUser });
    
    // Check for the avatar (first letter of name)
    const avatar = screen.getByText('M');
    expect(avatar).toBeInTheDocument();

    // Check if name and email exist (they are hidden by default in the hover menu, 
    // but present in the DOM)
    expect(screen.getByText(activeUser.name)).toBeInTheDocument();
    expect(screen.getByText(activeUser.email)).toBeInTheDocument();
  });

  // 4. Logout Functionality
  test('calls handleLogout, clears localStorage and redirects', () => {
    // Set a fake user in localStorage first
    localStorage.setItem('user', JSON.stringify(activeUser));
    
    renderHeader({ user: activeUser, setUser: mockSetUser });

    const logoutButton = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutButton);

    expect(localStorage.getItem('user')).toBeNull();
    expect(mockSetUser).toHaveBeenCalledWith(null);
  });

  // 5. Mobile Menu Toggle
  test('opens mobile menu when hamburger icon is clicked', () => {
    const { container } = renderHeader({ user: guestUser, setUser: mockSetUser });
    
    // The hamburger icon is inside a button with md:hidden class
    const menuButton = container.querySelector('.md\\:hidden');
    fireEvent.click(menuButton);

    // After clicking, the mobile menu version of BoneGuard should appear
    // We look for the text in the side drawer
    const mobileLogo = screen.getAllByText(/BoneGuard/i);
    expect(mobileLogo.length).toBeGreaterThan(1); // One in header, one in drawer
  });
});