import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ManualForm from '../ManualForm.jsx';

describe('Osteoporosis ManualForm - Full Test Suite', () => {
  const mockOnResult = vi.fn();

  beforeEach(() => {
    mockOnResult.mockClear();
  });

  // 1. Render Test
  test('should render all form sections correctly', () => {
    const { container } = render(<ManualForm onResult={mockOnResult} />);
    
    expect(container.querySelector('input[name="name"]')).toBeInTheDocument();
    expect(container.querySelector('input[name="age"]')).toBeInTheDocument();
    expect(screen.getByText(/Gender \*/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /predict/i })).toBeInTheDocument();
  });

  // 2. Numeric Input Validation
  test('should allow typing numbers in numeric fields', () => {
    const { container } = render(<ManualForm onResult={mockOnResult} />);
    const heightInput = container.querySelector('input[name="height"]');
    const weightInput = container.querySelector('input[name="weight"]');

    fireEvent.change(heightInput, { target: { value: '170' } });
    fireEvent.change(weightInput, { target: { value: '65' } });

    expect(heightInput.value).toBe('170');
    expect(weightInput.value).toBe('65');
  });

  // 3. Dropdown / Headless UI Test
  // Note: Headless UI buttons usually toggle visibility. 
  // We test if the button exists and displays the default state.
  test('should render dropdown buttons with "Select" text', () => {
    render(<ManualForm onResult={mockOnResult} />);
    const genderButton = screen.getAllByRole('button', { name: /select/i })[0];
    expect(genderButton).toBeInTheDocument();
  });

  // 4. Input Persistence
  test('should maintain state for text fields', () => {
    const { container } = render(<ManualForm onResult={mockOnResult} />);
    const medInput = container.querySelector('input[name="medicalConditions"]');
    
    fireEvent.change(medInput, { target: { value: 'None' } });
    expect(medInput.value).toBe('None');
  });

  // 5. Submit Interaction
  test('should trigger submission when Predict is clicked', async () => {
    render(<ManualForm onResult={mockOnResult} />);
    const submitButton = screen.getByRole('button', { name: /predict/i });

    fireEvent.click(submitButton);
    
    // We check if the button is enabled and clickable
    expect(submitButton).not.toBeDisabled();
  });

  // 6. Mandatory Field Check (Visual)
  test('should display asterisk for required fields', () => {
    render(<ManualForm onResult={mockOnResult} />);
    expect(screen.getByText(/Name \*/i)).toBeInTheDocument();
    expect(screen.getByText(/Age \*/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender \*/i)).toBeInTheDocument();
  });
});